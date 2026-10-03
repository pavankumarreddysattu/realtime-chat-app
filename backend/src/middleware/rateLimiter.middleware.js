import rateLimit from "express-rate-limit";

// Strict rate limiter for auth routes (signup and login)
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many authentication attempts from this IP. Please try again after 15 minutes.",
  },
});

// General rate limiter for message routes
export const messageRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // Limit each IP to 60 requests per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many message requests. Please slow down.",
  },
});
