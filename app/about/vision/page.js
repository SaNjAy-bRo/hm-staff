import PageHero from "@/app/components/PageHero";

export default function VisionMission() {
  return (
    <>
      <PageHero title="Vision & Mission" breadcrumb="About Us" bgImage="/about-header-bg.png" />

      <section className="py-20 lg:py-32 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {/* Vision */}
            <div className="bg-white p-10 lg:p-12 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-sky-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <div className="w-14 h-14 rounded-full bg-sky-50 flex items-center justify-center text-sky-500 mb-8">
                <i className="fas fa-eye text-xl"></i>
              </div>
              <h2 className="font-[var(--font-jakarta)] text-3xl font-bold text-slate-900 mb-6">
                Our Vision
              </h2>
              <p className="text-xl leading-relaxed text-slate-600 italic font-serif">
                &ldquo;Bringing Togetherness in Innovation and Technology across
                ethnicities.&rdquo;
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white p-10 lg:p-12 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 mb-8">
                <i className="fas fa-bullseye text-xl"></i>
              </div>
              <h2 className="font-[var(--font-jakarta)] text-3xl font-bold text-slate-900 mb-6">
                Our Mission
              </h2>
              <p className="text-xl leading-relaxed text-slate-600 italic font-serif">
                &ldquo;Help talent find the right place in leading global
                corporations to make a difference in our society with
                innovation.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
