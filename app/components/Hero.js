import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="home" className="relative flex items-center justify-center min-h-[100dvh] pt-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/office-bg.png"
          alt="Modern Corporate Office Background"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Proper dark overlay so text is readable */}
        <div className="absolute inset-0 bg-[#0a0f1c]/75 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        
        {/* Main Heading */}
        <h1 className="font-[var(--font-jakarta)] text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 drop-shadow-sm">
          Strategic Staffing For <br className="hidden md:block"/>
          <span className="text-blue-400">Global Innovators</span>
        </h1>
        
        {/* 2-line subheading */}
        <p className="text-base sm:text-lg lg:text-xl text-slate-200 max-w-4xl w-[95%] mx-auto font-light leading-relaxed mb-10 drop-shadow-sm" style={{ textWrap: 'balance' }}>
          We provide an elite spectrum of end-to-end workforce solutions, accelerating global corporations in today&apos;s dynamic environment. Partner with us to secure top 1% tech talent that drives real impact.
        </p>
        
        {/* Centered Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-5 justify-center w-full">
          <Link 
            href="/about/overview" 
            className="px-8 py-4 w-full sm:w-auto min-w-[220px] rounded-md bg-blue-600 text-white font-semibold tracking-wide hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20 text-center"
          >
            Discover Our Expertise
          </Link>
          
          <button 
            type="button"
            className="px-8 py-4 w-full sm:w-auto min-w-[220px] rounded-md bg-white/10 text-white font-semibold tracking-wide border border-white/20 hover:bg-white/20 hover:border-white/30 backdrop-blur-md transition-colors text-center shadow-lg"
          >
            Explore Opportunities
          </button>
        </div>
      </div>
    </section>
  );
}
