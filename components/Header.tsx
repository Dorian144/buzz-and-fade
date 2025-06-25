// FILE: components/Header.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCut } from "react-icons/fa";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Gallery", href: "/gallery" },
    { name: "Book Now", href: "/book-now" },
    { name: "Admin", href: "/booking" },
    { name: "Contact", href: "/contact" },
    { name: "QR", href: "/qr" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-md py-3 px-4 sm:py-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center border-b border-gray-200">
      <Link href="/" className="flex items-center gap-2 text-xl sm:text-2xl font-extrabold tracking-wider text-gray-900 mb-3 sm:mb-0">
        <FaCut className="text-blue-600 text-lg sm:text-xl" />
        <span className="hidden xs:inline">Buzz & Cut</span>
        <span className="xs:hidden">B&C</span>
      </Link>
      <nav className="flex flex-wrap justify-center gap-2 sm:gap-6 text-sm sm:text-base font-semibold uppercase tracking-wide">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-2 py-1 rounded transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-xs sm:text-sm
              ${pathname === item.href ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
