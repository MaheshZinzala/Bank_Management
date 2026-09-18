import mongoose, { Schema } from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    account_no: {
      type: String,
      required: true,
      unique: true,
    },
    account_type: {
      type: String,
      enum: ["saving", "current"],
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    transaction_pin: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Account = mongoose.model("Account", accountSchema);
