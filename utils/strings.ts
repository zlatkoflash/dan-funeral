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

export const formatPrice = (price: number | string, numberDecimals: number = 0) => {
  const num = Number(price);

  if (isNaN(num)) return "";

  // Use Intl.NumberFormat for locale-aware formatting (commas)
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    // Change these if you don't want decimals (e.g. $1,000.00 vs $1,000)
    minimumFractionDigits: numberDecimals,
    maximumFractionDigits: numberDecimals,
  }).format(num);
};


export const FriendlyLeadsDate = (date: Date) => {
  const date_ = new Date(date);
  const diff = Date.now() - date_.getTime();
  const diffInMinutes = Math.floor(diff / 60000);
  if (diffInMinutes < 1) {
    return "Just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInMinutes < 24 * 60) {
    const diffInHours = Math.floor(diffInMinutes / 60);
    return `${diffInHours}h ago`;
  } else if (diffInMinutes < 7 * 24 * 60) {
    const diffInDays = Math.floor(diffInMinutes / (24 * 60));
    return `${diffInDays}d ago`;
  } else if (diffInMinutes < 30 * 24 * 60) {
    const diffInWeeks = Math.floor(diffInMinutes / (7 * 24 * 60));
    return `${diffInWeeks}w ago`;
  } else if (diffInMinutes < 365 * 24 * 60) {
    const diffInMonths = Math.floor(diffInMinutes / (30 * 24 * 60));
    return `${diffInMonths}mo ago`;
  } else {
    const diffInYears = Math.floor(diffInMinutes / (365 * 24 * 60));
    return `${diffInYears}y ago`;
  }
}

export const FriendlyDates = (date: Date) => {
  const date_ = new Date(date);
  return date_.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const FriendlyDatesShort = (date: Date) => {
  const date_ = new Date(date);
  return date_.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}