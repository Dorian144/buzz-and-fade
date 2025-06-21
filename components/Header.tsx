'use client';

import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-black text-white px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold whitespace-nowrap">
          Buzz&nbsp;&amp;&nbsp;Fade 💈
        </h1>

        {/* Mobile toggle button */}
        <button
          className="sm:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        {/* Navigation links */}
        <nav
          className={`flex-col sm:flex-row sm:flex space-y-4 sm:space-y-0 sm:space-x-6 absolute sm:static top-16 left-0 w-full sm:w-auto bg-black sm:bg-transparent px-6 sm:px-0 z-50 ${
            menuOpen ? 'flex' : 'hidden sm:flex'
          }`}
        >
          <a href="/" className="hover:underline">Home</a>
          <a href="/gallery" className="hover:underline">Gallery</a>
          <a href="/booking" className="hover:underline">Book</a>
          <a href="/contact" className="hover:underline">Contact</a>
          <a href="/qr" className="hover:underline">QR</a>
        </nav>
      </div>
    </header>
  );
}
