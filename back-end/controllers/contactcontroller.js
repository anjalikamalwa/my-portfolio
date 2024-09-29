import asyncHandler from "express-async-handler";
import { Contact } from "../models/contactModel.js";

// @desc  Send a message
// @route POST /api/message
// @access public
export const sentMessage = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !phone || !subject || !message) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    subject,
    message,
  });

  res.json({
    message: "Message sent successfully",
    contact,
  });
});
