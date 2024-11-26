

import { loadStripe } from "@stripe/stripe-js";

const loadstrie = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default loadStripe;