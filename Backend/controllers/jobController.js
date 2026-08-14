const Job = require("../models/Job");

const normalize = (value = "") => value.trim().replace(/\s+/g, " ").toLowerCase();
const escapeRegex = (value = "") => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

exports.createJob = async (req, res) => {
  try {
    if (req.user.role !== "recruiter") return res.status(403).json({ message: "Only recruiters can post jobs" });
    const { title, company, location, salary, description } = req.body;
    if (!title || !company || !location || !salary || !description) return res.status(400).json({ message: "All job fields are required" });

    const existingJob = await Job.findOne({
      postedBy: req.user._id,
      title: { $regex: `^${escapeRegex(normalize(title))}$`, $options: "i" },
      company: { $regex: `^${escapeRegex(normalize(company))}$`, $options: "i" },
      location: { $regex: `^${escapeRegex(normalize(location))}$`, $options: "i" },
    });
    if (existingJob) return res.status(409).json({ message: "You have already posted this job. Please use your existing job instead." });

    const job = await Job.create({ title: title.trim(), company: company.trim(), location: location.trim(), salary: salary.trim(), description: description.trim(), postedBy: req.user._id });
    res.status(201).json(job);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getJobs = async (req, res) => {
  try { res.json(await Job.find().sort({ createdAt: -1 })); }
  catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getRecruiterJobs = async (req, res) => {
  try {
    if (req.user.role !== "recruiter") return res.status(403).json({ message: "Only recruiters can view recruiter jobs" });
    res.json(await Job.find({ postedBy: req.user._id }).sort({ createdAt: -1 }));
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.deleteJob = async (req, res) => {
  try {
    if (req.user.role !== "recruiter") return res.status(403).json({ message: "Only recruiters can delete jobs" });
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    if (String(job.postedBy) !== String(req.user._id)) return res.status(403).json({ message: "You can only delete your own jobs" });
    await job.deleteOne();
    res.json({ message: "Job deleted" });
  } catch (error) { res.status(500).json({ message: "Delete failed" }); }
};
