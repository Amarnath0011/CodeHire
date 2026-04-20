import Button from "./Button";

function Hero() {
  return (
    <section className="text-center py-24 px-6">
      <p className="text-blue-500 font-semibold mb-4">
        India's Student Hiring Platform
      </p>

      <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-5xl mx-auto">
        Get Jobs, Internships & Referrals Faster
      </h1>

      <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
        Built for students, recruiters and placement success.
      </p>

      <div className="flex gap-4 justify-center mt-8">
        <Button text="Find Jobs" className="bg-blue-600 hover:bg-blue-700" />
        <Button text="Post Job" className="bg-gray-800 hover:bg-gray-700" />
      </div>
    </section>
  );
}

export default Hero;