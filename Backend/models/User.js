const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "recruiter", "admin"],
      default: "student",
    },

    // Profile information
    phone: { type: String, default: "" },
    college: { type: String, default: "" },
    degree: { type: String, default: "" },
    branch: { type: String, default: "" },
    graduationYear: { type: String, default: "" },
    cgpa: { type: String, default: "" },
    skills: { type: String, default: "" },
    projects: { type: String, default: "" },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },
    resume: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
