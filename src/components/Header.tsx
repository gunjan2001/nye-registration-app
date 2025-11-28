import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const base = "relative px-3 py-2 text-sm font-medium transition duration-300";
  const active = "text-white after:w-full after:bg-white";
  const inactive =
    "text-white/70 hover:text-white after:w-0 hover:after:w-full after:bg-white/40";

  return (
    <header className="sticky top-0 z-50 shadow-lg bg-gradient-to-r from-indigo-600/80 to-purple-600/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Branding */}
        <Link
          to="/"
          className="text-xl font-bold tracking-wide text-white flex items-center"
        >
          🎆 NYE Party 2026
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`${base} ${
              pathname === "/" ? active : inactive
            } after:absolute after:left-0 after:bottom-0 after:h-[2px] after:transition-all`}
          >
            Home
          </Link>

          <Link
            to="/list"
            className={`${base} ${
              pathname === "/list" ? active : inactive
            } after:absolute after:left-0 after:bottom-0 after:h-[2px] after:transition-all`}
          >
            Registrants
          </Link>

          <Link
            to="/register"
            className="ml-2 bg-white text-indigo-600 font-semibold px-4 py-2 rounded-full hover:shadow-[0_0_10px_rgba(255,255,255,0.6)] transition"
          >
            + Register
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white focus:outline-none"
        >
          {/* Simple hamburger icon made using tailwind */}
          <div className="space-y-1">
            <span
              className={`block h-0.5 w-6 bg-white transition ${
                open ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition ${
                open ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 py-4 bg-gray-700/70 backdrop-blur-xl space-y-4">
          <Link
            to="/"
            className="block text-white text-lg"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/list"
            className="block text-white text-lg"
            onClick={() => setOpen(false)}
          >
            Registrants
          </Link>

          <Link
            to="/register"
            className="block bg-white text-indigo-700 font-semibold px-4 py-2 rounded-lg"
            onClick={() => setOpen(false)}
          >
            + Register
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
