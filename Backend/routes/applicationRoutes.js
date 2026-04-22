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

router.get("/:jobId", getApplicants);
router.put("/:id", updateStatus);
router.get("/student/:studentId",getStudentApplications);

module.exports = router;