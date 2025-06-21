import Layout from "../../components/Layout";

export default function GalleryPage() {
  return (
    <Layout>
      <section className="bg-black text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Our Work</h2>
          <p className="text-gray-400 mb-12 text-lg max-w-2xl mx-auto">
            A selection of styles we’ve created for our clients — classic, sharp, and always fresh.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-md aspect-[4/5]"
              >
                <div className="h-full w-full flex items-center justify-center text-gray-500 text-xl font-semibold">
                  Photo {i}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
