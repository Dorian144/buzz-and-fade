"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";
import { addBooking } from "@/lib/bookingService";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

export default function BookNowPage() {
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    date: null as Date | null,
    time: "",
    service: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const services = [
    "Buzz Cut",
    "Skin Fade",
    "Classic Cut",
    "Beard Trim",
    "Hot Towel Shave",
    "Kids Cut",
    "Crew Cut",
    "Scissor Cut",
    "Line Up / Shape Up",
    "Head Shave",
    "Senior Cut",
    "Hair Wash & Style",
  ];

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00", "19:30", "20:00"
  ];

  const timeOptions = timeSlots.map((t) => ({ value: t, label: t }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addBooking({
        ...form,
        date: form.date ? format(form.date, "yyyy-MM-dd") : "",
        status: "Pending"
      });
      setSubmitted(true);
      setForm({ name: "", phoneNumber: "", date: null, time: "", service: "", notes: "" });
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("There was an error submitting your booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    today.setHours(0,0,0,0);
    return today;
  };

  if (submitted) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto py-20 px-4 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-green-600 text-6xl mb-4">✓</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Submitted!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your booking request. We'll review it and get back to you within 24 hours to confirm your appointment.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>What happens next?</p>
              <ul className="list-disc list-inside space-y-1">
                <li>We'll review your booking request</li>
                <li>You'll receive a confirmation call or email</li>
                <li>We'll send you a reminder 24 hours before your appointment</li>
              </ul>
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book Another Appointment
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-10 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Book Your Appointment</h1>
          <p className="text-gray-300 text-lg">
            Choose your preferred service and time slot. We'll confirm your booking within 24 hours.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={form.phoneNumber}
                  onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                  placeholder="Enter your phone number"
                />
                <p className="text-xs text-gray-600 mt-1">
                  By providing your phone number, you agree to receive appointment-related SMS reminders.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date *
                </label>
                <DatePicker
                  selected={form.date}
                  onChange={(date) => setForm({ ...form, date: date })}
                  minDate={getMinDate()}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/mm/yyyy"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                  required
                  showPopperArrow={false}
                />
                <p className="text-xs text-gray-500 mt-1">Format: dd/mm/yyyy</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time *
                </label>
                <Select
                  options={timeOptions}
                  value={timeOptions.find(option => option.value === form.time)}
                  onChange={option => setForm({ ...form, time: option ? option.value : "" })}
                  placeholder="Select a time"
                  className="react-select-container"
                  classNamePrefix="react-select"
                  isSearchable
                  required
                  styles={{
                    control: (base: any, state: any) => ({
                      ...base,
                      minHeight: '48px',
                      fontSize: '1rem',
                      backgroundColor: '#f3f4f6',
                      borderColor: state.isFocused ? '#2563eb' : '#6b7280',
                      boxShadow: state.isFocused ? '0 0 0 2px #2563eb33' : base.boxShadow,
                      color: '#111827',
                    }),
                    menu: (base: any) => ({
                      ...base,
                      zIndex: 9999,
                      backgroundColor: '#f3f4f6',
                    }),
                    option: (base: any, state: any) => ({
                      ...base,
                      backgroundColor: state.isSelected
                        ? '#2563eb'
                        : state.isFocused
                        ? '#dbeafe'
                        : '#f3f4f6',
                      color: state.isSelected ? '#fff' : '#111827',
                    }),
                    singleValue: (base: any) => ({
                      ...base,
                      color: '#111827',
                    }),
                    placeholder: (base: any) => ({
                      ...base,
                      color: '#6b7280',
                    }),
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service *
                </label>
                <select
                  required
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={4}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                placeholder="Any special requests or additional information..."
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">Important Information</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Bookings are subject to availability confirmation</li>
                <li>• We'll contact you within 24 hours to confirm your appointment</li>
                <li>• Please arrive 10 minutes before your scheduled time</li>
                <li>• Cancellations require 24 hours notice</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Submitting..." : "Submit Booking Request"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
} 