"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  {
    label: "About Us",
    dropdown: [
      { href: "/about/overview", label: "Overview" },
      { href: "/about/vision", label: "Vision & Mission" },
      { href: "/about/values", label: "Core Values" },
    ],
  },
  {
    label: "Services",
    dropdown: [
      { href: "/services/staffing", label: "Staffing Solutions" },
      { href: "/services/it-staffing", label: "IT Staffing" },
      {
        href: "/services/professional-staffing",
        label: "Professional Staffing",
      },
    ],
  },
  { href: "/join", label: "Join Us" },
  { href: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // For mobile dropdowns
  const pathname = usePathname();

  // If we are not on the homepage, the navbar should always look 'scrolled'
  const isHome = pathname === "/";
  const effectivelyScrolled = !isHome || scrolled || mobileOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        effectivelyScrolled
          ? "bg-white shadow-md py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 z-50">
          <span
            className={`font-[var(--font-jakarta)] text-2xl font-extrabold tracking-tight transition-colors ${
              effectivelyScrolled
                ? "text-slate-900"
                : "text-white drop-shadow-md"
            }`}
          >
            HM Tech Staffing
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l, index) => (
            <li key={index} className="relative group">
              {l.href ? (
                <Link
                  href={l.href}
                  className={`px-4 py-6 text-sm font-semibold tracking-wide rounded-md transition-all ${
                    effectivelyScrolled
                      ? "text-slate-600 hover:text-sky-500"
                      : "text-white hover:text-sky-100 drop-shadow-sm"
                  }`}
                >
                  {l.label}
                </Link>
              ) : (
                <div className="px-4 py-6 cursor-pointer">
                  <span
                    className={`text-sm font-semibold tracking-wide rounded-md transition-all flex items-center gap-1 ${
                      effectivelyScrolled
                        ? "text-slate-600 group-hover:text-sky-500"
                        : "text-white group-hover:text-sky-100 drop-shadow-sm"
                    }`}
                  >
                    {l.label}
                    <i className="fas fa-chevron-down text-[10px] mt-0.5"></i>
                  </span>
                </div>
              )}

              {/* Dropdown Menu */}
              {l.dropdown && (
                <div className="absolute top-full left-0 mt-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="bg-white rounded-md shadow-xl border border-slate-100 py-2 overflow-hidden">
                    {l.dropdown.map((sub, i) => (
                      <Link
                        key={i}
                        href={sub.href}
                        className="block px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-sky-500 hover:bg-sky-50 transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2 z-50"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 transition-all ${
              effectivelyScrolled ? "bg-slate-800" : "bg-white shadow-sm"
            } ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 transition-all ${
              effectivelyScrolled ? "bg-slate-800" : "bg-white shadow-sm"
            } ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 transition-all ${
              effectivelyScrolled ? "bg-slate-800" : "bg-white shadow-sm"
            } ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden absolute top-0 left-0 w-full bg-white shadow-xl transition-transform duration-300 ease-in-out origin-top h-[100dvh] overflow-y-auto ${
          mobileOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        }`}
      >
        <div className="pt-24 pb-6 px-6 flex flex-col gap-1">
          {links.map((l, index) => (
            <div key={index}>
              {l.href ? (
                <Link
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 px-4 text-base font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-500 rounded-md transition-colors"
                >
                  {l.label}
                </Link>
              ) : (
                <>
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === index ? null : index)
                    }
                    className="w-full text-left py-3 px-4 text-base font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-500 rounded-md transition-colors flex items-center justify-between"
                  >
                    {l.label}
                    <i
                      className={`fas fa-chevron-down text-xs transition-transform ${
                        openDropdown === index ? "rotate-180 text-sky-500" : ""
                      }`}
                    ></i>
                  </button>
                  {openDropdown === index && l.dropdown && (
                    <div className="bg-slate-50 rounded-md mt-1 mx-2 py-2 border border-slate-100">
                      {l.dropdown.map((sub, i) => (
                        <Link
                          key={i}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2.5 px-6 text-sm font-medium text-slate-600 hover:text-sky-500 transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
