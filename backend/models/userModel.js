const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// User schema definition
const userSchema = new mongoose.Schema(
  {
    username: { 
      type: String, 
      required: true, 
      unique: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    role: { 
      type: String, 
      required: true, 
      enum: ["student", "instructor", "admin"] 
    },
    profilePic: { 
      type: String, 
      default: "https://example.com/defaultProfilePic.jpg" 
    },
    gender: { 
      type: String, 
      enum: ["male", "female", "non-binary", "other"], 
      default: "male" 
    },
    notifications: [
      {
        message: { type: String },
        date: { type: Date, default: Date.now },
        isRead: { type: Boolean, default: false },
      },
    ],
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    discriminatorKey: "role", // Explicit discriminator key for different user types
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Ensure indexes for unique fields
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true });

// Create the User model
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
