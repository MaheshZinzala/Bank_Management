import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized request" });
    }

    const decorderToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decorderToken?._id).select(
      " -password -refreshToken",
    );
    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error while auth calling: ", error);
    res.status(500).json({ message: "Internal server error...." });
  }
};
