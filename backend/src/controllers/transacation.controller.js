import { Account } from "../models/account.model.js";
import { Transaction } from "../models/transaction.model.js";

const depositApi = async (req, res) => {
  try {
    const { transaction_type, description, transaction_pin, amount } = req.body;
    const numericAmount = Number(amount);
    if (
      !numericAmount ||
      !transaction_pin ||
      !transaction_type ||
      !description
    ) {
      return res.status(401).json({ message: "All field are required" });
    }
    const findAccount = await Account.findOne({ user_id: req.user._id });
    if (!findAccount) {
      return res.status(401).json({ message: "Your account is not found" });
    }
    if (findAccount.transaction_pin !== transaction_pin) {
      return res
        .status(401)
        .json({ message: "Your transaction pin is not valid" });
    }
    if (findAccount.account_type === "saving") {
      if (findAccount.balance < 15000) {
        if (numericAmount >= 15000 && transaction_type === "deposit") {
          findAccount.balance = findAccount.balance + numericAmount;
          await findAccount.save();
          const transaction = await Transaction.create({
            account_id: findAccount._id,
            transaction_type,
            description,
            amount: numericAmount,
            after_balance: findAccount.balance,
          });
          res
            .status(201)
            .json({ message: "Your deposit is successfully", transaction });
        } else {
          res.status(401).json({
            message:
              "Your first deposit is 15000 because your account is saving",
          });
        }
      } else {
        if (transaction_type === "deposit") {
          findAccount.balance = findAccount.balance + numericAmount;
          await findAccount.save();
          const transaction = await Transaction.create({
            account_id: findAccount._id,
            transaction_type,
            description,
            amount: numericAmount,
            after_balance: findAccount.balance,
          });
          res
            .status(201)
            .json({ message: "Your deposit is successfully", transaction });
        }
      }
    } else {
      if (findAccount.account_type === "current") {
        if (findAccount.balance < 10000) {
          if (numericAmount >= 10000 && transaction_type === "deposit") {
            findAccount.balance = findAccount.balance + numericAmount;
            await findAccount.save();
            const transaction = await Transaction.create({
              account_id: findAccount._id,
              transaction_type,
              description,
              amount: numericAmount,
              after_balance: findAccount.balance,
            });
            res
              .status(201)
              .json({ message: "Your deposit is successfully", transaction });
          } else {
            res.status(401).json({
              message:
                "Your first deposit is 10000 because your account is current",
            });
          }
        } else {
          if (transaction_type === "deposit") {
            findAccount.balance = findAccount.balance + numericAmount;
            await findAccount.save();
            const transaction = await Transaction.create({
              account_id: findAccount._id,
              transaction_type,
              description,
              amount: numericAmount,
              after_balance: findAccount.balance,
            });
            res
              .status(201)
              .json({ message: "Your deposit is successfully", transaction });
          }
        }
      }
    }
  } catch (error) {
    console.log("Error while deposit the money");
    res.status(500).json({ message: "Internal server error" });
  }
};

