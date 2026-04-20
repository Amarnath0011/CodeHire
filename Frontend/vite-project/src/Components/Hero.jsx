import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80"
          alt="Students career placement"
          className="w-full h-full object-cover"
        />

        {/* Light Overlay */}
        <div className="absolute inset-0 bg-slate-950/70"></div>

        {/* Blue Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/60 to-blue-900/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-20 md:pt-32 md:pb-28">
        {/* Badge */}
        <div className="flex justify-center md:justify-start">
          <span className="px-4 py-2 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-300 text-sm font-semibold tracking-wide">
            India’s Student Hiring Platform
          </span>
        </div>

        {/* Hero Text */}
        <div className="mt-8 max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
            Get Jobs, Internships &
            <span className="text-blue-400"> Referrals </span>
            Faster
          </h1>

          <p className="text-gray-300 text-base md:text-xl mt-6 max-w-2xl leading-relaxed">
            Built for students, recruiters and placement success.
            Discover verified opportunities, apply instantly and
            grow your career with CodeHire.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <Link
            to="/jobs"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold transition shadow-lg shadow-blue-500/20 text-center"
          >
            Find Jobs
          </Link>

          <Link
            to="/signup"
            className="border border-white/20 bg-white/10 hover:bg-white/15 px-8 py-4 rounded-xl font-semibold transition text-center"
          >
            Create Free Account
          </Link>
        </div>

        {/* Trust Line */}
        <p className="text-gray-400 text-sm mt-8">
          Trusted by students and recruiters across India
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-5xl">
          {[
            "10K+ Students",
            "500+ Recruiters",
            "2K+ Jobs Posted",
            "95% Success Rate",
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 text-center text-sm md:text-base font-semibold text-white"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;