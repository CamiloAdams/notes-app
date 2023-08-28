import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";

/**
 * Used to register a new user in database
 * @param {*} req
 * @param {*} res
 * @returns res.json with the authorization token
 */

export const register = async (req, res) => {
  //Get the parameters stored in req.body
  const { username, email, password } = req.body;
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
  //check if username or email already exists
  const userFound = await User.findOne({ username });
  const emailFound = await User.findOne({ email });

  if (userFound) {
    return res.status(400).json({ message: "User already in use" });
  }

  if (emailFound) {
    return res.status(400).json({ message: "Email already in use" });
  }

  if (!regex.test(password)) {
    return res.status(400).json({
      message:
        "The password must contain at least one lowercase letter, one uppercase letter, one number, one special character and have a minimum length of 8.",
    });
  }

  // Create a new user
  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
  });

  // if (roles) {
  //     const foundRoles = await Role.find({ name: { $in: roles } });
  //     newUser.roles = foundRoles.map((role) => role._id);
  // } else {
  // Assign the user role to the new user
  const role = await Role.findOne({ name: "user" });
  newUser.roles = [role._id];

  const savedUser = await (
    await newUser.save()
  ).populate("roles", {
    _id: 0,
  });
  const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
    expiresIn: 86400,
  });
  const roles = [];

  savedUser.roles.forEach((role) => {
    roles.push(role.name);
  });

  res.json({ token, roles: roles });
};

export const login = async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email }).populate(
    "roles",
    { _id: 0 },
  );

  if (!userFound) return res.status(400).json({ message: "User not found" });

  const matchPassword = await User.comparePassword(
    req.body.password,
    userFound.password,
  );

  if (!matchPassword) {
    return res
      .status(401)
      .json({ token: null, message: "Wrong credentials" });
  }

  const token = jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400,
  });

  const roles = [];

  userFound.roles.forEach((role) => {
    roles.push(role.name);
  });

  res.json({ token, roles: roles });
};
