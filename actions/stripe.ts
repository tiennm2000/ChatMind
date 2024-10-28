"use server";
import dbConnect from "@/lib/db";
import Transaction from "@/models/transaction";
import { currentUser, EmailAddress } from "@clerk/nextjs/server";
import stripe from "@/utils/stripe";

interface CheckoutSessionResponse {
  url?: string;
  error?: string;
}

export async function createCheckoutSession(): Promise<CheckoutSessionResponse> {
  const user = await currentUser();
  const customerEmail = user?.emailAddresses[0]?.emailAddress;
  if (!customerEmail) {
    return { error: "User not found" };
  }

  try {
    await dbConnect();

    const existingTransaction = await Transaction.findOne({ customerEmail });

    if (existingTransaction) {
      const subscriptions = await stripe.subscriptions.list({
        customer: existingTransaction.customerId,
        status: "all",
        limit: 1,
      });

      const currentSubscription = subscriptions.data.find(
        (sub) => sub.status === "active"
      );

      if (currentSubscription) {
        return { error: "You already have an active subscription" };
      }
    }

    //create a new session checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_MONTHLY_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "subscription",
      customer_email: customerEmail,
      success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}`,
    });

    return { url: session.url ?? undefined };
  } catch (err) {
    console.error(err);
    return { error: "Error creating stripe checkout session" };
  }
}

export async function checkUserSubcription() {
  const user = await currentUser();
  const customerEmail = user?.emailAddresses[0]?.emailAddress;

  try {
    const transaction = await Transaction.findOne({
      customerEmail,
      status: "complete",
    });

    if (transaction && transaction.subscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(
        transaction.subscriptionId
      );

      if (subscription.status === "active") {
        return { ok: true };
      } else {
        return { ok: false };
      }
    }
  } catch (err) {
    console.error(err);
    return { message: "Error checking subscription" };
  }
}

export async function createCustomerPortalSession() {
  const user = await currentUser();
  const customerEmail = user?.emailAddresses[0]?.emailAddress;

  try {
    const transaction = await Transaction.findOne({
      customerEmail,
    });

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: transaction.customerId,
      return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
    });

    return portalSession.url ?? `${process.env.NEXT_PUBLIC_URL}/dashboard`;
  } catch (err) {
    console.error(err);
    return null;
  }
}
