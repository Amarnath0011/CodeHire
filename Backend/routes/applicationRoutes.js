const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadResume");

const {
  applyJob,
  getApplicants,
} = require("../controllers/applicationController");

router.post(
  "/",
  upload.single("resume"),
  applyJob
);

router.get("/:jobId", getApplicants);

module.exports = router;