const withdrawalApi = async (req, res) => {
  try {
    const { transaction_type, description, transaction_pin, amount } = req.body;
    const numericAmount = Number(amount);
    if (
      !numericAmount ||
      !transaction_pin ||
      !transaction_type ||
      !description
    ) {
      return res.status(401).json({ message: "All field are required" });
    }
    const findAccount = await Account.findOne({ user_id: req.user._id });
    if (!findAccount) {
      return res.status(401).json({ message: "Your account is not found" });
    }
    if (findAccount.transaction_pin !== transaction_pin) {
      return res
        .status(401)
        .json({ message: "Your transaction pin is not valid" });
    }
    if (findAccount.account_type === "saving") {
      if (findAccount.balance > 15000) {
        if (transaction_type === "withdrawal") {
          const new_balance = findAccount.balance - numericAmount;
          if (new_balance >= 15000) {
            findAccount.balance = new_balance;
            await findAccount.save();
            const transaction = await Transaction.create({
              account_id: findAccount._id,
              transaction_type,
              description,
              amount: numericAmount,
              after_balance: findAccount.balance,
            });
            res.status(201).json({
              message: "Your withdrawal is successfully",
              transaction,
            });
          } else {
            res.status(401).json({
              message: "Since your account is a savings. you must keep 15,000",
            });
          }
        }
      } else {
        res.status(401).json({
          message: "Since your account is a savings. you must keep 15,000",
        });
      }
    } else {
      if (findAccount.account_type === "current") {
        if (findAccount.balance > 10000) {
          if (transaction_type === "withdrawal") {
            const new_balance = findAccount.balance - numericAmount;
            if (new_balance >= 10000) {
              findAccount.balance = new_balance;
              await findAccount.save();
              const transaction = await Transaction.create({
                account_id: findAccount._id,
                transaction_type,
                description,
                amount: numericAmount,
                after_balance: findAccount.balance,
              });
              res.status(201).json({
                message: "Your withdrawal is successfully",
                transaction,
              });
            } else {
              res.status(401).json({
                message:
                  "Since your account is a current. you must keep 10,000",
              });
            }
          }
        } else {
          res.status(401).json({
            message: "Since your account is a current. you must keep 10,000",
          });
        }
      }
    }
  } catch (error) {
    console.log("Error while withdrawal the money");
    res.status(500).json({ message: "Internal server error" });
  }
};

const passbookApi = async (req, res) => {
  try {
    const findAccount = await Account.findOne({ user_id: req.user._id });
    if (!findAccount) {
      return res.status(401).json({ message: "Your account is not found" });
    }
    const findTransection = await Transaction.find({
      account_id: findAccount._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Passbook fetched successfully",
      findTransection,
    });
  } catch (error) {
    console.log("Error while passbook Api calling");
    res.status(500).json({ message: "Internal server error" });
  }
};

const transacationWiseSearch = async (req, res) => {
  try {
    const { transaction_type } = req.query;

    if (typeof transaction_type !== "string" || !transaction_type.trim()) {
      return res.status(400).json({
        message: "Transaction type is required",
      });
    }

    const findAccount = await Account.findOne({
      user_id: req.user._id,
    });

    if (!findAccount) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    const transaction = await Transaction.find({
      account_id: findAccount._id,
      transaction_type: {
        $regex: transaction_type.trim(),
        $options: "i",
      },
    });

    if (transaction.length === 0) {
      return res.status(200).json({
        message: "No transaction found",
        transaction: [],
      });
    }

    res.status(200).json({
      message: "Transaction fetched successfully",
      transaction,
    });
  } catch (error) {
    console.log("Error while searching transaction type", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const descriptionWiseSearch = async (req, res) => {
  try {
    const { description } = req.query;
    if (typeof description !== "string" || !description.trim()) {
      return res.status(400).json({
        message: "Description is required",
      });
    }

    const findAccount = await Account.findOne({
      user_id: req.user._id,
    });

    if (!findAccount) {
      return res.status(404).json({
        message: "Account not found",
      });
    }
    const findDescription = await Transaction.find({
      account_id: findAccount._id,
      description: {
        $regex: description.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        $options: "i",
      },
    });
    if (findDescription.length === 0) {
      return res.status(200).json({
        message: "No match any description",
      });
    }
    res.status(200).json({
      message: "description fetch successfully",
      findDescription,
    });
  } catch (error) {
    console.error("Error while searching description:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const dateWiseSearch = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        message: "Date is required",
      });
    }
    const findAccount = await Account.findOne({
      user_id: req.user._id,
    });

    if (!findAccount) {
      return res.status(404).json({
        message: "Account not found",
      });
    }
    const startDate = new Date(`${date}T00:00:00.000Z`);
    const endDate = new Date(`${date}T23:59:59.999Z`);

    const findDatewise = await Transaction.find({
      account_id: findAccount._id,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    if (findDatewise.length === 0) {
      return res.status(200).json({
        message: "No match any date",
      });
    }
    res.status(200).json({
      message: "date fetch successfully",
      findDatewise,
    });
  } catch (error) {
    console.log("Error while searching date");
    res.status(500).json({ message: "Internal server error" });
  }
};
export {
  depositApi,
  withdrawalApi,
  passbookApi,
  transacationWiseSearch,
  descriptionWiseSearch,
  dateWiseSearch,
};
