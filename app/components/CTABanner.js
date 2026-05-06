import Image from "next/image";

export default function CTABanner() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden flex items-center justify-center">
      {/* Background image */}
      <Image
        src="/cta-corporate.png"
        alt="Corporate office background"
        fill
        className="object-cover object-center"
        priority
      />
      {/* Deep corporate navy overlay */}
      <div className="absolute inset-0 bg-[#0f172a]/85 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-[var(--font-jakarta)] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Inspiring Recruitment Solutions
        </h2>
        <p className="text-slate-300 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Ready to transform your workforce? Partner with us to find the exceptional talent that will drive your company forward.
        </p>
        <a
          href="#contact"
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-sm bg-sky-500 text-white font-semibold text-sm uppercase tracking-wider hover:bg-white hover:text-slate-900 transition-all duration-300 shadow-lg shadow-sky-500/20"
        >
          Partner With Us
          <i className="fas fa-arrow-right text-xs"></i>
        </a>
      </div>
    </section>
  );
}
