export const prettifySlug = (slug: string) => {
  if (!slug) return "";

  // 1. Replace hyphens/underscores with spaces
  const spaced = slug.replace(/[-_]/g, ' ');

  // 2. Capitalize the first letter and keep the rest as is
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace any non-alphanumeric character with a hyphen
    .replace(/^-+|-+$/g, "");    // Remove leading or trailing hyphens
};

export const capitalizeFirstLetter = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatPrice = (price: number | string) => {
  const num = Number(price);

  if (isNaN(num)) return "";

  // Use Intl.NumberFormat for locale-aware formatting (commas)
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    // Change these if you don't want decimals (e.g. $1,000.00 vs $1,000)
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};