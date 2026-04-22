const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    fullName: String,
    email: String,
    phone: String,

    college: String,
    degree: String,
    branch: String,
    graduationYear: String,
    cgpa: String,

    skills: String,
    projects: String,
    reason: String,

    resume: String,

    status: {
      type: String,
      enum: [
        "pending",
        "review",
        "accepted",
        "rejected",
      ],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Application",
  applicationSchema
);