import PageHero from "@/app/components/PageHero";

export default function JoinUs() {
  return (
    <>
      <PageHero title="Join Us" breadcrumb="Join Us" />

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-[var(--font-jakarta)] text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Make a Difference with Technology and Innovation
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed italic font-serif">
              &ldquo;We welcome you to join us in making a difference to our society
              with technology and innovation. We offer a great platform for you
              to explore your skills & talent to its highest potential.&rdquo;
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 mt-20">
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-50 rounded-xl p-8 border border-slate-100 flex gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-sky-500 shadow-sm flex-shrink-0">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1 text-lg">
                    HM Tech Staffing
                  </h3>
                  <p className="text-slate-600 text-sm">
                    42 Bedle RD, Hazlet,
                    <br />
                    NJ 07730, USA
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-8 border border-slate-100 flex gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-sky-500 shadow-sm flex-shrink-0">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1 text-lg">
                    Email Us
                  </h3>
                  <a
                    href="mailto:hr@hmtecstaffing.com"
                    className="text-sky-500 hover:text-sky-600 text-sm font-medium transition-colors"
                  >
                    hr@hmtecstaffing.com
                  </a>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-8 border border-slate-100 flex gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-sky-500 shadow-sm flex-shrink-0">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1 text-lg">
                    Call Us
                  </h3>
                  <a
                    href="tel:+17325203214"
                    className="text-slate-600 hover:text-sky-500 text-sm font-medium transition-colors"
                  >
                    +1 (732) 520-3214
                  </a>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-2 bg-white rounded-xl p-8 md:p-10 border border-slate-200 shadow-xl shadow-slate-200/50">
              <h3 className="font-[var(--font-jakarta)] text-2xl font-bold text-slate-900 mb-8">
                Submit Your Application
              </h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-slate-700">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-700">
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-slate-700">
                    Desired Role / Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                    placeholder="e.g. Senior Java Developer Application"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-slate-700">
                    Cover Letter / Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows="6"
                    className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all resize-none"
                    placeholder="Tell us about your experience..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-sky-500 text-white font-semibold py-3.5 rounded-md hover:bg-sky-600 transition-colors shadow-lg shadow-sky-500/30"
                >
                  Send Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
