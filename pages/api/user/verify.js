import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    try {
      const token = req.headers["x-access-token"];
      if (!token) {
        return res
          .status(200)
          .json({ success: false, message: "No token provided" });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userData = await User.findById(decoded.id);
      if (!userData) {
        return res
          .status(200)
          .json({ success: false, message: "User does not exists" });
      }

      userData.password = "Not so Fast!";
      res.status(200).json({ success: true, result: userData });
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    res.status(400).json(error);
  }
}
