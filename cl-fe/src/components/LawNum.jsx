import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const stats = [
  {
    label: "Kasus HAM ditangani 2024",
    value: 2305,
    icon: "⚖️",
    percent: 75,
    change: "+12%",
    color: "#16a34a",
  },
  {
    label: "Aduan HAM Sem I 2024",
    value: 1227,
    icon: "📅",
    percent: 50,
    change: "-5%",
    color: "#2563eb",
  },
  {
    label: "OBH Terakreditasi (2025–2027)",
    value: 777,
    icon: "🏛️",
    percent: 35,
    change: "+8%",
    color: "#9333ea",
  },
  {
    label: "PBH Terverifikasi (2019–2021)",
    value: 524,
    icon: "📚",
    percent: 25,
    change: "+2%",
    color: "#f97316",
  },
];

const LawInNumbersSection = () => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
        >
          Hukum dalam Angka
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-600 text-lg mb-12"
        >
          Statistik terkini dari Komnas HAM & data bantuan hukum di Indonesia
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center"
            >
              <div className="text-4xl">{stat.icon}</div>

              {/* Circular Progress */}
              <div className="w-24 h-24 mt-4">
                <CircularProgressbar
                  value={stat.percent}
                  text={`${stat.percent}%`}
                  styles={buildStyles({
                    textColor: "#111827",
                    pathColor: stat.color,
                    trailColor: "#e5e7eb",
                  })}
                />
              </div>

              {/* Value */}
              <div className="mt-4 text-3xl font-bold text-gray-900">
                <CountUp
                  start={0}
                  end={stat.value}
                  duration={1.5}
                  separator=","
                />
              </div>

              {/* Label */}
              <div className="mt-2 text-gray-600 text-sm">{stat.label}</div>

              {/* Change badge */}
              <span
                className="mt-3 px-3 py-1 text-xs font-medium rounded-full"
                style={{
                  backgroundColor: `${stat.color}20`,
                  color: stat.color,
                }}
              >
                {stat.change}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LawInNumbersSection;
