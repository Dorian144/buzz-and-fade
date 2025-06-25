"use client";

import QRCode from "react-qr-code";
import Layout from "../../components/Layout";

export default function QRPage() {
  const bookingUrl = "https://buzz-and-fade.vercel.app/book-now";

  return (
    <Layout>
      <section className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-4 py-16">
        <div className="text-center max-w-md">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Scan to Book</h1>
          <p className="text-gray-400 mb-8 text-lg">
            Point your phone camera at the QR code below to book your appointment.
          </p>
          <div className="bg-white p-4 rounded-lg inline-block shadow-lg">
            <QRCode value={bookingUrl} size={256} />
          </div>
        </div>
      </section>
    </Layout>
  );
}
