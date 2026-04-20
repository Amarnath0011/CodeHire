function Features() {
    const items = [
      "One-click job applications",
      "Direct recruiter dashboards",
      "Referral request system",
      "Track application status",
      "Resume profile showcase",
      "Placement preparation hub",
    ];
  
    return (
      <section className="py-20 px-8 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose CodeHire?
        </h2>
  
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item} className="bg-gray-900 p-6 rounded-2xl">
              <p className="text-lg">{item}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  export default Features;