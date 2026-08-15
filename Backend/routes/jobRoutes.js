const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  createJob,
  getJobs,
  getRecruiterJobs,
  deleteJob,
} = require("../controllers/jobController");

router.post("/", protect, createJob);
router.get("/", getJobs);
router.get("/recruiter", protect, getRecruiterJobs);
router.delete("/:id", protect, deleteJob);

module.exports = router;
