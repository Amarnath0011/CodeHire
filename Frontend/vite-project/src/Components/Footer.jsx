import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-extrabold">
              Code<span className="text-blue-500">Hire</span>
            </h2>

            <p className="text-gray-400 mt-4 leading-relaxed max-w-sm">
              Empowering students with jobs, internships,
              referrals and placement success across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-gray-400">
              <Link
                to="/"
                className="hover:text-white transition"
              >
                Home
              </Link>

              <Link
                to="/jobs"
                className="hover:text-white transition"
              >
                Jobs
              </Link>

              <Link
                to="/signup"
                className="hover:text-white transition"
              >
                Signup
              </Link>

              <Link
                to="/login"
                className="hover:text-white transition"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">
              Contact
            </h3>

            <div className="text-gray-400 space-y-3">
              <p>Email: support@codehire.in</p>
              <p>India</p>
              <p>Built by Amarnath</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-gray-500 text-sm">
          © 2026 CodeHire. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;