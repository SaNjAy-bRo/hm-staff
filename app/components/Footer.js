"use client";
import { useState } from "react";

export default function Footer() {
  const [subbed, setSubbed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubbed(true);
    e.target.reset();
    setTimeout(() => setSubbed(false), 3000);
  };

  return (
    <footer id="contact" className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-0">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="font-[var(--font-jakarta)] text-xl font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-sky-500 flex items-center justify-center text-white text-xs">
                <i className="fas fa-microchip"></i>
              </div>
              HM Tech
            </h3>
            <div className="text-sm leading-relaxed space-y-2 mb-6">
              <p>42 Bedle RD, Hazlet,<br />NJ 07730, NJ</p>
            </div>
            <div className="text-sm space-y-2 mb-8">
              <p>
                <strong className="text-slate-300 block mb-1">Phone:</strong>
                <a href="tel:+17325203214" className="hover:text-sky-400 transition-colors">
                  +1 (732) 520-3214
                </a>
              </p>
              <p>
                <strong className="text-slate-300 block mb-1">Email:</strong>
                <a href="mailto:hr@hmtecstaffing.com" className="hover:text-sky-400 transition-colors break-all">
                  hr@hmtecstaffing.com
                </a>
              </p>
            </div>
            
            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { icon: "fa-twitter", label: "Twitter" },
                { icon: "fa-facebook-f", label: "Facebook" },
                { icon: "fa-linkedin-in", label: "LinkedIn" },
              ].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={s.label}
                  className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-sky-500 hover:text-white transition-all duration-300"
                >
                  <i className={`fab ${s.icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Useful Links */}
          <div className="lg:col-span-1">
            <h3 className="font-[var(--font-jakarta)] text-lg font-bold text-white mb-6">
              Company
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "#home" },
                { label: "About Us", href: "#about" },
                { label: "Services", href: "#services" },
                { label: "Join Our Team", href: "#join" },
                { label: "Contact Us", href: "#contact" },
              ].map((l, i) => (
                <li key={i}>
                  <a
                    href={l.href}
                    className="text-sm hover:text-sky-400 transition-colors inline-flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="sm:col-span-2 lg:col-span-2 lg:pl-8">
            <div className="p-8 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="font-[var(--font-jakarta)] text-lg font-bold text-white mb-3">
                Stay Updated
              </h3>
              <p className="text-sm leading-relaxed mb-6">
                Join our newsletter to receive the latest insights on tech staffing, 
                industry trends, and exclusive recruitment strategies.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required={!subbed}
                  placeholder={subbed ? "Thanks for subscribing!" : "Enter your email address"}
                  className="flex-1 px-4 py-3 bg-slate-900 border border-slate-700 text-white text-sm rounded-md outline-none focus:border-sky-500 placeholder:text-slate-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-sky-500 text-white text-sm font-semibold rounded-md hover:bg-sky-600 transition-colors whitespace-nowrap"
                >
                  Subscribe Now
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>
            &copy; {new Date().getFullYear()} <strong className="text-slate-300 font-medium">HM Tech Staffing</strong>. All Rights Reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
