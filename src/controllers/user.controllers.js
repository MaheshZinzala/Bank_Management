import { User } from "../models/user.model.js";
import { Account } from "../models/account.model.js";
import jwt from "jsonwebtoken";
const generatAccessTokenandRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generatAccessToken();
    const refreshToken = user.generatRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log("Error while generat Access token and Refresh token: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      gender,
      city,
      address,
      account_type,
      transaction_pin,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !gender ||
      !city ||
      !address ||
      !account_type ||
      !transaction_pin
    ) {
      return res.status(401).json({ message: "All field are required" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({ message: "User already register" });
    }

    const createAccountNumber =
      Math.floor(Math.random() * 9000000000) + 1000000000;

    const createUser = await User.create({
      name,
      email,
      password,
      gender,
      city,
      address,
    });

    const finalUser = await User.findById(createUser._id).select(
      " -password -refreshToken ",
    );

    const createAccount = await Account.create({
      user_id: createUser._id,
      account_no: createAccountNumber,
      account_type,
      transaction_pin,
    });

    res.status(201).json({
      message: "User register successfully",
      user: finalUser,
      account: createAccount,
    });
  } catch (error) {
    console.log("Error while register the user: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ message: "All field are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found please register" });
    }

    const correctPassword = user.ispasswordCorrect(password);

    if (!correctPassword) {
      return res.status(401).json({ message: "Email and password not valid" });
    }

    const { accessToken, refreshToken } =
      await generatAccessTokenandRefreshToken(user._id);

    const loggedInuser = await User.findById(user._id).select(
      " -password -refreshToken",
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(201)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "User Login successfully",
        user: loggedInuser,
        accessToken,
        refreshToken,
      });
  } catch (error) {
    console.log("Error while login the user: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logoutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      { new: true },
    );
    const options = {
      httpOnly: true,
      secure: true,
    };
    res
      .status(201)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ message: "User logout succsessfully" });
  } catch (error) {
    console.log("Error while logout the user: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookie.refreshToken || req.body.refreshAccessToken;
    if (!incomingRefreshToken) {
      return res.status(401).json({ message: "Unauthorizes Request" });
    }
    try {
      const decordToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET,
      );

      const user = await User.findById(decordToken._id);
      if (!user) {
        return res.status(401).json({ message: "Invalid Refresh Token " });
      }

      if (incomingRefreshToken !== user.refreshToken) {
        return res
          .status(401)
          .json({ message: "Refersh Token is Expired or Used " });
      }
      const options = {
        httpOnly: true,
        secure: true,
      };
      const { refreshToken, newrefreshToken } =
        await generatAccessTokenandRefreshToken(user._id);

      return res
        .status(2000)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newrefreshToken, options)
        .json({ message: "Access Token Refreshed" });
    } catch (error) {
      res.status(401).json({ message: "Invalid Refresh Token " });
    }
  } catch (error) {
    console.log("Error while refreshAccessToken the user: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    if (!password || !newPassword) {
      return res.status(401).json({ message: "All field are required" });
    }
    const user = await User.findById(req.user._id);

    const correctPassword = await user.ispasswordCorrect(password);
    if (!correctPassword) {
      return res.status(401).json({ message: "Your old password is wrong" });
    }
    user.password = newPassword;

    await user.save({ validateBeforeSave: false });
    res.status(201).json({
      message: "Password change successfully",
    });
  } catch (error) {
    console.log("Error while changing the password: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const changeTrasactionPin = async (req, res) => {
  try {
    const { transaction_pin, newTransaction_pin } = req.body;
    // console.log(transaction_pin);
    // console.log(newTransaction_pin);
    if (!transaction_pin || !newTransaction_pin) {
      return res.status(401).json({ message: "All field are required" });
    }
    const user = await User.findById(req.user._id);
    const findAccount = await Account.findOne({ user_id: user._id });

    // console.log(findAccount);
    if (!findAccount) {
      return res.status(401).json({ message: "Your Account is not Found" });
    }

    // console.log(findAccount.transaction_pin);
    if (findAccount.transaction_pin !== transaction_pin) {
      return res
        .status(401)
        .json({ message: "Your old transaction pin is wrong" });
    }

    findAccount.transaction_pin = newTransaction_pin;

    await findAccount.save({ validateBeforeSave: false });

    res.status(201).json({
      message: "Transaction pin change successfully",
    });
  } catch (error) {
    console.log("Error while changing the password: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const showBalance = async (req, res) => {
  try {
    const { transaction_pin } = req.body;
    if (!transaction_pin) {
      return res.status(401).json({
        message: "Transaction pin is required",
      });
    }
    const findAccount = await Account.findOne({ user_id: req.user._id });
    if (!findAccount) {
      return res.status(401).json({
        message: "Your Account not found",
      });
    }
    if (findAccount.transaction_pin !== transaction_pin) {
      return res.status(401).json({
        message: "Transaction pin is wrong",
      });
    }
    const balance = findAccount.balance;

    res.status(201).json({
      message: "Balance fetchs successfully",
      balance,
    });
  } catch (error) {
    console.log("Error while show balance ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changePassword,
  changeTrasactionPin,
  showBalance,
};
