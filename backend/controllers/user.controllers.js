import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import sendMail from "../mail/sendMail.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
const { ACCESS_TOKEN_SECRET, GOOGLE_API_TOKEN } = process.env;

import { HTTP_STATUS, MESSAGES, ERROR_MESSAGES } from "../utils/const.js";
import contactSendMail from "../mail/contactUsMailSender.js";

const client = new OAuth2Client(GOOGLE_API_TOKEN);

const createAccountController = async(req, res) => {
    const { fullName, email, password } = req.body; // Fix: destructuring missing variables

    // Check if user already exists
    const isUser = await User.findOne({ email });
    if (isUser) {
        return res.json({
            error: true,
            message: ERROR_MESSAGES.USER_ALREADY_EXISTS,
        });
    }

    let hashedPass;
    try {
        hashedPass = await bcrypt.hash(password, 10);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            error: true,
            message: "Internal error",
        });
    }

    // Create and save new user
    const user = new User({ fullName, email, password: hashedPass });
    await user.save();
    const expiresIn = 60 * 20; // token expiry time
    const token = jwt.sign({ sub: user._id, expiresIn }, ACCESS_TOKEN_SECRET);
    const url = `http://localhost:${process.env.PORT}/verify/${token}`;
    const html = `<a href="${url}">Click here to verify your account</a>`;
    sendMail(email, html); // send verification email

    // Generate access token for the new user
    const accessToken = jwt.sign({ user }, ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m",
    });

    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registration Successful",
    });
};

const verifyAccountController = async(req, res) => {
    const { token } = req.params;
    if (!token) {
        return res
            .status(HTTP_STATUS.BAD_REQUEST)
            .json({ error: true, message: ERROR_MESSAGES.INVALID_TOKEN });
    }

    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        const { sub: userId } = decoded;

        const user = await User.findById(userId);
        if (!user) {
            return res
                .status(HTTP_STATUS.NOT_FOUND)
                .json({ error: true, message: ERROR_MESSAGES.USER_NOT_FOUND });
        }

        // user.isEmailVerified = true;
        // await user.save();
        // if (!userInfo.isEmailVerified) {
        //   return res
        //     .status(HTTP_STATUS.BAD_REQUEST)
        //     .json({ message: ERROR_MESSAGES.EMAIL_NOT_VERIFIED });
        // }
        // user.isEmailVerified = true;
        // await user.save();

        // if (!userInfo.isEmailVerified) {
        //   return res
        //     .status(HTTP_STATUS.BAD_REQUEST)
        //     .json({ message: ERROR_MESSAGES.EMAIL_NOT_VERIFIED });
        // }

        return res.json({
            error: false,
            message: MESSAGES.EMAIL_VERIFIED_SUCCESSFULLY,
        });
    } catch (error) {
        console.error("Error verifying email: ", error);
        return res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json({ error: true, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

const loginAccountController = async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(HTTP_STATUS.BAD_REQUEST)
            .json({ message: ERROR_MESSAGES.EMAIL_PASSWORD_REQUIRED });
    }

    const userInfo = await User.findOne({ email });

    if (!userInfo || !(await bcrypt.compare(password, userInfo.password))) {
        return res
            .status(HTTP_STATUS.BAD_REQUEST)
            .json({ message: ERROR_MESSAGES.INVALID_CREDENTIALS });
    }

    // if (!userInfo.isEmailVerified) {
    //     return res
    //         .status(HTTP_STATUS.BAD_REQUEST)
    //         // .json({ message: ERROR_MESSAGES.EMAIL_NOT_VERIFIED });
    // }

    const accessToken = jwt.sign({ user: userInfo }, ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m",
    });

    return res.json({
        error: false,
        message: "Login Successful",
        user: userInfo,
        accessToken,
    });
};

