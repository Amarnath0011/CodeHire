import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getProfile, updateProfile, uploadResume } from "../services/profileService";

const emptyProfile = {
  name: "",
  phone: "",
  college: "",
  degree: "",
  branch: "",
  graduationYear: "",
  cgpa: "",
  skills: "",
  projects: "",
  bio: "",
  location: "",
};

function Profiles() {
  const { user, logout, login } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) return;

    const loadProfile = async () => {
      try {
        const res = await getProfile();
        const data = res.data;
        setProfile({ ...emptyProfile, ...data });

        // Keep the local auth user in sync with the database profile.
        login(data, localStorage.getItem("token"));
      } catch (error) {
        setMessage(error.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (!user) {
    return (
      <section className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center max-w-md w-full">
          <h1 className="text-3xl font-bold">Please Login</h1>
          <p className="text-gray-400 mt-3">You need an account to access your profile.</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold"
          >
            Go to Login
          </button>
        </div>
      </section>
    );
  }

  const handleChange = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await updateProfile(profile);
      setProfile({ ...emptyProfile, ...res.data.user });
      login(res.data.user, localStorage.getItem("token"));
      setEditing(false);
      setMessage("Profile updated successfully");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setMessage("Only PDF resumes are allowed");
      e.target.value = "";
      return;
    }

    try {
      setUploading(true);
      const res = await uploadResume(file);
      setProfile((prev) => ({ ...prev, ...res.data.user }));
      login(res.data.user, localStorage.getItem("token"));
      setMessage("Resume uploaded successfully");
    } catch (error) {
      setMessage(error.response?.data?.message || "Resume upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const fields = [
    ["phone", "Phone"],
    ["college", "College"],
    ["degree", "Degree"],
    ["branch", "Branch"],
    ["graduationYear", "Graduation Year"],
    ["cgpa", "CGPA"],
    ["skills", "Skills"],
    ["location", "Location"],
  ];

  return (
    <section className="min-h-screen bg-slate-950 text-white px-4 sm:px-6 md:px-10 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-4xl font-bold">
                {profile.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold">{profile.name || user.name}</h1>
                <p className="text-gray-400 mt-2">{user.email}</p>
                <span className="inline-block mt-3 px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 capitalize text-sm font-semibold">
                  {user.role}
                </span>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="bg-white/10 hover:bg-white/15 px-5 py-3 rounded-xl font-semibold"
              >
                Manage Profile ⚙️
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-slate-900 border border-white/10 rounded-2xl shadow-xl overflow-hidden z-20">
                  <button
                    onClick={() => { setEditing(true); setMenuOpen(false); }}
                    className="w-full text-left px-5 py-3 hover:bg-white/5"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => { setEditing(true); setMenuOpen(false); }}
                    className="w-full text-left px-5 py-3 hover:bg-white/5"
                  >
                    Complete Profile
                  </button>
                  <label className="block w-full text-left px-5 py-3 hover:bg-white/5 cursor-pointer">
                    {uploading ? "Uploading..." : "Upload Resume"}
                    <input type="file" accept="application/pdf,.pdf" className="hidden" onChange={handleResumeUpload} disabled={uploading} />
                  </label>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-5 py-3 text-red-400 hover:bg-red-500/10"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {message && (
            <div className="mt-6 bg-blue-500/10 border border-blue-500/20 text-blue-300 px-4 py-3 rounded-xl">
              {message}
            </div>
          )}
        </div>

        {loading ? (
          <p className="text-center text-gray-400 mt-10">Loading profile...</p>
        ) : editing ? (
          <form onSubmit={handleSave} className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 mt-8">
            <h2 className="text-2xl font-bold">Complete Your Profile</h2>
            <p className="text-gray-400 mt-2">Add your details to make your CodeHire profile useful to recruiters.</p>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <input name="name" value={profile.name} onChange={handleChange} placeholder="Full Name" className="profile-input" required />
              {fields.map(([name, label]) => (
                <input key={name} name={name} value={profile[name] || ""} onChange={handleChange} placeholder={label} className="profile-input" />
              ))}
            </div>

            <textarea name="bio" value={profile.bio || ""} onChange={handleChange} placeholder="About yourself" rows="4" className="profile-input w-full mt-4" />
            <textarea name="projects" value={profile.projects || ""} onChange={handleChange} placeholder="Projects" rows="4" className="profile-input w-full mt-4" />

            <div className="flex gap-3 mt-6">
              <button disabled={saving} className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold">
                {saving ? "Saving..." : "Save Profile"}
              </button>
              <button type="button" onClick={() => setEditing(false)} className="bg-white/10 hover:bg-white/15 px-6 py-3 rounded-xl font-semibold">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 mt-8">
            <h2 className="text-2xl font-bold">Profile Details</h2>
            <div className="grid md:grid-cols-2 gap-5 mt-6">
              {fields.map(([name, label]) => (
                <div key={name}>
                  <p className="text-gray-500 text-sm">{label}</p>
                  <p className="mt-1 text-gray-200">{profile[name] || "Not added"}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <p className="text-gray-500 text-sm">Bio</p>
              <p className="mt-1 text-gray-300">{profile.bio || "Not added"}</p>
            </div>
            <div className="mt-6">
              <p className="text-gray-500 text-sm">Resume</p>
              <p className="mt-1 text-gray-300">
                {profile.resume ? "Resume uploaded ✓" : "No resume uploaded"}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Profiles;
