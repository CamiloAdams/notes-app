// import jwt from "jsonwebtoken";
import config from "../config";

export const getCookie = async (req, res) => {
  console.log(req.cookies);
  res.send(req.cookies);
};

export const setCookie = async (req, res) => {
  res.cookie(`name`, `encrypted cookie string Value`, {
    httpOnly: true,
    sameSite: "lax",
  });
  res.send("Cookie have been saved successfully");
};

export const deleteCookie = async (req, res) => {
  res.clearCookie();
  res.send("Cookie has been deleted successfully");
};