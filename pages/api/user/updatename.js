import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  if (method === "POST") {
    try {
      const { newname, userid } = req.body;
      const userData = await User.findOneAndUpdate(
        { _id: userid },
        { name: newname },
        {
          new: true,
        }
      );
      res.status(200).json({ success: true, result: userData });
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    res.status(400).json(error);
  }
}
