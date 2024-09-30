import nodemailer from "nodemailer";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendOtp(email) {
  const otp = generateOTP();

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`,
    html: `<p>Your OTP is <strong>${otp}</strong></p>`,
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
