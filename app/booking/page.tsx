// FILE: app/booking/page.tsx
// ACTION: Replace entire file

"use client";

import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Layout from "../../components/Layout";

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
        confirmed: false, // we’ll use this later with the bot
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
      <section className="py-20 text-center max-w-xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">Book a Cut</h2>
        <p className="text-gray-600 mb-8">
          Fill out your details and we’ll confirm your appointment.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
            className="border px-4 py-2 rounded"
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            required
            className="border px-4 py-2 rounded"
          />
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required
            className="border px-4 py-2 rounded"
          />
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Style (optional)"
            className="border px-4 py-2 rounded"
          />
          <button
            type="submit"
            className="bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Booking"}
          </button>
        </form>

        {success && (
          <p className="mt-4 text-green-600 font-medium">
            Booking submitted! We'll confirm shortly.
          </p>
        )}
        {error && (
          <p className="mt-4 text-red-600 font-medium">{error}</p>
        )}
      </section>
    </Layout>
  );
}
