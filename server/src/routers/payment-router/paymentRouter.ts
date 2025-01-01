import { Router, Request, Response } from 'express';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('SECRET KEY HAS NOT BEEN PROVIDED');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const paymentRouter = Router();

paymentRouter.post('/create-payment', async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;

    const paymentIntent: Stripe.PaymentIntent =
      await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
        },
      });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({
      message:
        'There was an error processing your payment. Please try again later.',
    });
  }
});

export { paymentRouter };
