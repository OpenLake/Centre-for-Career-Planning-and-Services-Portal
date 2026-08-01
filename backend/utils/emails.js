import dotenv from "dotenv";
dotenv.config();
import sendBrevoEmail from "../config/nodemailer.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "../assets/emailTemplates.js";

const sendVerificationEmail = async (email, verificationToken) => {
    try {
        await sendBrevoEmail({
            to: email,
            subject: "Verify Your Email",
            htmlContent: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
        });
        console.log("Verification email sent successfully");
    } catch (error) {
        console.error("Error sending verification email:", error.message);
    }
}

const sendPasswordResetEmail = async (email, resetURL) => {
    try {
        await sendBrevoEmail({
            to: email,
            subject: "Reset your password",
            htmlContent: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
        });
        console.log("Password reset email sent successfully");
    } catch (error) {
        console.error("Error sending password reset email:", error.message);
    }
}

const sendPasswordResetSuccessEmail = async (email) => {
    try {
        await sendBrevoEmail({
            to: email,
            subject: "Password Reset Successful",
            htmlContent: PASSWORD_RESET_SUCCESS_TEMPLATE,
        });
        console.log("Password reset success email sent successfully");
    } catch (error) {
        console.error("Error sending password reset success email:", error.message);
    }
}

const sendEmail = async ({ to, subject, html }) => {
    try {
        await sendBrevoEmail({ to, subject, htmlContent: html });
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error.message);
    }
}

export { sendVerificationEmail, sendPasswordResetEmail, sendPasswordResetSuccessEmail, sendEmail };
