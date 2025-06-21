// components/Hero.tsx
export default function Hero() {
    return (
      <section className="bg-black text-white min-h-screen flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-wider mb-6">
          BUZZ & FADE
        </h1>
        <p className="text-gray-400 text-lg md:text-xl mb-10">
          Classic cuts, modern fades — right in Bognor Regis.
        </p>
        <button className="bg-white text-black px-6 py-3 font-semibold hover:bg-gray-200 transition rounded-md">
          BOOK NOW
        </button>
      </section>
    );
  }
  