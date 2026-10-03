import jwt from "jsonwebtoken";

export const getCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === "production";
  return {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: isProduction ? "none" : "strict",
    secure: isProduction,
  };
};

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.cookie("jwt", token, getCookieOptions());
  return token;
};
