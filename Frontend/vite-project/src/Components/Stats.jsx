function Stats() {
    const data = [
      ["10K+", "Students"],
      ["500+", "Recruiters"],
      ["2K+", "Jobs Posted"],
      ["95%", "Success Rate"],
    ];
  
    return (
      <section className="grid md:grid-cols-4 gap-6 px-8 py-10 max-w-6xl mx-auto">
        {data.map(([num, text]) => (
          <div key={text} className="bg-gray-900 p-6 rounded-2xl text-center">
            <h2 className="text-3xl font-bold text-blue-500">{num}</h2>
            <p className="text-gray-400 mt-2">{text}</p>
          </div>
        ))}
      </section>
    );
  }
  
  export default Stats;