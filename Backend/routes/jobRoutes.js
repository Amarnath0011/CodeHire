const express = require("express");
const router = express.Router();

const {
  createJob,
  getJobs,
  deleteJob,
} = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createJob);
router.get("/", getJobs);
router.delete("/:id", protect, deleteJob);

module.exports = router;
