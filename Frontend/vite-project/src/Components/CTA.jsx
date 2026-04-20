import Button from "./Button";

function CTA() {
  return (
    <section className="text-center py-20 px-6">
      <h2 className="text-4xl font-bold">Ready to Get Hired?</h2>
      <p className="text-gray-400 mt-4 mb-8">
        Join CodeHire today and unlock opportunities.
      </p>

      <Button
        text="Create Free Account"
        className="bg-blue-600 hover:bg-blue-700"
      />
    </section>
  );
}

export default CTA;