// components/Hero.tsx
import Link from "next/link";
import { FaCut } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative min-h-[60vh] sm:min-h-[70vh] flex flex-col justify-center items-center text-center px-4 py-8 sm:py-16 bg-gradient-to-br from-blue-50 via-white to-gray-100">
      <div className="absolute inset-0 bg-[url('/public/file.svg')] bg-cover bg-center opacity-5 pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-3 mb-4">
          <FaCut className="text-blue-600 text-3xl sm:text-5xl" />
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-wider text-gray-900">Buzz & Cut</h1>
        </div>
        <p className="text-gray-600 text-base sm:text-lg md:text-2xl mb-6 sm:mb-10 max-w-2xl px-4">
          Classic cuts, modern fades, and sharp style—your neighborhood barbershop in Bognor Regis. Walk in for a fresh look or book your spot online!
        </p>
        <Link href="/book-now">
          <button className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-150">
            Book Now
          </button>
        </Link>
      </div>
    </section>
  );
}
  