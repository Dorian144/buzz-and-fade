// FILE: app/page.tsx

import Hero from "../components/Hero";
import { FaCut, FaUserTie, FaChild, FaRegSmile, FaUserCheck, FaRegClock, FaRegStar } from "react-icons/fa";

const services = [
  { icon: <FaCut className="text-blue-600 text-3xl" />, name: "Buzz Cut" },
  { icon: <FaCut className="text-blue-600 text-3xl" />, name: "Skin Fade" },
  { icon: <FaUserTie className="text-blue-600 text-3xl" />, name: "Classic Cut" },
  { icon: <FaUserCheck className="text-blue-600 text-3xl" />, name: "Beard Trim" },
  { icon: <FaRegClock className="text-blue-600 text-3xl" />, name: "Hot Towel Shave" },
  { icon: <FaChild className="text-blue-600 text-3xl" />, name: "Kids Cut" },
  { icon: <FaRegSmile className="text-blue-600 text-3xl" />, name: "Line Up / Shape Up" },
  { icon: <FaRegStar className="text-blue-600 text-3xl" />, name: "Hair Wash & Style" },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900">Our Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.name} className="flex flex-col items-center bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
              {service.icon}
              <span className="mt-4 text-lg font-semibold text-gray-800 text-center">{service.name}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
