export const formatDateStripeSubscribtion = (seconds: number) => {
  // Stripe gives seconds, JS Date needs milliseconds
  const date = new Date(seconds * 1000);

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);

};