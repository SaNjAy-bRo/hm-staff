import PageHero from "@/app/components/PageHero";

const categories = [
  {
    title: "Administrative & Clerical",
    icon: "fa-folder-open",
    roles: [
      "Clerks, Secretaries",
      "Customer Service Representatives",
      "Front Desk Executives",
      "Data Entry Specialists",
      "Admin Executives",
    ],
  },
  {
    title: "Accounting & Finance",
    icon: "fa-chart-pie",
    roles: [
      "Controllers, Treasurers",
      "Taxing & Auditing Professionals",
      "Financial Analysts",
      "Accountants",
      "Payroll & Collections",
    ],
  },
  {
    title: "Call Center",
    icon: "fa-headset",
    roles: [
      "Bilingual Support",
      "Help Desk",
      "Product & Technical Support",
      "Telemarketing Sales",
      "Claims & Collections Support",
    ],
  },
  {
    title: "Clinical & Scientific",
    icon: "fa-flask",
    roles: [
      "Clinical Data & Program Managers",
      "Physicians and Medical Monitors",
      "Regulatory Affairs Professionals",
      "Medical Writers & Biologists",
      "Research Associates & Scientists",
      "Lab Technicians & QA/QC",
    ],
  },
  {
    title: "Human Resource",
    icon: "fa-users",
    roles: [
      "HR Management",
      "Talent Acquisition & Retention",
      "Technical & Non-Technical Recruiters",
      "Diversity and Inclusion",
      "Training and Org Development",
      "Employee Relations",
    ],
  },
  {
    title: "Procurement",
    icon: "fa-shopping-cart",
    roles: [
      "Purchasing Management",
      "Supply Chain Management",
      "Vendor Management",
      "Procurement",
      "Contracts",
    ],
  },
  {
    title: "Sales & Marketing",
    icon: "fa-bullhorn",
    roles: [
      "Inside, Outside, Tele-Sales",
      "Sales & Distribution Specialist",
      "Brand & Marketing Managers",
      "Social Media Managers",
      "Product Marketing & Creative",
      "Logistics Specialist",
    ],
  },
  {
    title: "Industrial Staffing",
    icon: "fa-industry",
    roles: [
      "Assemblers & Machine Operators",
      "Fork Lift Operators",
      "Inventory & Maintenance Techs",
      "General Labor & Manufacturing",
      "Material Handler & Packaging",
      "Quality Control Inspector",
    ],
  },
];

export default function ProfessionalStaffing() {
  return (
    <>
      <PageHero title="Professional Staffing" breadcrumb="Services" bgImage="/services-header-bg.png" />

      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-[var(--font-jakarta)] text-3xl font-bold text-slate-900 mb-6">
              Dedicated Recruitment Expertise
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              At HM Tech Staffing solutions as a practice we align dedicated team
              of recruitment expertise who comes with rich experience specifically
              to serve Professional Staffing needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:border-sky-300 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-sky-50 flex items-center justify-center text-sky-500 mb-5">
                  <i className={`fas ${cat.icon} text-lg`}></i>
                </div>
                <h3 className="font-[var(--font-jakarta)] text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3">
                  {cat.title}
                </h3>
                <ul className="space-y-2">
                  {cat.roles.map((role, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-slate-600"
                    >
                      <i className="fas fa-check text-[10px] text-sky-400 mt-1"></i>
                      <span className="leading-tight">{role}</span>
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
