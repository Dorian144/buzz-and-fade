// FILE: components/Header.tsx
// PURPOSE: site-wide top navigation

export default function Header() {
    return (
      <header className="bg-black text-white px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Buzz&nbsp;&amp;&nbsp;Fade&nbsp;💈</h1>
          <nav className="space-x-4">
            <a href="/"        className="hover:underline">Home</a>
            <a href="/gallery" className="hover:underline">Gallery</a>
            <a href="/booking" className="hover:underline">Book</a>
            <a href="/contact" className="hover:underline">Contact</a>
          </nav>
        </div>
      </header>
    );
  }
  