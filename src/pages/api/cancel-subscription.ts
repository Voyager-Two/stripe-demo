import StripeService from "@app/util/stripe.service";

export default async function handler(req: { body: any }, res: any) {
  // TODO: data validation

  try {
    const stripeService = new StripeService();
    const stripeResponse = await stripeService.cancelSubscription(req.body);

    if (!stripeResponse?.refund) {
      return res.status(500).send({ error: "Stripe API error when creating subscription." });
    }

    return res.status(200).send({ success: true, stripeResponse });
  } catch (err) {
    return res.status(500).send({ error: "Stripe API error." });
  }
}
