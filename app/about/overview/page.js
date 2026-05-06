import PageHero from "@/app/components/PageHero";

export default function Overview() {
  return (
    <>
      <PageHero title="Overview" breadcrumb="About Us" bgImage="/about-header-bg.png" />

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg prose-slate max-w-none">
            <h2 className="font-[var(--font-jakarta)] text-3xl font-bold text-slate-900 mb-8">
              Pioneering Best-in-Class Staffing Solutions
            </h2>
            <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
              <p>
                <strong>HM Tech Staffing</strong> is a Central, NJ based staffing
                firm who has pioneered the art of providing staffing solutions
                with utmost ‘Best-in-class’ resources, adding values to staffing
                initiatives of our clients with our commitment towards redefining
                staffing standards from various locations within the United
                States.
              </p>
              <p>
                HM Tech Staffing Solutions offers a complete spectrum of
                end-to-end staffing solutions to global corporations to stay
                ahead in today’s dynamic environment.
              </p>
              <p>
                We create lasting relationships by providing client-centric, high
                quality, cost-effective and uniquely delivered contingent
                workforce management solutions to our customers.
              </p>
              <p>
                HM Tech Staffing implements an integrated approach that is
                aligned with business strategy and provides talents that are
                on-demand. Our talented workforce ranges from freshers or
                beginners to highly experienced candidates coming from diverse
                backgrounds that exceed Customer expectations.
              </p>
              <p>
                Our customized solutions are designed to help every customer to
                have a successful onboarding of the candidates in seamless
                adaption of the company&apos;s environment. The robust
                candidates who possess the talent to handle day-to-day challenges
                of the customer needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
