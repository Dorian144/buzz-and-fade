// FILE: app/booking/page.tsx

import Layout from "../../components/Layout";

export default function BookingPage() {
  return (
    <Layout>
      <section className="py-20 text-center max-w-xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">Book a Cut</h2>
        <p className="text-gray-600 mb-8">
          Fill out your details and we’ll confirm your appointment.
        </p>
        <form className="flex flex-col gap-4 text-left">
          <input
            type="text"
            placeholder="Full Name"
            className="border px-4 py-2 rounded"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="border px-4 py-2 rounded"
          />
          <input
            type="datetime-local"
            className="border px-4 py-2 rounded"
          />
          <textarea
            placeholder="Style (optional)"
            className="border px-4 py-2 rounded"
          />
          <button
            type="submit"
            className="bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Submit Booking
          </button>
        </form>
      </section>
    </Layout>
  );
}
