"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { 
  fetchBookings, 
  addBooking, 
  updateBooking, 
  deleteBooking, 
  toggleBookingStatus,
  markReminderSent,
  formatDate,
  formatDateTime,
  type Booking 
} from "@/lib/bookingService";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, parseISO, addMonths, subMonths } from "date-fns";
import Select from "react-select";

export default function AdminBookingPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    service: "",
    notes: "",
    status: "Pending",
  });

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00", "19:30", "20:00"
  ];
  const timeOptions = timeSlots.map((t) => ({ value: t, label: t }));

  useEffect(() => {
    loadBookings();
  }, [currentDate]);

  const loadBookings = async () => {
    setLoading(true);
    const startDate = format(startOfMonth(currentDate), "yyyy-MM-dd");
    const endDate = format(endOfMonth(currentDate), "yyyy-MM-dd");
    const data = await fetchBookings();
    setBookings(data);
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (selectedBooking) {
      await updateBooking(selectedBooking.id, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: form.service,
        dateTime: `${form.date}T${form.time}`,
        confirmed: form.status === "Confirmed",
        notes: form.notes,
      });
    } else {
      await addBooking(form);
    }
    setShowModal(false);
    setSelectedBooking(null);
    setForm({ name: "", email: "", phone: "", date: "", time: "", service: "", notes: "", status: "Pending" });
    loadBookings();
  };

  const handleEdit = (booking: Booking) => {
    const dateTime = parseISO(booking.dateTime);
    setSelectedBooking(booking);
    setForm({
      name: booking.name,
      email: booking.email || "",
      phone: booking.phone || "",
      date: format(dateTime, "yyyy-MM-dd"),
      time: format(dateTime, "HH:mm"),
      service: booking.service,
      notes: booking.notes || "",
      status: booking.confirmed ? "Confirmed" : "Pending",
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      await deleteBooking(id);
      loadBookings();
    }
  };

  const handleStatusToggle = async (id: string, confirmed: boolean) => {
    await toggleBookingStatus(id, confirmed);
    loadBookings();
  };

  const handleReminderSent = async (id: string) => {
    await markReminderSent(id);
    loadBookings();
  };

  const getBookingsForDate = (date: Date) => {
    return bookings.filter(booking => 
      isSameDay(parseISO(booking.dateTime), date)
    );
  };

  const calendarDays = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const getDayClass = (date: Date) => {
    const dayBookings = getBookingsForDate(date);
    const hasBookings = dayBookings.length > 0;
    const hasPending = dayBookings.some(b => !b.confirmed);
    const hasConfirmed = dayBookings.some(b => b.confirmed);
    
    let baseClass = "p-2 text-center border border-gray-300 min-h-[80px] relative";
    
    if (hasBookings) {
      if (hasPending && hasConfirmed) {
        baseClass += " bg-yellow-100";
      } else if (hasPending) {
        baseClass += " bg-red-100";
      } else if (hasConfirmed) {
        baseClass += " bg-green-100";
      }
    }
    
    return baseClass;
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-10 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Admin Booking Management</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setView("calendar")}
              className={`px-4 py-2 rounded ${view === "calendar" ? "bg-blue-600 text-white" : "bg-gray-600 text-white"}`}
            >
              Calendar View
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-4 py-2 rounded ${view === "list" ? "bg-blue-600 text-white" : "bg-gray-600 text-white"}`}
            >
              List View
            </button>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={() => setShowModal(true)}
            >
              + New Booking
            </button>
          </div>
        </div>

        {/* Calendar Navigation */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Previous Month
          </button>
          <h2 className="text-2xl font-bold text-white">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <button
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Next Month
          </button>
        </div>

        {loading ? (
          <p className="text-white">Loading bookings...</p>
        ) : view === "calendar" ? (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Calendar Header */}
            <div className="grid grid-cols-7 bg-gray-100">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                <div key={day} className="p-3 text-center font-semibold text-gray-700">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7">
              {calendarDays.map((day, index) => {
                const dayBookings = getBookingsForDate(day);
                return (
                  <div key={index} className={getDayClass(day)}>
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      {format(day, "d")}
                    </div>
                    <div className="space-y-1">
                      {dayBookings.slice(0, 2).map(booking => (
                        <div
                          key={booking.id}
                          className={`text-xs p-1 rounded cursor-pointer ${
                            booking.confirmed 
                              ? "bg-green-200 text-green-800" 
                              : "bg-red-200 text-red-800"
                          }`}
                          onClick={() => handleEdit(booking)}
                          title={`${booking.name} - ${booking.service}`}
                        >
                          {booking.name}
                        </div>
                      ))}
                      {dayBookings.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{dayBookings.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reminder
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => {
                    const dateTime = parseISO(booking.dateTime);
                    const isToday = isSameDay(dateTime, new Date());
                    const isTomorrow = isSameDay(dateTime, addMonths(new Date(), 1));
                    
                    return (
                      <tr key={booking.id} className={isToday ? "bg-yellow-50" : isTomorrow ? "bg-blue-50" : ""}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                            {booking.email && (
                              <div className="text-sm text-gray-500">{booking.email}</div>
                            )}
                            {booking.phone && (
                              <div className="text-sm text-gray-500">{booking.phone}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {formatDate(booking.dateTime)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {format(dateTime, "h:mm a")}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {booking.service}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleStatusToggle(booking.id, !booking.confirmed)}
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              booking.confirmed
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {booking.confirmed ? "Confirmed" : "Pending"}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {booking.reminderSent ? (
                            <span className="text-green-600 text-sm">✓ Sent</span>
                          ) : (
                            <button
                              onClick={() => handleReminderSent(booking.id)}
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              Mark Sent
                            </button>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleEdit(booking)}
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(booking.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Booking Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4 text-gray-900">
                {selectedBooking ? "Edit Booking" : "New Booking"}
              </h2>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Customer Name *"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-500"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-500"
                />
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                  placeholder="dd/mm/yyyy"
                />
                <p className="text-xs text-gray-500 mt-1">Format: dd/mm/yyyy</p>
                <Select
                  options={timeOptions}
                  value={timeOptions.find(option => option.value === form.time)}
                  onChange={option => setForm({ ...form, time: option ? option.value : "" })}
                  placeholder="Select a time"
                  className="react-select-container"
                  classNamePrefix="react-select"
                  isSearchable
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      minHeight: '40px',
                      fontSize: '1rem',
                      backgroundColor: '#fff',
                      borderColor: state.isFocused ? '#2563eb' : '#6b7280',
                      boxShadow: state.isFocused ? '0 0 0 2px #2563eb33' : base.boxShadow,
                      color: '#111827',
                    }),
                    menu: (base) => ({
                      ...base,
                      zIndex: 9999,
                      backgroundColor: '#fff',
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isSelected
                        ? '#2563eb'
                        : state.isFocused
                        ? '#dbeafe'
                        : '#fff',
                      color: state.isSelected ? '#fff' : '#111827',
                    }),
                    singleValue: (base) => ({
                      ...base,
                      color: '#111827',
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: '#6b7280',
                    }),
                  }}
                />
                <input
                  type="text"
                  placeholder="Service *"
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-500"
                />
                <textarea
                  placeholder="Notes"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-500"
                />
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                </select>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setSelectedBooking(null);
                      setForm({ name: "", email: "", phone: "", date: "", time: "", service: "", notes: "", status: "Pending" });
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!form.name || !form.service || !form.date || !form.time}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {selectedBooking ? "Update" : "Add"} Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
