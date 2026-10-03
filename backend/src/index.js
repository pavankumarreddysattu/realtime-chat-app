import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import { server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log("Server is running on PORT: " + PORT);
  connectDB();
});