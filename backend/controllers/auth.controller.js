import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";

import UserData from "../models/auth.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });


// REGISTER
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body.payload;

        const ifExists = await UserData.findOne({ email: email });

        if (ifExists) {
            return res.status(201).json({
                success: false,
                message: "Email Already Exists"
            });
        }

        const registerPerson = new JobSeekerData({
            name,
            email,
            password
        });

        await registerPerson.save();

        res.status(201).json({
            success: true,
            message: "Registered Successfully."
        });

    } catch (error) {
        console.log(error);
    }
};


// LOGIN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body.payload;

        const ifExists = await UserData.findOne({ email: email });

        if (!ifExists) {
            return res.json({
                success: false,
                message: "Please Register"
            });
        }

        if (ifExists.password === password) {

            const token = jwt.sign(
                {
                    id: ifExists._id,
                    email: ifExists.email
                },
                process.env.jwt_secret,
                { expiresIn: "30d" }
            );

            res.json({
                success: true,
                message: token
            });

        } else {
            res.json({
                success: false,
                message: "Incorrect Password"
            });
        }

    } catch (error) {
        console.log(error);
    }
};


// VERIFY TOKEN
export const verifyToken = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ valid: false, data: null });
    }

    jwt.verify(token, process.env.jwt_secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ valid: false, data: null });
        }

        return res.json({
            valid: true,
            message: "verfied successfully"
        });
    });
};


// FETCH USER
export const fetchUser = async (req, res) => {
    try {
        const fetchUserData = await UserData
            .findOne({ _id: req.user.id })
            .select("-password");

        res.status(201).json({
            success: true,
            message: fetchUserData,
        });

    } catch (error) {
        console.log(error);
    }
};


// UPDATE USER
export const updateUser = async (req, res) => {
    try {
        const updatedUser = await UserData.updateMany(
            { _id: req.user.id },
            {
                name: req.body.name,
                gender: req.body.gender,
                mobile: req.body.mobile,
                qualification: req.body.qualification,
                homeTown: req.body.homeTown,
            }
        );

        res.status(201).json({
            success: true,
            message: "profile updated",
        });

    } catch (error) {
        console.log(error);
    }
};