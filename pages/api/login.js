import dbConnect from "../../lib/dbConnect";
import User from "../../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;
  let { email, password } = req.body;

  if (method === "POST") {
    try {
      //   Checking if the user already exists
      const userData = await User.findOne({
        email,
      });
      if (!userData) {
        return res
          .status(200)
          .json({ success: false, message: "User does not exists" });
      }

      //   comparing the password
      const validPassword = await bcrypt.compare(password, userData.password);
      if (!validPassword) {
        return res
          .status(200)
          .json({ success: false, message: "Invalid password" });
      }

      // Creating a token
      const token = jwt.sign(
        {
          id: userData._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      userData.password = "Not so Fast!";

      res.status(200).json({
        success: true,
        data: userData,
        token,
        message: "Logged In successfully",
      });
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    res.status(400).json(error);
  }
}
