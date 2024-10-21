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
  } catch (err) {
    console.error(err);
    return { error: "Error creating stripe checkout session" };
  }
}
