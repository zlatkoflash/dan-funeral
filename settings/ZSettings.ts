export const zsettings: {
  wpURL: string;
  apiURL: string;
} = {
  wpURL: process.env.NEXT_PUBLIC_WORDPRESS_URL as string,
  apiURL: `${process.env.NEXT_PUBLIC_WORDPRESS_URL as string}/${process.env.NEXT_PUBLIC_API_URL as string}`
};

console.log("zsettings:", zsettings);