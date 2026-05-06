"use server";
import { zsettings } from '@/settings/ZSettings';
import Stripe from 'stripe';
import { stripeServer } from './stripeSettings';
import { getApiData } from './api';
// import { IStripeSubscription } from '@/ContextProvider/StripePlansProvider';




export type IStripeProduct = Pick<Stripe.Product, "id" | "name" | "description" | "active" | "metadata" | "marketing_features">;
export type IStripePrice = Pick<Stripe.Price, "id" | "unit_amount" | "recurring" | "currency">;


/**
 * One big interface that combines the Stripe Product 
 * with specifically mapped Monthly and Yearly prices.
 */
export interface StripeProductWithPrices extends IStripeProduct {
  monthly?: IStripePrice;
  yearly?: IStripePrice;
}


export const getStripePlans = async (): Promise<StripeProductWithPrices[]> => {
  console.log("Stripe products come from .env, don't forget to update your client stripe with the prudcts same as your stripe products list");
  const productIds = zsettings.stripe.productsIds.split(",");
  // 1. Fetch the 3 products
  const products = await stripeServer.products.list({
    ids: productIds,
  });

  // 2. Fetch prices specifically for these products in parallel
  const productsWithPrices = await Promise.all(
    products.data.map(async (product) => {
      const prices = await stripeServer.prices.list({
        product: product.id, // Only gets prices for THIS product
        active: true,
      });

      return {
        ...product,
        monthly: prices.data.find((p) => p.recurring?.interval === "month"),
        yearly: prices.data.find((p) => p.recurring?.interval === "year"),
      };
    })
  );

  return productsWithPrices;
}

export const getDefaultPaymentMethod = async (customerId: string) => {
  try {
    // We expand 'invoice_settings.default_payment_method' to get the full object
    const customer = await stripeServer.customers.retrieve(customerId, {
      expand: ['invoice_settings.default_payment_method'],
    }) as any;

    // Cast to your interface (I_StripeCustomer)
    const defaultMethod = customer.invoice_settings.default_payment_method;

    if (typeof defaultMethod === 'object' && defaultMethod !== null) {
      // This matches your IS_StripePaymentMethod interface
      return defaultMethod;
    }

    return null; // No default method set
  } catch (error: any) {
    console.error("Error fetching default payment method:", error.message);
    // throw error;
    // return { success: false, error: error.message };
    return null;
  }
};


export const getStripeCustomer = async (email: string): Promise<Stripe.Customer | null> => {

  console.log("get stripe customer for email:", email);

  let customers;

  const emailForCustomer = email;
  // const emailForCustomer = 'zlatkot33esst333443445@google.com';

  console.log("get stripe customer for email:", emailForCustomer);

  customers = await stripeServer.customers.list({
    email: emailForCustomer
    // email: temporaryEmail,
  });
  console.log("customers:", customers);

  if (customers.data.length === 0) {
    console.log("Creating customer");
    const resultsAfterCreatingCustomer = await stripeServer.customers.create({
      // email: email,
      email: emailForCustomer,
    });

    customers = await stripeServer.customers.list({
      // email
      email: emailForCustomer,
    });
    // resultsAfterCreatingCustomer.
    // console.log("resultsAfterCreatingCustomer:", resultsAfterCreatingCustomer);
    // resultsAfterCreatingCustomer
  }
  return customers.data[0] || null;
  // return null;
}

export const getStripePaymentMethods = async (customerId: string): Promise<Stripe.PaymentMethod[]> => {
  const paymentMethods = await stripeServer.paymentMethods.list({
    customer: customerId,
  });
  return paymentMethods.data;
}


