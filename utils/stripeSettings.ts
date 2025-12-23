import Stripe from 'stripe';

// This object uses your SECRET KEY (sk_...)
export const stripeServer = new Stripe(process.env.STRIPE_SK!, {
    apiVersion: '2025-12-15.clover'
});