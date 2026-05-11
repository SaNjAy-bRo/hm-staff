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
  const [openDropdown, setOpenDropdown] = useState(null);
  const pathname = usePathname();

  const isHome = pathname === "/";
  const effectivelyScrolled = !isHome || scrolled || mobileOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        effectivelyScrolled ? "bg-white shadow-sm py-4 border-b border-slate-100" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-[110]">
          <span className={`font-[var(--font-jakarta)] text-2xl font-bold tracking-tight transition-colors ${effectivelyScrolled ? "text-slate-900" : "text-white"}`}>
            HM Tech
            <span className={`transition-colors ${effectivelyScrolled ? "text-blue-600" : "text-blue-400"}`}>.</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-2">
          {links.map((l, index) => (
            <li key={index} className="relative group">
              {l.href ? (
                <Link
                  href={l.href}
                  className={`px-4 py-2 text-sm font-semibold tracking-wide rounded-md transition-colors ${effectivelyScrolled ? "text-slate-600 hover:text-blue-600" : "text-white/90 hover:text-white hover:bg-white/10"}`}
                >
                  {l.label}
                </Link>
              ) : (
                <div className={`px-4 py-2 cursor-pointer flex items-center gap-1.5 text-sm font-semibold tracking-wide rounded-md transition-colors ${effectivelyScrolled ? "text-slate-600 hover:text-blue-600" : "text-white/90 hover:text-white hover:bg-white/10"}`}>
                  {l.label}
                  <i className={`fas fa-chevron-down text-[10px] transition-colors ${effectivelyScrolled ? "text-slate-400 group-hover:text-blue-600" : "text-white/60 group-hover:text-white"}`}></i>
                </div>
              )}

              {/* Dropdown Menu */}
              {l.dropdown && (
                <div className="absolute top-full left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-white rounded-lg shadow-xl border border-slate-100 py-2">
                    {l.dropdown.map((sub, i) => (
                      <Link
                        key={i}
                        href={sub.href}
                        className="block px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
          {/* CTA Button in Navbar */}
          <li className="ml-4">
            <Link
              href="/contact"
              className={`px-6 py-2.5 rounded-md text-sm font-semibold tracking-wide transition-colors shadow-sm ${effectivelyScrolled ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/10" : "bg-white text-slate-900 hover:bg-slate-100"}`}
            >
              Get Started
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-[110]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${effectivelyScrolled || mobileOpen ? "bg-slate-900" : "bg-white"} ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${effectivelyScrolled || mobileOpen ? "bg-slate-900" : "bg-white"} ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${effectivelyScrolled || mobileOpen ? "bg-slate-900" : "bg-white"} ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu Overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm lg:hidden z-[90] transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMobileOpen(false)}
      ></div>

      {/* Mobile menu Drawer */}
      <div
        className={`fixed top-0 right-0 w-[80%] max-w-sm h-full bg-white shadow-2xl lg:hidden z-[100] transition-transform duration-300 ease-in-out flex flex-col ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="pt-24 pb-6 px-6 flex-1 overflow-y-auto">
          <div className="flex flex-col gap-2">
            {links.map((l, index) => (
              <div key={index} className="border-b border-slate-100 last:border-0 pb-2 mb-2">
                {l.href ? (
                  <Link
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 px-2 text-lg font-bold text-slate-800 hover:text-blue-600 transition-colors"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === index ? null : index)
                      }
                      className="w-full flex items-center justify-between py-3 px-2 text-lg font-bold text-slate-800 hover:text-blue-600 transition-colors"
                    >
                      {l.label}
                      <i
                        className={`fas fa-chevron-down text-sm transition-transform ${
                          openDropdown === index ? "rotate-180 text-blue-600" : "text-slate-400"
                        }`}
                      ></i>
                    </button>
                    {openDropdown === index && (
                      <div className="bg-slate-50 rounded-lg p-2 mx-2 mb-2 border border-slate-100">
                        {l.dropdown.map((sub, i) => (
                          <Link
                            key={i}
                            href={sub.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-2.5 px-4 text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-white rounded-md transition-colors"
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
        
        <div className="p-6 border-t border-slate-100 bg-white">
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-full py-3.5 bg-blue-600 text-white rounded-md font-bold text-sm tracking-wide shadow-md shadow-blue-600/20 active:scale-[0.98] transition-transform"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
