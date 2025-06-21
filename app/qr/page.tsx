// app/qr/page.tsx
"use client";

import { QRCodeSVG } from "qrcode.react";

export default function QRPage() {
  const bookingUrl = "https://buzz-and-fade.vercel.app/book"; // or localhost during dev

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-white">
      <h1 className="text-2xl font-bold mb-6">Scan to Book</h1>
      <QRCodeSVG value={bookingUrl} size={256} />
      <p className="mt-4 text-center text-sm text-gray-600">
        Point your camera at this QR to book your appointment.
      </p>
    </div>
  );
}
