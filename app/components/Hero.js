import Image from "next/image";

export default function Hero() {
  return (
    <section id="home" className="relative flex flex-col bg-[#9bcde6]">
      {/* Top section with full-cover image */}
      <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px]">
        <Image
          src="/hero-cutout.png"
          alt="Diverse professional workforce"
          fill
          priority
          className="object-cover object-[center_25%]"
        />
        {/* Subtle dark gradient at the very top so the white navbar text is always readable */}
        <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Bottom text banner with gradient */}
      <div className="relative bg-gradient-to-r from-sky-400 to-sky-500 py-12 lg:py-16 px-6 shadow-inner z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-[var(--font-jakarta)] text-2xl sm:text-3xl lg:text-4xl font-bold text-white italic leading-snug mb-4 tracking-wide shadow-sm">
            Cutting Edge In Innovation And Technology With Diverse Workforce
          </h1>
          <p className="text-sky-50 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed font-medium">
            <strong className="text-white">HM Tech Staffing</strong> provides a
            complete spectrum of end-to-end staffing services for global
            corporations to stay ahead in today&apos;s dynamic environment.
          </p>
        </div>
      </div>
    </section>
  );
}
