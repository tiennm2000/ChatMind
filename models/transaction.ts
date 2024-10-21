import mongoose from "mongoose";

const { Schema } = mongoose;

const TransactionSchema = new Schema(
  {
    SessionId: String,
    customerId: String,
    invoiceID: String,
    subscriptionId: String,
    mode: String,
    paymentMethod: String,
    customerEmail: String,
    amountTotal: Number,
    status: String,
  },
  { timestamps: true }
);

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);

export default Transaction;
