// FILE: components/Footer.tsx
// PURPOSE: site-wide footer

export default function Footer() {
    return (
      <footer className="bg-gray-100 text-center py-6 text-sm text-gray-600">
        <p>© {new Date().getFullYear()} Buzz &amp; Fade – Bognor&nbsp;Regis</p>
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
      </footer>
    );
  }
  