export default function About() {
  return (
    <section id="about" className="py-12 lg:py-16 bg-white relative">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-600 font-semibold text-[13px] mb-4 border border-sky-100 shadow-sm">
          <i className="fas fa-building text-[10px]"></i>
          Who We Are
        </div>
        
        <h2 className="font-[var(--font-jakarta)] text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight">
          Strategic Staffing Aligned With <span className="text-sky-500">Your Business</span>
        </h2>
        
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto font-light">
          We take an integrated approach to recruitment, delivering on-demand talent 
          tailored to your unique strategic goals. From promising entry-level candidates 
          to highly experienced professionals, our diverse workforce is carefully selected 
          to not just meet, but consistently <strong className="font-semibold text-slate-800">exceed customer expectations.</strong>
        </p>
      </div>
    </section>
  );
}
