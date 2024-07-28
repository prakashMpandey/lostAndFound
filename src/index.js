import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";


dotenv.config();

async function startServer() {
  try {
    await connectDB();
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port", process.env.PORT);
    });

  } catch (err) {
    console.log("MongoDB connection failed", err);
  }
}

startServer();