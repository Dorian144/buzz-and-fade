// FILE: app/booking/page.tsx

"use client";

import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Layout from "@/components/Layout";

export default function BookingPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await addDoc(collection(db, "bookings"), {
        name,
        phone,
        dateTime,
        notes,
        createdAt: Timestamp.now(),
        confirmed: false,
      });

      setSuccess(true);
      setName("");
      setPhone("");
      setDateTime("");
      setNotes("");
    } catch (err) {
      console.error("Booking error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="bg-black text-white py-16 px-4 sm:px-8 min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-xl w-full text-center">
          <h1 className="text-4xl font-bold mb-6">Book Your Appointment</h1>
          <p className="text-gray-300 mb-8">
            Fill out your details and we'll confirm your appointment shortly.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 text-left bg-gray-900 p-6 rounded-xl border border-gray-700"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              required
              className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              required
              className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              required
              className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Preferred style or notes (optional)"
              className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-black font-semibold py-2 rounded hover:bg-gray-300 transition"
            >
              {loading ? "Submitting..." : "Confirm Booking"}
            </button>
          </form>

          {success && (
            <p className="mt-4 text-green-400 font-medium">
              Booking submitted! We'll contact you soon.
            </p>
          )}
          {error && (
            <p className="mt-4 text-red-400 font-medium">{error}</p>
          )}
        </div>
      </section>
    </Layout>
  );
}
