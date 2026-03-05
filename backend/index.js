import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

import connectDB from "./connection.js";
import Users from "./routes/auth.route.js";

const PORT = process.env.PORT
dotenv.config();
const app = express();
connectDB();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });


app.use(express.json());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// APIs to call
app.use("/api", Users)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});