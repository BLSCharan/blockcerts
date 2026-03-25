const nodemailer = require("nodemailer");

// Create transporter using Gmail SMTP (you can change this to any email service)
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || "smtp.gmail.com",
  port: process.env.MAIL_PORT || 587,
  secure: process.env.MAIL_SECURE === "true" || false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

// Send password reset email
const sendPasswordResetEmail = async (userData) => {
  try {
    const { email, organizationName, resetUrl } = userData;

    const mailOptions = {
      from: process.env.MAIL_FROM || process.env.MAIL_USER,
      to: email,
      subject: "Password Reset Request - BlockCert",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; color: white; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">BlockCert</h1>
            <p style="margin: 5px 0 0 0; font-size: 14px;">Password Reset Request</p>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <p style="color: #333; font-size: 16px;">Hello <strong>${organizationName}</strong>,</p>
            
            <p style="color: #666; line-height: 1.6; margin: 15px 0;">
              We received a request to reset your password. Click the button below to set a new password. This link will expire in 30 minutes.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
                Reset Password
              </a>
            </div>
            
            <p style="color: #999; font-size: 13px; line-height: 1.6; margin: 20px 0 0 0;">
              Or copy this link in your browser:<br/>
              <span style="color: #667eea; word-break: break-all;">${resetUrl}</span>
            </p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;">
            
            <p style="color: #999; font-size: 12px; line-height: 1.6;">
              If you didn't request a password reset, please ignore this email. Your password will not be changed.
            </p>
            
            <p style="color: #999; font-size: 12px; margin: 15px 0 0 0;">
              &copy; 2026 BlockCert. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: "Password reset email sent successfully" };
  } catch (error) {
    console.error("Mail sending error:", error);
    throw new Error("Failed to send password reset email. Please try again later.");
  }
};

module.exports = { sendPasswordResetEmail };
