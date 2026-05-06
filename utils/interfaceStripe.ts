export interface IStripePrice {
  id: string;
  unit_amount: number; // e.g., 4000 for $40.00
  currency: string;
  recurring: {
    interval: 'month' | 'year';
    interval_count: number;
  };
  metadata: Record<string, string>;
}

export interface IStripeMarketingFeature {
  name: string;
}

export interface IStripeProduct {
  id: string;
  name: string;
  description: string;
  metadata: {
    it_is_for_pricing: string;
    plan_type: string;
    save_20_percent_annual: string;
  };
  marketing_features: IStripeMarketingFeature[];
  monthly: IStripePrice;
  yearly: IStripePrice;
}



export interface IS_BillingAddress {
  city: string | null;
  country: string | null;
  line1: string | null;
  line2: string | null;
  postal_code: string | null;
  state: string | null;
}

export interface IS_BillingDetails {
  address: IS_BillingAddress;
  email: string;
  name: string;
  phone: string | null;
}

export interface IS_CardDetails {
  brand: string;
  display_brand: string;
  exp_month: number;
  exp_year: number;
  funding: string;
  last4: string;
  country: string;
  three_d_secure_usage: {
    supported: boolean;
  };
}

export interface IS_StripePaymentMethod {
  id: string; // pm_1TGztvKhVoChiPYnbAHGwV5b
  object: "payment_method";
  billing_details: IS_BillingDetails;
  card: IS_CardDetails;
  created: number;
  customer: string; // cus_Te77VG8kDArTpq
  type: "card";
  livemode: boolean;
}



export interface I_StripeInvoiceSettings {
  custom_fields: any[] | null;
  default_payment_method: string | null; // e.g., pm_1TGztvKhVoChiPYnbAHGwV5b
  footer: string | null;
  rendering_options: any | null;
}

export interface I_StripeCustomer {
  id: string; // cus_Te77VG8kDArTpq
  object: "customer";
  address: any | null;
  balance: number;
  created: number;
  currency: string | null;
  delinquent: boolean;
  description: string | null;
  email: string;
  invoice_prefix: string;
  invoice_settings: I_StripeInvoiceSettings;
  livemode: boolean;
  metadata: Record<string, any>;
  name: string | null;
  next_invoice_sequence: number;
  phone: string | null;
  preferred_locales: string[];
  tax_exempt: "none" | "exempt" | "reverse";
}