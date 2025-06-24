// FILE: components/Layout.tsx
// PURPOSE: wraps every page with a mobile-safe layout (no header/footer)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <main className="flex-grow px-4 sm:px-6 lg:px-8 w-full max-w-screen-xl mx-auto">
        {children}
      </main>
    </div>
  );
}
