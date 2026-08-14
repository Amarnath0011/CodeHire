const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadResume");
const { protect } = require("../middleware/authMiddleware");

const {
  applyJob,
  getApplicants,
  getRecruiterApplications,
  updateStatus,
  getStudentApplications,
} = require("../controllers/applicationController");

router.post("/", upload.single("resume"), applyJob);

// Specific routes must come before /:jobId.
router.get("/student/:studentId", getStudentApplications);
router.get("/recruiter", protect, getRecruiterApplications);
router.get("/:jobId", getApplicants);
router.put("/:id", updateStatus);

module.exports = router;
