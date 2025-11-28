import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const targetDate = new Date("2025-12-31T20:00:00+05:30").getTime();

const Countdown: React.FC = () => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  let diff = targetDate - now;
  if (diff < 0) diff = 0;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

  return (
    <div
      className="
        w-full min-h-[90vh] flex justify-center items-center px-4
        bg-[url('./pexels-aaron-j-hill-3434251-12755084.jpg')]
        bg-cover bg-center bg-no-repeat
        relative py-2
      "
    >
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10
          bg-white/10 backdrop-blur-xl border border-white/20
          p-10 rounded-3xl shadow-2xl max-w-4xl w-full text-white
        "
      >
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center text-4xl md:text-5xl font-extrabold tracking-wide mb-6 drop-shadow-xl"
        >
          🎉 Countdown to 2026 
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center text-4xl md:text-5xl font-extrabold tracking-wide mb-6 drop-shadow-xl"
        >
          New Year Celebration 🎉 
        </motion.h2>

        {/* Countdown */}
        <motion.div
          initial={{ scale: 0.85 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          className="
            flex justify-center items-center gap-8
            bg-white/20 px-8 py-5 rounded-xl shadow-inner
          "
        >
          <div className="text-center">
            <p className="text-5xl md:text-6xl font-extrabold font-mono">
              {days}
            </p>
            <p className="uppercase tracking-widest opacity-90 text-sm">Days</p>
          </div>

          <span className="text-4xl font-bold opacity-80">:</span>

          <div className="text-center">
            <p className="text-5xl md:text-6xl font-extrabold font-mono">
              {hours}
            </p>
            <p className="uppercase tracking-widest opacity-90 text-sm">
              Hours
            </p>
          </div>
        </motion.div>

        {/* Event Details */}
        <div className="mt-8 text-center space-y-4 text-white/90">
          <p className="text-lg leading-relaxed">
            Join us for an unforgettable night of music, dance, food, sparkles,
            and New Year magic! Let's welcome 2026 together 🎆
          </p>

          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
            <p>
              <span className="font-semibold">📍 Location:</span>
              <br />
              #404 Nilamber Primero, Vasna - Bhayli Road,
              <br />
              Vadodara, Gujarat
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-white/10 p-4 rounded-xl">
              <p className="font-semibold">📅 Date</p>
              <p>31 December 2025</p>
            </div>

            <div className="bg-white/10 p-4 rounded-xl">
              <p className="font-semibold">⏰ Time</p>
              <p>08:00 p.m. IST</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-8 flex justify-center">
          <Link
            to="/register"
            className="
              bg-gradient-to-r from-fuchsia-500 to-indigo-500
              hover:from-fuchsia-400 hover:to-indigo-400
              px-8 py-3 rounded-full text-lg font-semibold shadow-xl
              transition transform hover:scale-105 active:scale-95
            "
          >
            🎟️ Register Now
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Countdown;
