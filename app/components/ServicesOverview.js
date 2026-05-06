import React from "react";

const services = [
  {
    title: "IT Staffing",
    icon: "fa-laptop-code",
    desc: "Connect with elite technologists across Cloud, Data, AI, and Software Engineering. We deliver candidates who drive innovation.",
  },
  {
    title: "Professional Staffing",
    icon: "fa-user-tie",
    desc: "From Finance and HR to Clinical and Admin, we source dedicated professionals that fit seamlessly into your corporate culture.",
  },
  {
    title: "Flexible Solutions",
    icon: "fa-handshake",
    desc: "Whether you need Contract, Direct Hire, or RPO, our customized staffing models adapt to your exact business requirements.",
  }
];

export default function ServicesOverview() {
  return (
    <section className="py-20 lg:py-32 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sky-500 font-bold tracking-wider uppercase text-sm mb-3">
            Our Expertise
          </h2>
          <h3 className="font-[var(--font-jakarta)] text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Comprehensive Staffing Capabilities
          </h3>
          <p className="text-lg text-slate-600">
            We provide a complete spectrum of end-to-end workforce solutions designed to help global corporations stay ahead in a dynamic environment.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl p-8 md:p-10 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full text-center items-center"
            >
              <div className="w-16 h-16 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-500 mb-6">
                <i className={`fas ${service.icon} text-2xl`}></i>
              </div>
              
              <h4 className="font-[var(--font-jakarta)] text-xl font-bold text-slate-900 mb-4">
                {service.title}
              </h4>
              
              <p className="text-slate-600 leading-relaxed flex-grow">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
