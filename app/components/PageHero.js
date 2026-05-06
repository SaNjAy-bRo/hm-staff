export default function PageHero({ title, breadcrumb, bgImage = "/inner-header-bg.png" }) {
  return (
    <section className="relative pt-[88px] bg-[#9bcde6]">
      {/* Background Image Base */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url('${bgImage}')` }}
      />

      {/* Reduced Gradient Overlay for better image visibility but preserving text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-sky-900/50" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 py-20 lg:py-28 text-center flex flex-col items-center">
        <h1 className="font-[var(--font-jakarta)] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-sm">
          {title}
        </h1>
        <p className="text-sky-100 text-sm font-medium tracking-wider uppercase drop-shadow">
          Home <span className="mx-2 text-sky-400">/</span> {breadcrumb}
        </p>
      </div>
    </section>
  );
}
