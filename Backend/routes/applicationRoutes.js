const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadResume");

const {
  applyJob,
  getApplicants,
  updateStatus,
  getStudentApplications,
} = require("../controllers/applicationController");

router.post(
  "/",
  upload.single("resume"),
  applyJob
);

// Keep the specific route before /:jobId.
// Otherwise "student" can be captured as a jobId.
router.get(
  "/student/:studentId",
  getStudentApplications
);

router.get("/:jobId", getApplicants);
router.put("/:id", updateStatus);

module.exports = router;
