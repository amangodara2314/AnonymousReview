import nodemailer from "nodemailer";
import { connectToDatabase } from "./database";
import User from "@/models/user.model";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendOtp(email) {
  const otp = generateOTP();

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    logger: true,
    debug: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ReviewEcho - Verify Your Email</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #ffffff;
            background-color: #000000;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            padding: 20px 0;
            background-color: #18181b;
            color: #ffffff; /* Make header text white for better contrast */
        }
        .content {
            background-color: #27272a;
            padding: 40px 20px;
            border-radius: 8px;
            margin-top: 20px;
        }
        h2 {
            color: #e2e8f0; /* Lighten heading color for contrast */
        }
        p {
            color: #e5e5e5; /* Lighten paragraph text for readability */
        }
        .otp {
            font-size: 36px;
            font-weight: bold;
            text-align: center;
            letter-spacing: 8px;
            margin: 30px 0;
            color: #3b82f6; /* Keep the OTP color prominent */
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #3b82f6;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #9ca3af; /* Adjust footer text color for better contrast */
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>AnonymousInsight</h1> <!-- Updated company name -->
        </div>
        <div class="content">
            <h2>Verify Your Email</h2>
            <p>Thank you for signing up with AnonymousInsight. To complete your registration, please use the following One-Time Password (OTP) to verify your email address:</p>
            <div class="otp">${otp}</div> <!-- OTP kept prominent -->
            <p>This OTP will expire in 5 minutes. If you didn't request this verification, please ignore this email.</p>

        </div>
        <div class="footer">
            <p>&copy; 2023 AnonymousInsight. All rights reserved.</p>
            <p>If you have any questions, please contact our support team at support@anonymousinsight.com</p>
        </div>
    </div>
</body>
</html>
`,
  };

  try {
    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "OTP sent successfully!",
      otp,
    };
  } catch (error) {
    return { success: false, message: "Failed to send OTP." };
  }
}

export const resendOtp = async (email) => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ email: email });
  } catch (error) {}
};
