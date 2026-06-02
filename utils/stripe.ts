"use server";
import { zsettings } from "@/settings/ZSettings";
import Stripe from "stripe";
import { stripeServer } from "./stripeSettings";
import { getApiData } from "./api";
// import { IStripeSubscription } from '@/ContextProvider/StripePlansProvider';

export type IStripeProduct = Pick<
  Stripe.Product,
  "id" | "name" | "description" | "active" | "metadata" | "marketing_features"
>;
export type IStripePrice = Pick<
  Stripe.Price,
  "id" | "unit_amount" | "recurring" | "currency"
>;

/**
 * One big interface that combines the Stripe Product
 * with specifically mapped Monthly and Yearly prices.
 */
export interface StripeProductWithPrices extends IStripeProduct {
  monthly?: IStripePrice;
  yearly?: IStripePrice;
}

/*export const getStripePlans = async (): Promise<StripeProductWithPrices[]> => {
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
}*/

// --- SERVER-SIDE TIMED CACHE ---
let serverStripePlansCache: StripeProductWithPrices[] | null = null;
let serverFetchPromise: Promise<StripeProductWithPrices[]> | null = null;
let cacheExpirationTime: number = 0;
// Set the cache life (e.g., 1 hour)
const CACHE_DURATION_MS = 60 * 60 * 1000;
export const getStripePlans = async (): Promise<StripeProductWithPrices[]> => {
  const currentTime = Date.now();

  // 1. If cache is expired, reset everything to force a fresh Stripe API pull
  if (serverStripePlansCache && currentTime >= cacheExpirationTime) {
    console.log("⏰ Cache expired. Clearing memory for fresh sync...");
    serverStripePlansCache = null;
    serverFetchPromise = null;
  }

  // 2. If data is fresh in memory, return it instantly (takes ~2ms)
  if (serverStripePlansCache) {
    console.log("!!!!!Stripe Plan Caching: Returning cached data!!!!!");
    return serverStripePlansCache;
  }

  // 3. If no fetch is in progress, trigger the Stripe API call
  if (!serverFetchPromise) {
    serverFetchPromise = (async () => {
      const productIds = zsettings.stripe.productsIds.split(",");
      const products = await stripeServer.products.list({ ids: productIds });

      const productsWithPrices = await Promise.all(
        products.data.map(async (product) => {
          const prices = await stripeServer.prices.list({
            product: product.id,
            active: true,
          });

          return {
            ...product,
            monthly: prices.data.find((p) => p.recurring?.interval === "month"),
            yearly: prices.data.find((p) => p.recurring?.interval === "year"),
          };
        }),
      );

      // Set the expiration deadline for 1 hour from now
      cacheExpirationTime = Date.now() + CACHE_DURATION_MS;
      serverStripePlansCache = productsWithPrices;

      return productsWithPrices;
    })();
  }

  try {
    return await serverFetchPromise;
  } catch (error) {
    serverFetchPromise = null; // Clear on failure so it retries next time
    throw error;
  }
};

export const getStripeRankingProducts = async (): Promise<
  StripeProductWithPrices[]
> => {
  console.log(
    "Stripe products come from .env, don't forget to update your client stripe with the prudcts same as your stripe products list",
  );
  const productIds = zsettings.stripe.rankingProducts.split(",");
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
        // yearly: prices.data.find((p) => p.recurring?.interval === "year"),
      };
    }),
  );

  return productsWithPrices;
};