const getCurrentAccountController = async(req, res) => {
    try {
        const { user } = req.user;
        if (!user) return res.sendStatus(HTTP_STATUS.UNAUTHORIZED);

        const isUser = await User.findOne({ _id: user._id });
        return res.json({
            user: {
                fullName: isUser.fullName,
                email: isUser.email,
                _id: isUser._id,
                createdOn: isUser.createdOn,
            },
            message: "",
        });
    } catch (error) {
        console.error("Error fetching user: ", error);
        return res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json({ error: true, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

const deleteUserController = async(req, res) => {
    try {
        const {
            user: { _id: userId },
        } = req.user;
        if (!userId) {
            return res.status(400).json({ error: true, message: "User Id required" });
        }

        const deleteNotesResult = await Note.deleteMany({ userId });
        const deleteUserResult = await User.findByIdAndDelete(userId);

        if (!deleteUserResult) {
            return res.status(404).json({ error: true, message: "User not found" });
        }
        return res.json({ error: false, message: "User deleted successfully" });
    } catch (error) {
        console.log("Error while deleting user", { error });
        return res
            .status(500)
            .json({ error: true, message: "Something went wrong" });
    }
};

const updateFullNameController = async(req, res) => {
    const { user } = req.user;
    const { newFullName } = req.body;

    if (!user) {
        console.error("User not authenticated");
        return res
            .status(HTTP_STATUS.UNAUTHORIZED)
            .json({ error: ERROR_MESSAGES.USER_NOT_AUTHENTICATED });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            user._id, { fullName: newFullName }, { new: true }
        );

        if (!updatedUser) {
            console.error("User not found");
            return res
                .status(HTTP_STATUS.NOT_FOUND)
                .json({ error: ERROR_MESSAGES.USER_NOT_FOUND });
        }

        return res.status(HTTP_STATUS.OK).json({
            message: MESSAGES.FULLNAME_UPDATED_SUCCESSFULLY,
            user: updatedUser,
        });
    } catch (error) {
        console.error("Error updating Name: ", error);
        return res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

const updateEmailController = async(req, res) => {
    const { user } = req.user;
    const { newEmail } = req.body;

    if (!user) {
        console.error("User not authenticated");
        return res
            .status(HTTP_STATUS.UNAUTHORIZED)
            .json({ error: ERROR_MESSAGES.USER_NOT_AUTHENTICATED });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
        return res
            .status(400)
            .json({ error: true, message: "Invalid Email format" });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            user._id, { email: newEmail }, { new: true }
        );

        if (!updatedUser) {
            console.error("User not found");
            return res
                .status(HTTP_STATUS.NOT_FOUND)
                .json({ error: ERROR_MESSAGES.USER_NOT_FOUND });
        }

        return res.status(HTTP_STATUS.OK).json({
            message: MESSAGES.EMAIL_UPDATED_SUCCESSFULLY,
            user: updatedUser,
        });
    } catch (error) {
        console.error("Error updating email: ", error);
        return res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

const updatePhoneController = async(req, res) => {
    const { newPhone } = req.body;
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);
        if (user) {
            user.phone = newPhone;
            await user.save();
            res
                .status(HTTP_STATUS.OK)
                .json({ message: MESSAGES.PHONE_UPDATED_SUCCESSFULLY });
        } else {
            res
                .status(HTTP_STATUS.NOT_FOUND)
                .json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
        }
    } catch (error) {
        res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR, error });
    }
};

const updateProfilePhotoController = async(req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Profile photo is required" });
    }

    try {
        const userId = req.body.userId;
        const profilePhotoPath = `/uploads/${req.file.filename}`;

        await User.findByIdAndUpdate(userId, { profilePhoto: profilePhotoPath });

        res.status(200).json({
            message: "Profile photo updated successfully",
            profilePhoto: `http://localhost:8000${profilePhotoPath}`,
        });
    } catch (error) {
        console.error("Error updating profile photo:", error);
        res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

const googleAuthController = async(req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_API_TOKEN,
        });

        const payload = ticket.getPayload();
        const userid = payload["sub"];
        const email = payload["email"];

        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                fullName: payload["name"],
                email: email,
                password: "", // Handle password logic for OAuth users
            });
            await user.save();
        }

        const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "36000m",
        });

        res.json({
            error: false,
            user,
            accessToken,
            message: MESSAGES.GOOGLE_AUTH_SUCCESSFUL,
        });
    } catch (error) {
        console.error(error);
        res
            .status(HTTP_STATUS.BAD_REQUEST)
            .json({ error: true, message: ERROR_MESSAGES.INVALID_GOOGLE_TOKEN });
    }
};

const feedbackSubmitController = async(req, res) => {
    const { name, email, feedback } = req.body;

    try {
        const newFeedback = new Feedback({
            name,
            email,
            feedback,
        });

        await newFeedback.save();
        res
            .status(HTTP_STATUS.CREATED)
            .json({ message: MESSAGES.FEEDBACK_SUBMITTED_SUCCESSFULLY });
    } catch (error) {
        res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json({ message: ERROR_MESSAGES.FAILED_TO_SUBMIT_FEEDBACK, error });
    }
};

const contactUsMailController = async(req, res) => {
    const { first_name, last_name, user_email, message } = req.body;

    try {
        const html = `<p>${message}</p>`;
        const name = first_name + " " + last_name;
        contactSendMail(user_email, name, html);

        return res.status(200).json({
            error: false,
            message: "Mail sent successfully",
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            error: true,
            message: "Internal error",
        });
    }
};

export {
    createAccountController,
    verifyAccountController,
    loginAccountController,
    getCurrentAccountController,
    deleteUserController,
    updateFullNameController,
    updateEmailController,
    updatePhoneController,
    updateProfilePhotoController, // Corrected name
    googleAuthController,
    feedbackSubmitController,
    contactUsMailController,
};