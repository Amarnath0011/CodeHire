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
    } = req.body;

    // Duplicate check
    const exists =
      await Application.findOne({
        job,
        student,
      });

    if (exists) {
      return res.status(400).json({
        message: "Already Applied",
      });
    }

    // Resume filename from multer
    const resume = req.file
      ? req.file.filename
      : "";

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
        }).populate("student");

      res.json(data);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

  exports.updateStatus = async (req, res) => {
    try {
      const application =
        await Application.findById(
          req.params.id
        );
  
      if (!application) {
        return res.status(404).json({
          message:
            "Application not found",
        });
      }
  
      // lock final decisions
      if (
        application.status ===
          "accepted" ||
        application.status ===
          "rejected"
      ) {
        return res.status(400).json({
          message:
            "Decision already final",
        });
      }
  
      application.status =
        req.body.status;
  
      await application.save();
  
      res.json(application);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };
  exports.getStudentApplications =
  async (req, res) => {
    try {
      const data =
        await Application.find({
          student:
            req.params.studentId,
        }).populate("job");

      res.json(data);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };