import dbConnect from "@/lib/db";
import Transaction from "@/models/transaction";
import stripe from "@/utils/stripe";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  await dbConnect();
  const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();
  try {
    const event = stripe.webhooks.constructEvent(body, sig, endPointSecret);

    if (event.type == "checkout.session.completed") {
      const session = event.data.object;

      const transaction = await new Transaction({
        sessionId: session.id,
        customerId: session.customer,
        invoiceId: session.invoice,
        subscriptionId: session.subscription,
        mode: session.mode,
        paymentStatus: session.payment_status,
        customerEmail: session.customer_email,
        amountTotal: session.amount_total,
        status: session.status,
      });

      await transaction.save();
      return Response.json({
        message: "Webhook received: Checkout session completed",
      });
    }
  } catch (err) {
    return new Response("Webhook error", { status: 400 });
  }
}
