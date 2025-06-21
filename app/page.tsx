// FILE: app/page.tsx
// ACTION: Replace ENTIRE file
import Layout from "../components/Layout";

export default function HomePage() {
  return (
    <Layout>
      <section className="text-center py-20">
        <h2 className="text-4xl font-bold mb-4">Welcome to Buzz&nbsp;&amp;&nbsp;Fade</h2>
        <p className="text-lg text-gray-600">
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
