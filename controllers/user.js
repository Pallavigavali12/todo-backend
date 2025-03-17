import usermodel from "../models/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretkey = "674r8fhefrnjgktkn";
export const signup = async (req, res) => {
  try {
    const { username, password, name } = req.body;
    console.log(username, password, name);
    const salts = bcrypt.genSaltSync(6);
    const hashedpass = bcrypt.hashSync(password, salts);
    console.log(hashedpass);
    const existinguser = await usermodel.find({ username: username });
    console.log(existinguser);
    if (existinguser.length == 1) {
      res.status(404).json({ message: "user already exist! please login" });
    } else {
      const user = await usermodel.create({
        username,
        password: hashedpass,
        name,
      });
      if (!user) {
        res.status(404).json({ message: "user not added" });
      }
      res.status(201).json({ message: "user added succesfully" });
    }
  } catch (err) {
    console.log(err);
  }
};

export const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await usermodel.find({ username: username });
    if (user.length === 1) {
      console.log("password", password);
      console.log(user);
      const matchedpass = await bcrypt.compare(password, user[0].password);

      if (matchedpass) {
        const userdata = await usermodel.find(
          { username: username },
          { password: 0 }
        );
        const token = jwt.sign(
          {
            user: userdata,
          },
          secretkey,
          { expiresIn: "24h" }
        );
        res.status(201).json({
          message: "login succesfull!",
          data: token,
          details: { name: userdata[0].name, username: userdata[0].username },
        });
      } else {
        res.status(404).json({ message: "Invalid password" });
      }
    } else {
      res.status(404).json({ message: "Invalid username" });
    }
  } catch (err) {
    console.log(err);
  }
};
