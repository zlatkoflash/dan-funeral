// app/api/stripe/webhook/route.ts
import { getApiData } from '@/utils/api';
import { stripeServer } from '@/utils/stripeSettings';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SK!);

export async function POST(req: Request) {
  const body = await req.text(); // Get raw body for Stripe signature
  const sig = req.headers.get('stripe-signature')!;

  try {
    const event = stripeServer.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET! // The whsec_ from your CLI
    );

    // Handle the event
    console.log('✅ Event received:', event.type,);

    // Here is where you forward to WordPress
    // await fetch('https://your-wp-site.com/wp-json/gentle-road/v1/stripe-handler', { ... })
    // updating the subscribtion data
    switch (event.type) {
      case "customer.subscription.updated":
      case "customer.subscription.created":
      case "customer.subscription.paused":
      case "customer.subscription.resumed":
      // case "customer.subscription.pending_update_applied":
      // case "customer.subscription.pending_update_expired":
      // case "customer.subscription.trial_will_end":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        // await updateSubscriptionStatusInDb(subscription.id, subscription.status);
        // await getApiData("/listings", "POST", {}, "authorize", "application/json");
        // console.log("subscription:", subscription);
        // const plan = subscription.metadata.plan_slug;
        console.log("subscription.metadata:", subscription.metadata);
        if (subscription.metadata.subscribtion_is_for === "listing-plan") {
          const detailsSubForListing = {
            listing_id: subscription.metadata.listing_id,
            event: event.type,
            subscribtionData: {
              customer_id: subscription.customer,
              subscribtion_id: subscription.id,
              product_price_id: subscription.items.data[0].price.id,
              status: subscription.status,
              plan_slug: subscription.metadata.plan_slug,
              plan_type: subscription.metadata.plan_type,
              plan_period: subscription.metadata.plan_period,
            }
          };
          console.log("Sending info to the database:");
          const resultsAfterSaving = await getApiData("/listings/SUBSCRIBTION_UPDATE___UpdateListing",
            "POST", detailsSubForListing, "not-authorize", "application/json");
          console.log("resultsAfterSaving:", resultsAfterSaving);
          console.log("^^^^^^^^^^^^^^^^^^^^^^Sending info to the databsae ended^^^^^^^^^^^^^^^^^^^^^^^^");
        }
        else if (subscription.metadata.subscribtion_is_for === "ranking") {
          const DetailsForRanking = {
            subscribtion_items: subscription.items.data,
            subscribtion_id: subscription.id,
            subscription_status: subscription.status,
            event: event.type,
            listing_id: subscription.metadata.listing_id,
            /*subscribtionData: {
              customer_id: subscription.customer,
              subscribtion_id: subscription.id,
              // product_price_id: subscription.items.data[0].price.id,
              status: subscription.status,
            }*/
          };
          if (subscription.items.data.length > 0) {
            console.log("subscription.items.data[0].metadata:", subscription.items.data[0].metadata);
            console.log("subscription.items.data[0].price:", subscription.items.data[0].price);
            console.log("subscription.items.data[0].plan:", subscription.items.data[0].plan);
          }
          console.log("DetailsForRanking:", DetailsForRanking);
          const resultsAfterSaving = await getApiData("/listings/RankingSubscribtion_Update",
            "POST", DetailsForRanking, "not-authorize", "application/json");
          console.log("resultsAfterSaving:", resultsAfterSaving);
        }

      } break;


      case "invoice.paid":
      case "invoice.payment_failed": {

        // console.log("payment details:", event.data);
        // console.log("subscribtion details:", event.data.object.parent?.subscription_details);
        const metadata = event.data.object.parent?.subscription_details?.metadata;

        let object = {};
        if (metadata !== null && metadata !== undefined) {
          if (metadata.subscribtion_is_for === "listing-plan") {
            object = {
              subtotal: event.data.object.subtotal,
              taxes: event.data.object.total - event.data.object.subtotal,
              total: event.data.object.total,
              invoice_link: event.data.object.invoice_pdf,
              transaction_id: event.data.object.id,
              customer_id: event.data.object.customer,
              user_id: metadata?.user_id,
              failure_reason: event.data.object.last_finalization_error !== null ? event.data.object.last_finalization_error.message : null
            };
          }
          if (metadata.subscribtion_is_for === "ranking") {

            console.log("Subscribtion for ranking after payment update:");
            console.log(event.data.object);
            console.log("Subscribtion Lines:");
            console.log(event.data.object.lines.data);

            object = {};
          }
        }

        const actionsResultsAfterPayment = await getApiData("/listings/SUBSCRIBTION_UPDATE___UpdatesAfterPaymentsEvents",
          "POST", {
          event: event.type,
          // event: "invoice.payment_failed", debugging
          metadata,
          object
        }, "not-authorize", "application/json");
        console.log("actionsResultsAfterPayment:", actionsResultsAfterPayment);

      } break;
    }


    // invoice updated
    /*switch (event.type) {
      case "invoice.updated":
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log("invoice:", invoice);
        break;
      }
    }*/

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error(`❌ Webhook Error: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
}