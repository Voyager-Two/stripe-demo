import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(String(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY));
  }
  return stripePromise;
};

export default getStripe;
