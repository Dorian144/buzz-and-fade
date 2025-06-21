// FILE: components/Layout.tsx
// PURPOSE: wraps every page with Header + Footer and applies mobile-safe layout

import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <main className="flex-grow px-4 sm:px-6 lg:px-8 w-full max-w-screen-xl mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
}
