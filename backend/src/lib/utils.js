import jwt from "jsonwebtoken";

// Configure cookie options based on NODE_ENV for cross-domain production support
export const getCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === "production";
  return {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    sameSite: isProduction ? "none" : "strict", // "none" allows cross-domain cookies in production over HTTPS
    secure: isProduction,
  };
};

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

  res.cookie("jwt", token, getCookieOptions());

  return token;
};
