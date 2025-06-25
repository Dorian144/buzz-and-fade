// FILE: components/Footer.tsx
// PURPOSE: site-wide footer with responsive spacing and container

import Link from "next/link";
import { FaInstagram, FaFacebook, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 sm:py-8 mt-16 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
        <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 text-lg sm:text-xl font-bold text-gray-900">
            <FaMapMarkerAlt className="text-blue-600" /> Buzz & Cut
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <FaPhoneAlt className="text-blue-600" /> <span>+44 1234 567890</span>
          </div>
          <div className="text-xs sm:text-sm">123 Main St, London, UK</div>
        </div>
        <div className="flex gap-4 text-xl sm:text-2xl">
          <Link href="https://instagram.com" target="_blank" className="hover:text-blue-600"><FaInstagram /></Link>
          <Link href="https://facebook.com" target="_blank" className="hover:text-blue-600"><FaFacebook /></Link>
        </div>
        <div className="text-xs text-gray-400 text-center md:text-right">
          &copy; {new Date().getFullYear()} Buzz & Cut. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
  