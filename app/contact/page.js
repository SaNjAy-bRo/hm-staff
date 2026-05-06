import PageHero from "@/app/components/PageHero";

export default function ContactUs() {
  return (
    <>
      <PageHero title="Contact Us" breadcrumb="Contact Us" />

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Top Info Boxes */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-slate-50 rounded-xl p-8 border border-slate-100 flex flex-col items-center text-center hover:border-sky-200 hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-sky-500 shadow-sm mb-4">
                <i className="fas fa-map-marker-alt text-xl"></i>
              </div>
              <h3 className="font-bold text-slate-900 mb-2 text-lg">
                HM Tech Staffing
              </h3>
              <p className="text-slate-600 text-sm">
                42 Bedle RD, Hazlet,<br />NJ 07730, USA
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-8 border border-slate-100 flex flex-col items-center text-center hover:border-sky-200 hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-sky-500 shadow-sm mb-4">
                <i className="fas fa-envelope text-xl"></i>
              </div>
              <h3 className="font-bold text-slate-900 mb-2 text-lg">
                Email Us
              </h3>
              <a
                href="mailto:hr@hmtecstaffing.com"
                className="text-sky-500 hover:text-sky-600 text-sm font-medium"
              >
                hr@hmtecstaffing.com
              </a>
            </div>

            <div className="bg-slate-50 rounded-xl p-8 border border-slate-100 flex flex-col items-center text-center hover:border-sky-200 hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-sky-500 shadow-sm mb-4">
                <i className="fas fa-phone-alt text-xl"></i>
              </div>
              <h3 className="font-bold text-slate-900 mb-2 text-lg">
                Call Us
              </h3>
              <a
                href="tel:+17325203214"
                className="text-slate-600 hover:text-sky-500 text-sm font-medium"
              >
                +1 (732) 520-3214
              </a>
            </div>
          </div>

          {/* Map and Form */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Google Map */}
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.4421268564643!2d-74.19671038506675!3d40.4212078632919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2335d87ee4bc3%3A0xea6c8f5d4eb9ecba!2s42%20Bedle%20Rd%2C%20Hazlet%2C%20NJ%2007730%2C%20USA!5e0!3m2!1sen!2sin!4v1636992621650!5m2!1sen!2sin"
                className="w-full h-full min-h-[400px]"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="HM Tech Staffing Office Location"
              ></iframe>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl p-8 md:p-10 border border-slate-200 shadow-xl shadow-slate-200/50">
              <h3 className="font-[var(--font-jakarta)] text-2xl font-bold text-slate-900 mb-8">
                Send Us a Message
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
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-slate-700">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all resize-none"
                    placeholder="Type your message here..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-sky-500 text-white font-semibold py-3.5 rounded-md hover:bg-sky-600 transition-colors shadow-lg shadow-sky-500/30"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
