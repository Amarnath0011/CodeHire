const Application = require("../models/Application");

exports.applyJob = async (req, res) => {
  try {
    const {
      job,
      student,
      fullName,
      email,
      phone,
      college,
      degree,
      branch,
      graduationYear,
      cgpa,
      skills,
      projects,
      reason,
      resume,
    } = req.body;

    // prevent duplicate apply
    const exists =
      await Application.findOne({
        job,
        student,
      });

    if (exists) {
      return res.status(400).json({
        message:
          "Already Applied",
      });
    }

    const application =
      await Application.create({
        job,
        student,
        fullName,
        email,
        phone,
        college,
        degree,
        branch,
        graduationYear,
        cgpa,
        skills,
        projects,
        reason,
        resume,
      });

    res.status(201).json({
      message:
        "Applied Successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

exports.getApplicants =
  async (req, res) => {
    try {
      const data =
        await Application.find({
          job: req.params.jobId,
        }).populate(
          "student"
        );

      res.json(data);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };