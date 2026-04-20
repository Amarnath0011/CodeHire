function Features() {
  const items = [
    {
      title: "One-Click Applications",
      desc: "Apply to internships and jobs instantly with a smooth and fast workflow.",
      icon: "⚡",
    },
    {
      title: "Recruiter Dashboards",
      desc: "Companies can post jobs, manage candidates and streamline hiring.",
      icon: "💼",
    },
    {
      title: "Referral Requests",
      desc: "Connect with professionals and request valuable employee referrals.",
      icon: "🤝",
    },
    {
      title: "Track Applications",
      desc: "Monitor pending, shortlisted and rejected applications in one place.",
      icon: "📈",
    },
    {
      title: "Resume Showcase",
      desc: "Build a strong profile and let recruiters discover your talent.",
      icon: "📄",
    },
    {
      title: "Placement Preparation",
      desc: "Prepare for interviews, coding rounds and career opportunities.",
      icon: "🎯",
    },
  ];

  return (
    <section className="relative py-20 px-6 md:px-10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-10 top-20 w-72 h-72 bg-blue-600/10 blur-3xl rounded-full"></div>
        <div className="absolute right-10 bottom-10 w-72 h-72 bg-indigo-500/10 blur-3xl rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-blue-400 font-semibold uppercase tracking-wider text-sm">
            Why Students Love Us
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold mt-3">
            Why Choose CodeHire?
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            Everything you need to land jobs, internships and build your career.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="group bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 hover:-translate-y-1 transition duration-300 backdrop-blur-md"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white">
                {item.title}
              </h3>

              {/* Desc */}
              <p className="text-gray-400 mt-3 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;