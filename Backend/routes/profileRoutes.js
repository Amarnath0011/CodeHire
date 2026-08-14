const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadResume");
const { protect } = require("../middleware/authMiddleware");
const {
  getProfile,
  updateProfile,
  uploadResume,
} = require("../controllers/profileController");

router.get("/", protect, getProfile);
router.put("/", protect, updateProfile);
router.post("/resume", protect, upload.single("resume"), uploadResume);

module.exports = router;
