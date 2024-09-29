import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the Contact name"], 
    },
    email: {
      type: String,
      required: [true, "Please add the contact email address"], 
    },
    phone: {
      type: String,
      required: [true, "Please add the contact phone number"], 
    },
    subject: {
      type: String,
      required: [true, "Please add your subject"], 
    },
    message: {
      type: String,
      required: [true, "Please write your message"], 
    },
  },
  {
    timestamps: true, 
  }
);

export const Contact = mongoose.model("Contact", contactSchema);
