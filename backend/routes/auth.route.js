import express from "express";

import { register, login, verifyToken, updateUser, fetchUser } from "../controller/JobSeeker.controller.js";
import authenticateUser from "../middleware/auth.middleware.js";

const Users = express.Router();


Users.post("/register", register);
Users.post("/login", login);
Users.get("/verifyToken", authenticateUser, verifyToken);
Users.get("/fetchUser", authenticateUser, fetchUser);
Users.put("/updateUser", authenticateUser, updateUser);


export default Users;