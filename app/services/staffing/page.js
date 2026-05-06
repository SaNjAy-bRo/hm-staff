import PageHero from "@/app/components/PageHero";

const solutions = [
  "Contract Staffing",
  "Direct Hire",
  "Contract-to-Hire",
  "Executive Search",
  "Payroll Services",
  "Statement of Work",
  "Time & Material",
  "Recruitment Process Outsourcing (RPO)",
];

export default function StaffingSolutions() {
  return (
    <>
      <PageHero title="Staffing Solutions" breadcrumb="Services" bgImage="/services-header-bg.png" />

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg prose-slate max-w-none">
            <h2 className="font-[var(--font-jakarta)] text-3xl font-bold text-slate-900 mb-8">
              Customized Solutions for Your Business Needs
            </h2>
            <div className="space-y-6 text-slate-600 leading-relaxed text-lg mb-12">
              <p>
                HM Tech Staffing has mastered the art of providing customized
                staffing solutions to match your business needs. Our team of
                expertise can find you skilled workforce along with right talent
                that define a candidate for a job role. We bring the right talent
                to suits your business requirements that could be small, mid or
                large enterprises based on your project needs either short or long
                term across different sectors.
              </p>
              <p>
                We are a highly reliable staffing firm who hold ourselves with a
                great degree of professionalism, integrity, sincerity and
                accuracy.
              </p>
              <p>
                We deliver expertise based on your business needs varying from
                fresher to highly experienced talent. Our highly trained and
                qualified team of professionals strive to consistently exceed
                expectations of our clients by delivering highly talented
                workforce.
              </p>
              <p>
                HM Tech Staffing has pioneered in creating business impacts for
                our clients matching their business needs with best talent
                available in the market that results in getting the right
                resource with cost efficiency. Our highly committed and dedicated
                team of professionals bring you the best candidates specifically
                intended to suit your desired qualified applicants.
              </p>
              <p>
                We offer a wide range of staffing solutions to global
                corporations for their IT & Non IT staffing needs. We are not
                only committed to serve you as a valuable supplier but also be a
                strategic partner in helping you grow your business manifold.
              </p>
            </div>

            <h3 className="font-[var(--font-jakarta)] text-2xl font-bold text-slate-900 mb-6">
              Our array of staffing solutions include:
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {solutions.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-check text-sm"></i>
                  </div>
                  <span className="font-semibold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
