"use client";

import QRCode from "react-qr-code";

export default function QRPage() {
  const bookingUrl = "https://buzz-and-fade.vercel.app/booking";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 bg-white">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Scan to Book
      </h1>

      <div className="bg-white p-4 shadow-md rounded">
        <QRCode value={bookingUrl} size={192} />
      </div>

      <p className="mt-4 text-center text-sm text-gray-600 max-w-xs">
        Point your camera at this QR code to book your appointment.
      </p>
    </div>
  );
}
