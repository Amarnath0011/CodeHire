const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");

exports.getStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const jobs = await Job.countDocuments();
    const applications =
      await Application.countDocuments();

    res.json({
      users,
      jobs,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getUsers = async (req, res) => {
  const users = await User.find().select(
    "-password"
  );

  res.json(users);
};

exports.getJobs = async (req, res) => {
  const jobs = await Job.find();

  res.json(jobs);
};

exports.deleteJob = async (req, res) => {
  await Job.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message: "Job Deleted",
  });
};