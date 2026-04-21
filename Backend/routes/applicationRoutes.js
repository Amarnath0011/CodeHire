const express = require("express");
const router = express.Router();

const {
  applyJob,
  getApplicants,
} = require("../controllers/applicationController");

router.post("/", applyJob);

router.get("/:jobId", getApplicants);

module.exports = router;