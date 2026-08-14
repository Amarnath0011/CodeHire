const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  createJob,
  getJobs,
  getRecruiterJobs,
  deleteJob,
} = require("../controllers/jobController");

router.post("/", createJob);
router.get("/", getJobs);
router.get("/recruiter", protect, getRecruiterJobs);
router.delete("/:id", deleteJob);

module.exports = router;
