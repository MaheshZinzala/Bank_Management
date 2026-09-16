import mongoose, { Schema } from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    account_id: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    transaction_type: {
      type: String,
      enum: ["deposit", "withdrawal"],
      required: true,
    },
    description: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
      min: [1, "Amount must be greater than 0"],
    },
    after_balance: {
      type: Number,
    },
  },
  { timestamps: true },
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
