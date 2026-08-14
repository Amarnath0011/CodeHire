const Job = require("../models/Job");

const normalize = (value = "") => value.trim().replace(/\s+/g, " ").toLowerCase();

exports.createJob = async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Only recruiters can post jobs" });
    }

    const { title, company, location, salary, description } = req.body;

    if (!title || !company || !location || !salary || !description) {
      return res.status(400).json({ message: "All job fields are required" });
    }

    // Prevent the same recruiter from accidentally posting the same opening repeatedly.
    const existingJob = await Job.findOne({
      postedBy: req.user._id,
      title: { $regex: `^${normalize(title).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, $options: "i" },
      company: { $regex: `^${normalize(company).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, $options: "i" },
      location: { $regex: `^${normalize(location).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, $options: "i" },
    });

    if (existingJob) {
      return res.status(409).json({
        message: "You have already posted this job. Please edit the existing job instead of posting it again.",
      });
    }

    const job = await Job.create({
      title: title.trim(),
      company: company.trim(),
      location: location.trim(),
      salary: salary.trim(),
      description: description.trim(),
      postedBy: req.user._id,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Only recruiters can delete jobs" });
    }

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (String(job.postedBy) !== String(req.user._id)) {
      return res.status(403).json({ message: "You can only delete your own jobs" });
    }

    await job.deleteOne();
    res.json({ message: "Job deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};
