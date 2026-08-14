const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadResume");
const { protect } = require("../middleware/authMiddleware");

const {
  applyJob,
  getApplicants,
  updateStatus,
  getStudentApplications,
  getRecruiterApplications,
} = require("../controllers/applicationController");

router.post("/", protect, upload.single("resume"), applyJob);
router.get("/student/:studentId", protect, getStudentApplications);
router.get("/recruiter", protect, getRecruiterApplications);
router.get("/:jobId", protect, getApplicants);
router.put("/:id", protect, updateStatus);

module.exports = router;
