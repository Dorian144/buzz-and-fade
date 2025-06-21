import Layout from "../../components/Layout";

export default function ContactPage() {
  return (
    <Layout>
      <section className="py-16 sm:py-20 px-4 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Contact</h2>
        <p className="text-base sm:text-lg text-gray-600 mb-8">
          Come see us or get in touch.
        </p>

        <div className="mb-10 text-left space-y-4 text-sm sm:text-base">
          <p>
            <strong>Address:</strong><br />
            3 Station Rd, Bognor Regis PO21 1QB
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            <a href="tel:01243941281" className="text-blue-600 underline">
              01243 941281
            </a>
          </p>
          <p>
            <strong>Instagram:</strong>{" "}
            <a
              href="https://instagram.com/buzz.and.fade"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              @buzz.and.fade
            </a>
          </p>
        </div>

        <div className="rounded-lg overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2553.4341838588435!2d-0.6784579236754396!3d50.78541977167142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48744cf5a7ff875f%3A0xd9a1bbdb89d16e34!2sBuzz%20%26%20Fade!5e0!3m2!1sen!2suk!4v1718995439200!5m2!1sen!2suk"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </Layout>
  );
}
