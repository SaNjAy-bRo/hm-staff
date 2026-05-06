import PageHero from "@/app/components/PageHero";

const platforms = [
  "Artificial Intelligence, Machine Learning",
  "Application Testing",
  "Application Development & Maintenance (ADM)",
  "Business Intelligence, Data Warehousing & Analytics",
  "Big data development and Analytics",
  "Cloud Computing",
  "Client/ Server Application Development",
  "Digital Content Management",
  "ERP Implementation, Maintenance & Support",
  "Network Architecture, Planning, Development, Mobile Applications",
  "Project/ Program Coordinator",
  "Project/ Program Management",
  "Quality Analyst",
  "Statistician/ Functional Analyst",
  "Quality Assurance & Porting",
  "Relational Database Design & Development",
  "Software as a Service (SaaS)",
  "Systems Architecture & Planning",
  "Systems & Application Integration",
  "Web Application & Content Management",
  "Web Design & Development",
];

const categories = [
  {
    title: "Program Management",
    roles: [
      "Agile / Scrum Masters",
      "Product Managers",
      "Program & Project Managers",
      "Enterprise Architects",
      "Business Analysts",
      "System Analysts",
    ],
  },
  {
    title: "Application Development",
    roles: [
      "Architects",
      "Designers & Developers",
      "Programmers",
      "Full Stack Developers",
      "DevOps Engineers",
      "Machine Learning Specialists",
    ],
  },
  {
    title: "Data Management & Analytics",
    roles: [
      "Data Architects",
      "Data Engineers",
      "ETL Experts",
      "Data Scientists",
      "BI Specialists",
      "Data Visualization Experts",
    ],
  },
  {
    title: "Cloud, Cybersecurity & Infrastructure",
    roles: [
      "Network Engineers",
      "System Engineers",
      "Security Engineers",
      "Migration & Support",
      "Virtualization Engineers",
      "Data Center Operators",
    ],
  },
  {
    title: "User Experience",
    roles: [
      "Creative Directors",
      "Art Directors",
      "UX Experts",
      "UI Researchers",
      "UI/UX Designers",
      "Usability Testers",
    ],
  },
  {
    title: "ERP & Platform Experts",
    roles: [
      "SAP",
      "Oracle Applications",
      "Microsoft Dynamics",
      "Salesforce",
      "iOS Platform",
    ],
  },
];

export default function ITStaffing() {
  return (
    <>
      <PageHero title="IT Staffing" breadcrumb="Services" bgImage="/services-header-bg.png" />

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-[var(--font-jakarta)] text-3xl font-bold text-slate-900 mb-6">
              Expertise Across All Major Technology Platforms
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              HM Tech Staffing solutions utilizes best practices and processes to
              stay ahead in this highly competitive Staffing market.
            </p>
          </div>

          <div className="mb-20">
            <div className="flex flex-wrap gap-3 justify-center">
              {platforms.map((p, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:border-sky-300 hover:bg-sky-50 transition-colors"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          <h3 className="font-[var(--font-jakarta)] text-3xl font-bold text-slate-900 mb-10 text-center">
            IT Professionals by Category
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500 mb-6">
                  <i className="fas fa-laptop-code text-lg"></i>
                </div>
                <h4 className="font-[var(--font-jakarta)] text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3">
                  {cat.title}
                </h4>
                <ul className="space-y-3">
                  {cat.roles.map((role, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-3 text-sm text-slate-600"
                    >
                      <i className="fas fa-circle text-[6px] text-sky-400"></i>
                      {role}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
