export const zsettings: {
  wpURL: string;
  apiURL: string;
  stripe: { pk: string, productsIds: string, rankingProducts: string },
  scraping: { server: string, ws: string }
} = {
  wpURL: process.env.NEXT_PUBLIC_WORDPRESS_URL as string,
  apiURL: `${process.env.NEXT_PUBLIC_WORDPRESS_URL as string}${process.env.NEXT_PUBLIC_API_URL as string}`,
  stripe: {
    pk: process.env.NEXT_PUBLIC_STRIPE_PK as string,
    productsIds: process.env.NEXT_PUBLIC_STRIPE_PRODUCTS_IDS as string,
    rankingProducts: process.env.NEXT_PUBLIC_STRIPE_RANKS_PRODUCTS as string,

  },
  scraping: {
    server: process.env.NEXT_PUBLIC_SCRAPING_SERVER as string,
    ws: process.env.NEXT_PUBLIC_SCRAPING_SOCKET as string
  }
};

console.log("zsettings:", zsettings);