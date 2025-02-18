const express = require("express");
const axios = require("axios");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON request body

const CLOUDFLARE_SECRET_KEY = process.env.CLOUDFLARE_SECRET_KEY;

// Email sending endpoint with CAPTCHA validation
app.post("/api/send-email", async (req, res) => {
  const { name, email, phone, service, captchaToken } = req.body;

  if (!email || !name || !phone || !service || !captchaToken) {
    return res.status(400).json({ message: "All fields and CAPTCHA are required!" });
  }

  try {
    // ✅ Verify Turnstile CAPTCHA with Cloudflare
    const captchaResponse = await axios.post(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      new URLSearchParams({
        secret: CLOUDFLARE_SECRET_KEY,
        response: captchaToken,
      }).toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    if (!captchaResponse.data.success) {
      return res.status(400).json({ message: "CAPTCHA verification failed!" });
    }

    console.log("CAPTCHA Verification Success:", captchaResponse.data);

    // ✅ Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Email details
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL, 
      subject: "New Appointment Request",
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}`,
    };

    // ✅ Send email
    await transporter.sendMail(mailOptions);
    res.json({ message: "Email sent successfully!" });

  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to send email." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
