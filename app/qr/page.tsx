"use client";

import QRCode from "react-qr-code";

export default function QRPage() {
  const bookingUrl = "https://buzz-and-fade.vercel.app/book";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-white">
      <h1 className="text-2xl font-bold mb-6">Scan to Book</h1>
      <div className="bg-white p-4">
        <QRCode value={bookingUrl} size={256} />
      </div>
      <p className="mt-4 text-center text-sm text-gray-600">
        Point your camera at this QR to book your appointment.
      </p>
    </div>
  );
}
