const User = require("../models/User");

exports.getProfile = async (req, res) => {
  res.json(req.user);
};

exports.updateProfile = async (req, res) => {
  try {
    const allowed = [
      "name",
      "phone",
      "college",
      "degree",
      "branch",
      "graduationYear",
      "cgpa",
      "skills",
      "projects",
      "bio",
      "location",
    ];

    const updates = {};
    for (const field of allowed) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a PDF resume" });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { resume: req.file.filename },
      { new: true }
    ).select("-password");

    res.json({
      message: "Resume uploaded successfully",
      resume: req.file.filename,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
