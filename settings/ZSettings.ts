export const zsettings: {
  wpURL: string;
  apiURL: string;
  stripe: { pk: string, productsIds: string, rankingProducts: string }
} = {
  wpURL: process.env.NEXT_PUBLIC_WORDPRESS_URL as string,
  apiURL: `${process.env.NEXT_PUBLIC_WORDPRESS_URL as string}${process.env.NEXT_PUBLIC_API_URL as string}`,
  stripe: {
    pk: process.env.NEXT_PUBLIC_STRIPE_PK as string,
    productsIds: process.env.NEXT_PUBLIC_STRIPE_PRODUCTS_IDS as string,
    rankingProducts: process.env.NEXT_PUBLIC_STRIPE_RANKS_PRODUCTS as string,

  }
};

console.log("zsettings:", zsettings);