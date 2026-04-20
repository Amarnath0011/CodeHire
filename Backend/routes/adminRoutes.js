const express = require("express");
const router = express.Router();

const {
  getStats,
  getUsers,
  getJobs,
  deleteJob,
} = require("../controllers/adminController");

router.get("/stats", getStats);
router.get("/users", getUsers);
router.get("/jobs", getJobs);
router.delete("/jobs/:id", deleteJob);

module.exports = router;