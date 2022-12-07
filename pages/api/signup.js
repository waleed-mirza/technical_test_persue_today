import dbConnect from "../../lib/dbConnect";
import User from "../../models/user.model";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;
  let { name, email, password } = req.body;

  if (method === "POST") {
    try {
      //   Checking if the user already exists
      const alreadyExists = await User.findOne({
        email,
      });
      if (alreadyExists) {
        return res
          .status(200)
          .json({ success: false, message: "User exists already" });
      }

      //Hashing the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      password = hashedPassword;

      const user = await User.create({
        name,
        email,
        password,
      });
      res.status(201).json({
        success: true,
        data: user,
        message: "User created successfully",
      });
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    res.status(400).json(error);
  }
}
