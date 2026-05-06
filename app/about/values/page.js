import PageHero from "@/app/components/PageHero";

const values = [
  {
    title: "Commitment",
    icon: "fa-handshake",
    desc: "We are dedicated to delivering on our promises and building long-lasting relationships with our clients and candidates.",
  },
  {
    title: "Passion",
    icon: "fa-heart",
    desc: "We approach every staffing challenge with enthusiasm and a drive to find the perfect match.",
  },
  {
    title: "Excellence",
    icon: "fa-star",
    desc: "We strive for the highest quality in our service, our candidates, and our daily operations.",
  },
  {
    title: "Integrity",
    icon: "fa-shield-alt",
    desc: "We operate with honesty and strong moral principles in all our business practices.",
  },
  {
    title: "Transparency",
    icon: "fa-search",
    desc: "We believe in open, clear communication with everyone we work with.",
  },
];

export default function CoreValues() {
  return (
    <>
      <PageHero title="Core Values" breadcrumb="About Us" bgImage="/about-header-bg.png" />

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-[var(--font-jakarta)] text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Our Foundation for Success
            </h2>
            <p className="text-lg text-slate-600">
              At HM Tech Staffing, our core values aren&apos;t just words on a page —
              they are the principles that guide every decision we make and every
              relationship we build.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-xl p-8 border border-slate-100 hover:border-sky-200 hover:shadow-lg hover:shadow-sky-500/5 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-sky-500 mb-6 group-hover:bg-sky-500 group-hover:text-white group-hover:border-sky-500 transition-colors shadow-sm">
                  <i className={`fas ${v.icon} text-xl`}></i>
                </div>
                <h3 className="font-[var(--font-jakarta)] text-xl font-bold text-slate-900 mb-3">
                  {v.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
