const express = require("express");
const router = express.Router();

const { createJob, getJobs, getRecruiterJobs, deleteJob } = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

router.get("/recruiter", protect, getRecruiterJobs);
router.post("/", protect, createJob);
router.get("/", getJobs);
router.delete("/:id", protect, deleteJob);

module.exports = router;
