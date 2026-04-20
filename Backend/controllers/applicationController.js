const Application = require("../models/Application");

exports.applyJob = async (req, res) => {
  try {
    const { job, student } = req.body;

    const exists = await Application.findOne({
      job,
      student,
    });

    if (exists) {
      return res
        .status(400)
        .json({ message: "Already Applied" });
    }

    const application = await Application.create({
      job,
      student,
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getApplicants = async (req, res) => {
  try {
    const data = await Application.find({
      job: req.params.jobId,
    }).populate("student");

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};