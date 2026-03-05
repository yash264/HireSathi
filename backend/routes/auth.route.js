import express from "express";

import { register, login, verifyToken, updateUser, fetchUser } from "../controller/JobSeeker.controller.js";
import authenticateUser from "../middleware/auth.middleware.js";

const JobSeeker = express.Router();


JobSeeker.post("/register", register);
JobSeeker.post("/login", login);
JobSeeker.get("/verifyToken", authenticateUser, verifyToken);
JobSeeker.get("/fetchUser", authenticateUser, fetchUser);
JobSeeker.put("/updateUser", authenticateUser, updateUser);


export default JobSeeker;