export const getDefaultPaymentMethod = async (customerId: string) => {
  try {
    // We expand 'invoice_settings.default_payment_method' to get the full object
    const customer = (await stripeServer.customers.retrieve(customerId, {
      expand: ["invoice_settings.default_payment_method"],
    })) as any;

    // Cast to your interface (I_StripeCustomer)
    const defaultMethod = customer.invoice_settings.default_payment_method;

    if (typeof defaultMethod === "object" && defaultMethod !== null) {
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

export const getStripeCustomer = async (
  email: string,
): Promise<Stripe.Customer | null> => {
  console.log("get stripe customer for email:", email);

  let customers;

  const emailForCustomer = email;
  // const emailForCustomer = 'zlatkot33esst333443445@google.com';

  console.log("get stripe customer for email:", emailForCustomer);

  customers = await stripeServer.customers.list({
    email: emailForCustomer,
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
};

export const getStripePaymentMethods = async (
  customerId: string,
): Promise<Stripe.PaymentMethod[]> => {
  const paymentMethods = await stripeServer.paymentMethods.list({
    customer: customerId,
  });
  return paymentMethods.data;
};

export async function createSetupIntentAction(customerId: string) {
  try {
    const setupIntent = await stripeServer.setupIntents.create({
      customer: customerId,
      payment_method_types: ["card"],
    });

    return { success: true, clientSecret: setupIntent.client_secret };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export const AttachThePaymentMethodToTheCustomerDefault = async (
  customerId: string,
  paymentMethodId: string,
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

    const attachPaymentMethod = await getApiData(
      "/pricing-and-plans/attach-payment-method",
      "POST",
      { payment_method_id: paymentMethodId },
      "authorize",
    );
    console.log("attachPaymentMethod:", attachPaymentMethod);

    return { success: true, attachPaymentMethod: attachPaymentMethod };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const AddTheNewSubscribtionToTheCustomer = async (
  customerId: string,
  priceId: string,
  product: IStripeProduct,
  price: IStripePrice,
  paymentMethodId: string,
) => {
  const payloadForTheSubscribtionDetails = {
    // PRODOLZI OVDE
    plan_name: product.name,
    amount: (price.unit_amount as number) / 100,
    currency: price.currency,
    interval: price.recurring?.interval,
  };

  console.log(
    "payloadForTheSubscribtionDetails:",
    payloadForTheSubscribtionDetails,
  );

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
      status: "active",
      expand: ["data.items.data.price"],
    };
    console.log(
      "payloadForSubscribtionDetails:",
      payloadForSubscribtionDetails,
    );
    const subscriptions = await stripeServer.subscriptions.list(
      payloadForSubscribtionDetails,
    );

    // 3. Filter manually. We fetch the Product objects separately or check metadata if available.
    // Optimization: Usually, you can put the metadata on the PRICE instead of the PRODUCT
    // to avoid deep nesting issues.

    const activePricingSubs = [];

    for (const sub of subscriptions.data) {
      const price = sub.items.data[0].price;

      // We retrieve the product individually to check metadata safely
      const product = await stripeServer.products.retrieve(
        price.product as string,
      );

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
      const updatedSub = await stripeServer.subscriptions.update(
        primarySub.id,
        {
          items: [
            {
              id: primarySub.items.data[0].id,
              price: priceId,
            },
          ],
          default_payment_method: paymentMethodId,
          proration_behavior: "always_invoice",
        },
      );

      const wpDb1 = await getApiData(
        "/pricing-and-plans/update-subscription-id",
        "POST",
        { subscriptionId: updatedSub.id, ...payloadForTheSubscribtionDetails },
        "authorize",
      );

      return {
        success: true,
        action: "updated",
        subscriptionId: updatedSub.id,
        paymentMethodId,
        billing_query: true,
        wpDb1: wpDb1,
      };
    }

    // --- LOGIC: CREATE NEW ---
    const newSubscription = await stripeServer.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      default_payment_method: paymentMethodId,
      expand: ["latest_invoice.payment_intent"],
    });

    const wpDb2 = await getApiData(
      "/pricing-and-plans/update-subscription-id",
      "POST",
      {
        subscriptionId: newSubscription.id,
        ...payloadForTheSubscribtionDetails,
      },
      "authorize",
    );

    return {
      success: true,
      action: "created",
      subscriptionId: newSubscription.id,
      paymentMethodId,
      billing_query: true,
      wpDb2: wpDb2,
    };
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
        country: "US",
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
  paymentMethodId: string,
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
    console.error("Stripe Card Removal Error:", error.message);
    // throw error;
    return { success: false, error: error.message };
  }
};

/**
 * Adds a new subscription to a customer
 * @param customerId - Stripe Customer ID (cus_...)
 * @param priceId - Stripe Price ID (price_...)
 */
export const addSubscription = async (
  customerId: string,
  priceId: string,
  paymentMethodId: string,
  metadata: Record<string, string> | undefined = undefined,
) => {
  try {
    const subscription = await stripeServer.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      // 1. Explicitly link the card to this subscription
      default_payment_method: paymentMethodId,
      // 2. Tell Stripe to try the charge immediately
      payment_behavior: "error_if_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      // 3. This expansion is what gives you the secret
      expand: ["latest_invoice.payment_intent"],

      metadata: metadata,
    });

    // let invoice = subscription.latest_invoice as any;

    let invoice = subscription.latest_invoice as any;

    // 2. If payment_intent is MISSING, we force a payment attempt
    if (!invoice.payment_intent && invoice.status !== "paid") {
      invoice = await stripeServer.invoices.pay(invoice.id, {
        expand: ["payment_intent"],
      });
    }

    // DEBUG: If this is still null, look at invoice.billing_reason
    const paymentIntent = invoice?.payment_intent;

    // 1. Wait a tiny bit (optional but helpful) or go straight to retrieve
    // 2. Fetch the absolute latest state of the subscription
    const finalizedSubscription = await stripeServer.subscriptions.retrieve(
      subscription.id,
      {
        expand: ["latest_invoice.payment_intent"],
      },
    );

    return {
      success: true,
      subscriptionId: subscription.id,
      clientSecret: paymentIntent?.client_secret || null,
      // status: subscription.status,
      status: finalizedSubscription.status, // This should now say 'active'
      // it will show false because of not database stripe updating
      invoice_is_paid: invoice.paid === true,
      // invoice: invoice
    };
  } catch (error: any) {
    console.error("Add Subscription Error:", error.message);
    // throw error;
    return {
      success: false,
      message: error.message,
      status: "error",
    };
  }
};

/**
 * Removes/Cancels a subscription
 * @param subscriptionId - Stripe Subscription ID (sub_...)
 * @param immediate - If true, cancels now. If false, cancels at end of billing cycle.
 */
export const removeSubscription = async (
  subscriptionId: string,
  immediate: boolean = false,
) => {
  try {
    let deletedSubscription;

    if (immediate) {
      // Ends the subscription immediately
      deletedSubscription =
        await stripeServer.subscriptions.cancel(subscriptionId);
    } else {
      // Updates the subscription to cancel at the end of the period
      deletedSubscription = await stripeServer.subscriptions.update(
        subscriptionId,
        {
          cancel_at_period_end: true,
        },
      );
    }

    return {
      success: true,
      status: deletedSubscription.status,
      cancelAtPeriodEnd: deletedSubscription.cancel_at_period_end,
    };
  } catch (error: any) {
    console.error("Remove Subscription Error:", error.message);
    throw error;
  }
};

export const updateSubscription = async (
  subscriptionId: string,
  priceId: string,
  metadata: Record<string, string> | undefined = undefined,
) => {
  try {
    // 1. Get the current subscription to find the item ID
    const currentSubscription =
      await stripeServer.subscriptions.retrieve(subscriptionId);

    console.log("currentSubscription", currentSubscription);

    const subscription = await stripeServer.subscriptions.update(
      subscriptionId,
      {
        items: [
          {
            id: currentSubscription.items.data[0].id, // We must update the existing item
            price: priceId,
          },
        ],
        payment_behavior: "error_if_incomplete", // Keeps sub active while payment is processed
        proration_behavior: "always_invoice", // Charge the difference immediately
        expand: ["latest_invoice.payment_intent"],
        metadata: metadata,
      },
    );

    let invoice = subscription.latest_invoice as any;

    // 2. If it's an upgrade and payment is needed, force the intent generation
    if (
      invoice &&
      !invoice.payment_intent &&
      invoice.amount_due > 0 &&
      invoice.status !== "paid"
    ) {
      invoice = await stripeServer.invoices.pay(invoice.id, {
        expand: ["payment_intent"],
      });
    }

    const paymentIntent = invoice?.payment_intent;

    const finalizedSubscription = await stripeServer.subscriptions.retrieve(
      subscription.id,
      {
        expand: ["latest_invoice.payment_intent"],
      },
    );

    return {
      success: true,
      subscriptionId: subscription.id,
      // If an upgrade requires 3DS, this secret goes to your frontend popup
      clientSecret: paymentIntent?.client_secret || null,
      status: finalizedSubscription.status,
    };
  } catch (error: any) {
    console.error("Update Subscription Error:", error.message);
    // throw error;
    return {
      success: false,
      message: error.message,
      status: "error",
    };
  }
};

/**
 *
 * @param customerId
 * @param items
 * @param subscribtion
 *  Invoice items updating the data on the invoice
 *  using it to update the subscription metadata
 * this function is adding another items in the invoice
 */
/*const UpdateTheInvoiceForTheGroupSubscribtion = async (subscribtion: any) => {
  // ✅ Extract properties directly from the subscription object
  const customerId = typeof subscribtion.customer === 'string'
    ? subscribtion.customer
    : subscribtion.customer?.id; // Handles cases where customer might be expanded

  const items = subscribtion.items?.data || [];

  // ✅ Fallback to ensure we have at least one item to read periods from
  const firstItem = items[0];
  if (!firstItem) {
    throw new Error("No subscription items found on this payload to determine billing period.");
  }

  // ✅ Extract true billing period limits from the active subscription item
  const periodStart = firstItem.current_period_start;
  const periodEnd = firstItem.current_period_end;

  console.log("subscribtion ID:", subscribtion.id);
  console.log("periodStart:", periodStart);
  console.log("periodEnd:", periodEnd);

  // Convert Stripe's Unix timestamps (seconds) into readable text strings
  const startDateObj = new Date(periodStart * 1000);
  const endDateObj = new Date(periodEnd * 1000);

  const formatOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  const humanReadableDates = `${startDateObj.toLocaleDateString('en-US', formatOptions)} – ${endDateObj.toLocaleDateString('en-US', formatOptions)}`;

  // ✅ Maps over your existing active items array to inject the supplementary pending invoice items
  await Promise.all(
    items.map(() =>
      stripeServer.invoiceItems.create({
        customer: customerId,
        currency: 'usd',
        amount: 10000,
        description: `Custom Description for the invoice - ${humanReadableDates}`,
        period: {
          start: periodStart,
          end: periodEnd
        },
        subscription: subscribtion.id
      })
    )
  );
};*/

/**
 *
 * @param subscribtion
 * Works only when the invoice is in draft mode
 */
const UpdateExistingInvoiceLineDescriptions = async (subscribtion: any) => {
  // 1. Safely extract the invoice ID (handles both expanded object or string ID)
  const invoiceId =
    typeof subscribtion.latest_invoice === "string"
      ? subscribtion.latest_invoice
      : subscribtion.latest_invoice?.id;

  if (!invoiceId) {
    throw new Error(
      "No latest_invoice found on the provided subscription payload.",
    );
  }

  // 2. Extract true billing period limits from the active subscription item
  const firstItem = subscribtion.items?.data?.[0];
  if (!firstItem) {
    throw new Error(
      "No subscription items found on this payload to determine billing period.",
    );
  }

  const periodStart = firstItem.current_period_start;
  const periodEnd = firstItem.current_period_end;

  // 3. Convert Stripe's Unix timestamps (seconds) into readable text strings
  const startDateObj = new Date(periodStart * 1000);
  const endDateObj = new Date(periodEnd * 1000);

  const formatOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const humanReadableDates = `${startDateObj.toLocaleDateString("en-US", formatOptions)} – ${endDateObj.toLocaleDateString("en-US", formatOptions)}`;

  // 4. Retrieve the draft invoice's line items
  const invoiceLines = await stripeServer.invoices.listLineItems(invoiceId);

  // 5. Loop through the existing lines and update their descriptions without adding charges
  await Promise.all(
    invoiceLines.data.map((lineItem) =>
      stripeServer.invoices.updateLineItem(invoiceId, lineItem.id, {
        description: `Custom Description for the invoice - ${humanReadableDates}`,
      }),
    ),
  );
};

/**
 * Adds multiple items to an existing group or creates the group if it doesn't exist.
 * @param items - Array of { priceId: string, metadata: Record<string, string> }
 * the price is related to the stripe products but it is custom
 */
export const AddItemsToStripeGroupSubscribtion = async (
  customerId: string,
  items: {
    // priceId: string;
    // productId: string;
    product: StripeProductWithPrices;
    metadata: Record<string, string>;
  }[],
  subscriptionId?: string | null,
  metadataForSubscribtion?: Record<string, string>,
) => {
  let itemsForSubscribtion: any[] = [];

  try {
    // Transform our clean input into Stripe's line_items format
    const NewItems = items.map((item) => {
      // const unique_line_id = `${Date.now()}-${item.metadata.id}-${Math.random().toString(36).substr(2, 9)}`;
      return {
        // we can not do this, stripe do not allow addding same item twice, instead we update the subscription and delete the item we want to remove
        // price: item.priceId,
        /*product: {

        },*/
        price_data: {
          currency: "usd",
          product: item.product.id, // Same product ID
          recurring: { interval: "month" },
          unit_amount: item.product.monthly?.unit_amount as number, // $15.00
        },

        // we need to add custom product for each item, because it is not from the dashboard products
        metadata: {
          ...item.metadata,

          /*description: "Custom Description Here",
          custom_label: "Custom Label Here",
          unique_line_id: unique_line_id,
          item_index: unique_line_id*/
        },
      };
    });

    itemsForSubscribtion = NewItems;

    let subscription: any;

    if (!subscriptionId) {
      /**
       * CASE: Create the container with multiple items
       */
      subscription = await stripeServer.subscriptions.create({
        customer: customerId,
        items: itemsForSubscribtion,
        // add_invoice_items: SubscribtionCustomInvoiceItems(stripeItems),
        /**
         * This is Stripe's default behavior if you don't specify anything. It tells Stripe: "Keep everything on hold in a draft state until the user pays on the frontend."
         */
        /**When you use 'allow_incomplete', you tell Stripe: "I want this subscription to start right now today (May 16). Calculate the normal billing dates for this month immediately, even if we haven't charged their card yet." */
        payment_behavior: "error_if_incomplete",
        payment_settings: { save_default_payment_method: "on_subscription" },
        expand: ["latest_invoice.payment_intent"],

        metadata: {
          ...(metadataForSubscribtion !== undefined
            ? metadataForSubscribtion
            : {}),
          subscribtion_is_for: "ranking",
        },

        // ✅ FORCE STRIPE TO BYPASS DASHBOARD TRIALS AND START BILLING TODAY
        // trial_end: 'now',
      });

      // await UpdateTheInvoiceForTheGroupSubscribtion(customerId, items, subscription.id);
    } else {
      /**
       * CASE 2: Add to Existing Subscription Container (3 Old + 3 New = 6 Items)
       * We MUST retrieve the existing items first so Stripe appends them instead of overwriting them.
       */
      const existingSub =
        await stripeServer.subscriptions.retrieve(subscriptionId);

      // Preserve all existing items currently on the subscription
      const theOldItems: any[] = existingSub.items.data.map(
        (existingItem: any) => ({
          id: existingItem.id, // Providing the ID tells Stripe: "Leave this item completely active"
        }),
      );

      itemsForSubscribtion = [...theOldItems, ...NewItems];

      if (itemsForSubscribtion.length > 20) {
        return {
          success: false,
          message: "You cannot have more then 20 items in a subscription",
          status: "error",
        };
      }

      /**
       * CASE: Add multiple items to the existing container
       */
      subscription = await stripeServer.subscriptions.update(subscriptionId, {
        items: itemsForSubscribtion,
        // add_invoice_items: SubscribtionCustomInvoiceItems(updateItemsPayload),
        // proration_behavior: 'none',
        // proration_behavior: 'always_invoice',
        payment_behavior: "error_if_incomplete",
        expand: ["latest_invoice.payment_intent"],

        metadata: {
          ...existingSub.metadata,
          ...(metadataForSubscribtion !== undefined
            ? metadataForSubscribtion
            : {}),
        },
      });

      // await UpdateTheInvoiceForTheGroupSubscribtion(customerId, items, subscription.id);
    }

    let invoice = subscription.latest_invoice as any;
    // console.log("invoice:", invoice);

    // If it's an upgrade and payment is needed, force the intent generation
    if (
      invoice &&
      invoice.status !== "paid" &&
      !invoice.payment_intent &&
      invoice.amount_due > 0
    ) {
      invoice = await stripeServer.invoices.pay(invoice.id, {
        expand: ["payment_intent"],
      });
    }
    const paymentIntent = invoice?.payment_intent;

    const finalizedSubscription = await stripeServer.subscriptions.retrieve(
      subscription.id,
      {
        expand: ["latest_invoice.payment_intent"],
      },
    );

    /*
    Do not work here, invoice is not in draft mode
    await UpdateExistingInvoiceLineDescriptions(
      // customerId, itemsForSubscribtion, 
      finalizedSubscription
    );*/

    return {
      success: true,
      subscriptionId: subscription.id,

      // clientSecret: paymentIntent?.client_secret || null,
      status: finalizedSubscription.status,
      subscribtion_items: itemsForSubscribtion,
    };
  } catch (error: any) {
    console.error("Add Multi-Item Error:", error.message);
    return { success: false, message: error.message };
  }
};

export const RemoveItemsToStripeGroupSubscription = async (
  subscription_item_id: string,
) => {
  try {
    if (!subscription_item_id) {
      throw new Error("Subscription item ID is required.");
    }

    // Delete the specific subscription item from the group
    const deletedItem = await stripeServer.subscriptionItems.del(
      subscription_item_id,
      {
        // 'always_invoice' cuts an immediate refund/invoice adjustment.
        // 'create_prorations' (default) calculates the line item change for the next invoice.
        proration_behavior: "create_prorations",
      },
    );

    return {
      success: true,
      message: "Item successfully removed from group subscription.",
      deletedItemId: deletedItem.id,
    };
  } catch (error: any) {
    console.error(
      "Error removing item from Stripe group subscription:",
      error.message,
    );
    return {
      success: false,
      error: error.message || "Failed to remove item from subscription group.",
    };
  }
};
