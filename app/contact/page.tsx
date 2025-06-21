import Layout from "../../components/Layout";

export default function ContactPage() {
  return (
    <Layout>
      <section className="bg-black text-white py-20 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Contact Us</h2>
          <p className="text-gray-400 mb-10 text-lg">
            Walk in or give us a call — we’re here for your next cut.
          </p>

          <div className="space-y-4 text-left text-gray-300">
            <p>
              <span className="font-semibold text-white">📍 Address:</span><br />
              3 Station Rd, Bognor Regis PO21 1QB
            </p>
            <p>
              <span className="font-semibold text-white">📞 Phone:</span><br />
              <a href="tel:01243941281" className="underline hover:text-white">
                01243 941281
              </a>
            </p>
            <p>
              <span className="font-semibold text-white">📸 Instagram:</span><br />
              <a
                href="https://instagram.com/buzz.and.fade"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                @buzz.and.fade
              </a>
            </p>
          </div>

          <div className="mt-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2553.4341838588435!2d-0.6784579236754396!3d50.78541977167142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48744cf5a7ff875f%3A0xd9a1bbdb89d16e34!2sBuzz%20%26%20Fade!5e0!3m2!1sen!2suk!4v1718995439200!5m2!1sen!2suk"
              width="100%"
              height="300"
              className="rounded-lg border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </Layout>
  );
}
