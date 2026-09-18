import { Account } from "../models/account.model.js";
import { Transaction } from "../models/transaction.model.js";

const dashboardApi = async (req, res) => {
  try {
    const findAccount = await Account.findOne({ user_id: req.user._id });

    if (!findAccount) {
      res.status(401).json({
        message: "Account not found",
      });
    }
    // Account detail
    const account = await Account.findOne({ user_id: req.user._id }).select(
      "-_id -user_id -createdAt -updatedAt",
    );
    // total Balance
    const totalBalance = account.balance;
    // total transection
    const totalTransaction = await Transaction.find({
      account_id: findAccount._id,
    });

    const today = new Date();

    //  today deposit
    const todayDeposit = await Transaction.aggregate([
      {
        $match: {
          account_id: findAccount._id,
          transaction_type: "deposit",
          createdAt: {
            $gte: new Date(today.setHours(0, 0, 0, 0)),
            $lte: new Date(today.setHours(23, 59, 59, 999)),
          },
        },
      },
      {
        $group: {
          _id: "$transaction_type",
          totalAmount: {
            $sum: "$amount",
          },
          transaction: {
            $push: "$$ROOT",
          },
        },
      },
    ]);

    const todayWithdrawal = await Transaction.aggregate([
      {
        $match: {
          account_id: findAccount._id,
          transaction_type: "withdrawal",
          createdAt: {
            $gte: new Date(today.setHours(0, 0, 0, 0)),
            $lte: new Date(today.setHours(23, 59, 59, 999)),
          },
        },
      },
      {
        $group: {
          _id: "transaction_type",
          totalAmount: {
            $sum: "$amount",
          },
          transaction: {
            $push: "$$ROOT",
          },
        },
      },
    ]);

    //  today all transaction

    const TodayallTransaction = await Transaction.aggregate([
      {
        $match: {
          account_id: findAccount._id,
          createdAt: {
            $gte: new Date(today.setHours(0, 0, 0, 0)),
            $lte: new Date(today.setHours(23, 59, 59, 999)),
          },
        },
      },
    ]);
    //  month wise all transaction

    const monthWiseTransaction = await Transaction.aggregate([
      {
        $match: {
          account_id: findAccount._id,
          createdAt: {
            $gte: new Date(today.getFullYear(), today.getMonth(), 1),
            $lt: new Date(today.getFullYear(), today.getMonth() + 1, 1),
          },
        },
      },
    ]);

    // year wise all transaction
    const yearhWiseTransaction = await Transaction.aggregate([
      {
        $match: {
          account_id: findAccount._id,
          createdAt: {
            $gte: new Date(today.getFullYear(), 0, 1),
            $lt: new Date(today.getFullYear(), today.getMonth() + 1, 0, 1),
          },
        },
      },
    ]);
    res.status(201).json({
      message: "Dashboard fetch successfully",
      account,
      totalBalance,
      totalTransaction,
      todayDeposit,
      todayWithdrawal,
      TodayallTransaction,
      monthWiseTransaction,
      yearhWiseTransaction,
    });
  } catch (error) {
    console.log("Error while dashboard..", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { dashboardApi };
