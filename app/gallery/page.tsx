// FILE: app/gallery/page.tsx

import Layout from "../../components/Layout";

export default function GalleryPage() {
  return (
    <Layout>
      <section className="py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">Gallery</h2>
        <p className="text-gray-600 mb-8">Take a look at our recent work.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
          {/* Replace with actual images */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-gray-200 h-64 rounded shadow" />
          ))}
        </div>
      </section>
    </Layout>
  );
}
