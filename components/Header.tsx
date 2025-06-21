// FILE: components/Header.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Gallery", href: "/gallery" },
    { name: "Book", href: "/booking" },
    { name: "Contact", href: "/contact" },
    { name: "QR", href: "/qr" },
  ];

  return (
    <header className="bg-black text-white py-6 px-8 flex justify-between items-center">
      <Link href="/" className="text-2xl font-extrabold tracking-wider">
        BUZZ & FADE 💈
      </Link>
      <nav className="space-x-8 text-sm font-semibold uppercase tracking-wide">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`hover:underline ${
              pathname === item.href ? "underline underline-offset-4" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
