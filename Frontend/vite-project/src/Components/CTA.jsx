import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="relative py-20 px-6 md:px-10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-10 w-72 h-72 bg-blue-600/20 blur-3xl rounded-full"></div>
        <div className="absolute right-1/4 bottom-0 w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 md:px-16 py-14 text-center shadow-2xl shadow-blue-500/20">
        <p className="uppercase tracking-widest text-sm font-semibold text-blue-100">
          Start Your Career Journey
        </p>

        <h2 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
          Ready to Get Hired?
        </h2>

        <p className="text-white/90 text-lg mt-5 max-w-2xl mx-auto">
          Join CodeHire today and unlock internships, jobs,
          referrals and endless opportunities.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/signup"
            className="bg-white text-slate-900 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold transition"
          >
            Create Free Account
          </Link>

          <Link
            to="/jobs"
            className="border border-white/30 bg-white/10 hover:bg-white/15 px-8 py-4 rounded-xl font-semibold transition"
          >
            Explore Jobs
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CTA;