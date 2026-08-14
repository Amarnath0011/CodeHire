const Application = require("../models/Application");
const Job = require("../models/Job");

exports.applyJob = async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can apply for jobs" });
    }

    const { job, fullName, email, phone, college, degree, branch, graduationYear, cgpa, skills, projects, reason } = req.body;

    const jobExists = await Job.findById(job);
    if (!jobExists) return res.status(404).json({ message: "Job not found" });

    const exists = await Application.findOne({ job, student: req.user._id });
    if (exists) return res.status(409).json({ message: "You have already applied for this job" });

    const resume = req.file ? req.file.filename : "";

    const application = await Application.create({
      job,
      student: req.user._id,
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

    res.status(201).json({ message: "Applied Successfully", application });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getApplicants = async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Only recruiters can view applicants" });
    }

    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (String(job.postedBy) !== String(req.user._id)) {
      return res.status(403).json({ message: "You can only view applicants for your own jobs" });
    }

    const data = await Application.find({ job: job._id })
      .populate("student", "name email phone college degree branch graduationYear cgpa skills projects bio resume")
      .populate("job", "title company location salary")
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Only recruiters can update application status" });
    }

    const application = await Application.findById(req.params.id).populate("job");
    if (!application) return res.status(404).json({ message: "Application not found" });

    if (String(application.job.postedBy) !== String(req.user._id)) {
      return res.status(403).json({ message: "You can only update applications for your own jobs" });
    }

    if (!["pending", "review", "accepted", "rejected"].includes(req.body.status)) {
      return res.status(400).json({ message: "Invalid application status" });
    }

    if (application.status === "accepted" || application.status === "rejected") {
      return res.status(400).json({ message: "Decision already final" });
    }

    application.status = req.body.status;
    await application.save();
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStudentApplications = async (req, res) => {
  try {
    if (req.user.role !== "student" || String(req.user._id) !== String(req.params.studentId)) {
      return res.status(403).json({ message: "You can only view your own applications" });
    }

    const data = await Application.find({ student: req.user._id })
      .populate("job", "title company location salary")
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRecruiterApplications = async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Only recruiters can view recruiter applications" });
    }

    const jobs = await Job.find({ postedBy: req.user._id }).select("_id title company location");
    const jobIds = jobs.map((job) => job._id);

    const applications = await Application.find({ job: { $in: jobIds } })
      .populate("student", "name email phone college degree branch graduationYear cgpa skills projects bio")
      .populate("job", "title company location")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
