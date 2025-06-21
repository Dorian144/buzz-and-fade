// FILE: app/page.tsx

import Layout from "../components/Layout";

export default function HomePage() {
  return (
    <Layout>
      <section className="text-center px-4 sm:px-6 py-16 sm:py-24">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Welcome to Buzz&nbsp;&amp;&nbsp;Fade
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
          Classic cuts, modern fades — right in Bognor Regis.
        </p>
        <a
          href="/booking"
          className="inline-block mt-8 px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Book a Cut
        </a>
      </section>
    </Layout>
  );
}
