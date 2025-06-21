// FILE: components/Footer.tsx
// PURPOSE: site-wide footer with responsive spacing and container

export default function Footer() {
    return (
      <footer className="bg-gray-100 text-center text-sm text-gray-600 py-6 px-4 sm:px-6">
        <div className="max-w-screen-xl mx-auto space-y-1">
          <p>© {new Date().getFullYear()} Buzz &amp; Fade – Bognor Regis</p>
          <p>
            Follow us on{" "}
            <a
              href="https://www.instagram.com/buzz.and.fade"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Instagram
            </a>
          </p>
        </div>
      </footer>
    );
  }
  