export async function createSetupIntentAction(customerId: string) {
  try {
    const setupIntent = await stripeServer.setupIntents.create({
      customer: customerId,
      payment_method_types: ['card'],
    });

    return { success: true, clientSecret: setupIntent.client_secret };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export const AttachThePaymentMethodToTheCustomerDefault = async (
  customerId: string,
  paymentMethodId: string
) => {
  try {
    // 1. Attach the payment method to the customer (if not already attached)
    await stripeServer.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });
    await stripeServer.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    const attachPaymentMethod = await getApiData('/pricing-and-plans/attach-payment-method', "POST", { payment_method_id: paymentMethodId }, "authorize")
    console.log("attachPaymentMethod:", attachPaymentMethod);

    return { success: true, attachPaymentMethod: attachPaymentMethod };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}


export const AddTheNewSubscribtionToTheCustomer = async (
  customerId: string,
  priceId: string,
  product: IStripeProduct,
  price: IStripePrice,
  paymentMethodId: string
) => {

  const payloadForTheSubscribtionDetails = {
    // PRODOLZI OVDE
    plan_name: product.name,
    amount: price.unit_amount as number / 100,
    currency: price.currency,
    interval: price.recurring?.interval,
  };

  console.log("payloadForTheSubscribtionDetails:", payloadForTheSubscribtionDetails);

  try {
    // 1. Get the Payment Method ID
    /*
    not working this, the payment method is not saving
    const paymentMethodData = await getApiData<{ ok: boolean, payment_method_id: string }>(
      '/pricing-and-plans/get-payment-method-id',
      "POST",
      {},
      "authorize"
    );*/

    // console.log("paymentMethodData:", paymentMethodData);

    // const paymentMethodId = paymentMethodData.payment_method_id;

    // 2. List subscriptions but ONLY expand to 'price' (Stay within 4 levels)
    const payloadForSubscribtionDetails: any = {
      customer: customerId,
      status: 'active',
      expand: ['data.items.data.price'],
    };
    console.log("payloadForSubscribtionDetails:", payloadForSubscribtionDetails);
    const subscriptions = await stripeServer.subscriptions.list(payloadForSubscribtionDetails);

    // 3. Filter manually. We fetch the Product objects separately or check metadata if available.
    // Optimization: Usually, you can put the metadata on the PRICE instead of the PRODUCT 
    // to avoid deep nesting issues.

    const activePricingSubs = [];

    for (const sub of subscriptions.data) {
      const price = sub.items.data[0].price;

      // We retrieve the product individually to check metadata safely
      const product = await stripeServer.products.retrieve(price.product as string);

      if (product.metadata?.it_is_for_pricing === "true") {
        activePricingSubs.push(sub);
      }
    }

    // --- LOGIC: CONSOLIDATE & UPDATE ---

    if (activePricingSubs.length > 0) {
      const primarySub = activePricingSubs[0];

      // Cancel duplicates
      if (activePricingSubs.length > 1) {
        const duplicates = activePricingSubs.slice(1);
        for (const sub of duplicates) {
          await stripeServer.subscriptions.cancel(sub.id);
        }
      }

      // Upgrade the primary one
      const updatedSub = await stripeServer.subscriptions.update(primarySub.id, {
        items: [{
          id: primarySub.items.data[0].id,
          price: priceId,
        }],
        default_payment_method: paymentMethodId,
        proration_behavior: 'always_invoice',
      });

      const wpDb1 = await getApiData('/pricing-and-plans/update-subscription-id', "POST", { subscriptionId: updatedSub.id, ...payloadForTheSubscribtionDetails }, "authorize")

      return { success: true, action: 'updated', subscriptionId: updatedSub.id, paymentMethodId, billing_query: true, wpDb1: wpDb1 };
    }

    // --- LOGIC: CREATE NEW ---
    const newSubscription = await stripeServer.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      default_payment_method: paymentMethodId,
      expand: ["latest_invoice.payment_intent"],
    });

    const wpDb2 = await getApiData('/pricing-and-plans/update-subscription-id', "POST", { subscriptionId: newSubscription.id, ...payloadForTheSubscribtionDetails }, "authorize")

    return { success: true, action: 'created', subscriptionId: newSubscription.id, paymentMethodId, billing_query: true, wpDb2: wpDb2 };

  } catch (error: any) {
    console.error("Subscription Error:", error.message);
    return { success: false, error: error.message, billing_query: true };
  }
};




export const getProductById = async (productId: string) => {
  try {
    const product = await stripeServer.products.retrieve(productId);
    return product;
  } catch (error: any) {
    console.error("Error fetching product by ID:", error.message);
    return null;
  }
};

export const getPriceById = async (priceId: string) => {
  try {
    const price = await stripeServer.prices.retrieve(priceId);
    return price;
  } catch (error: any) {
    console.error("Error fetching price by ID:", error.message);
    return null;
  }
};


export const getStripeInvoices = async (customerId: string) => {


  const invoices = await stripeServer.invoices.list({
    customer: customerId,
    limit: 100, // Adjust limit as needed (max 100)
  });

  return invoices;
};


export const getInvoiceById = async (invoiceId: string) => {
  try {
    const invoice = await stripeServer.invoices.retrieve(invoiceId);
    return invoice;
  } catch (error: any) {
    console.error("Error fetching invoice by ID:", error.message);
    return null;
  }
};



export async function getBusinessDetails() {
  try {
    // This billing_query retrieves your own Stripe account info
    const account = await stripeServer.accounts.retrieve();

    return {
      businessName:
        // account.settings?.dashboard.display_name || 
        "GentleRoad",
      email: account.email,
      supportEmail: account.business_profile?.support_email,
      address: account.business_profile?.support_address || {
        line1: "123 Business St",
        city: "City",
        state: "ST",
        postal_code: "12345",
        country: "US"
      },
      logo: account.settings?.branding.logo, // Returns an ID or URL depending on setup
    };
  } catch (error) {
    console.error("Error fetching account owner:", error);
    return null;
  }
}


/**
 * Removes a specific card and promotes the next available card to default.
 */
export const removeCardFromStripe = async (
  // customerId: string,
  paymentMethodId: string
) => {
  try {
    // 1. Detach the payment method
    await stripeServer.paymentMethods.detach(paymentMethodId);

    // 2. Fetch remaining cards to find a new default
    /*const paymentMethods = await stripeServer.paymentMethods.list({
      customer: customerId,
      type: 'card',
      limit: 1, // We only need the first one available
    });

    // 3. If a card exists, set it as the default for invoices
    if (paymentMethods.data.length > 0) {
      const newDefaultId = paymentMethods.data[0].id;

      await stripeServer.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: newDefaultId,
        },
      });

      return { success: true, newDefault: newDefaultId };
    }*/

    return { success: true };
  } catch (error: any) {
    console.error('Stripe Card Removal Error:', error.message);
    // throw error;
    return { success: false, error: error.message };
  }
};