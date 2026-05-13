"use client";
import { useState } from "react";
import PageHero from "@/app/components/PageHero";

export default function JoinUs() {
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.target);

    // Client-side validation
    const file = formData.get("resume");
    if (file && file.size > 10 * 1024 * 1024) { // 10MB limit
      setStatus("error");
      alert("Resume file size exceeds 10MB limit. Please upload a smaller file.");
      return;
    }

    try {
      const response = await fetch("/api/submissions/join", {
        method: "POST",
        body: formData, // Sending FormData directly for file upload
      });

      if (response.ok) {
        setStatus("success");
        e.target.reset();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  };

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

          <div className="max-w-5xl mx-auto">
            {status === "success" && (
              <div className="mb-8 p-6 rounded-xl bg-green-50 border border-green-200 text-center shadow-sm">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  <i className="fas fa-check"></i>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">Application Submitted Successfully!</h3>
                <p className="text-green-700">Thank you for your interest. Our HR team will review your application and get back to you soon.</p>
              </div>
            )}
            {status === "error" && (
              <div className="mb-8 p-6 rounded-xl bg-red-50 border border-red-200 text-center shadow-sm">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  <i className="fas fa-times"></i>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-2">Submission Failed</h3>
                <p className="text-red-700">Oops! Something went wrong while submitting your application. Please try again.</p>
              </div>
            )}

            <div className="bg-white rounded-2xl p-8 md:p-12 border border-slate-200 shadow-xl shadow-slate-200/50">
              <h3 className="font-[var(--font-jakarta)] text-2xl font-bold text-slate-900 mb-2">
                Submit Your Application
              </h3>
              <p className="text-slate-500 mb-8 pb-8 border-b border-slate-100">Please fill out all the required fields accurately to help us evaluate your profile better.</p>

              <form className="space-y-12" onSubmit={handleSubmit}>
                
                {/* 1. Personal & Contact Details */}
                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-sm">1</span>
                    Personal & Contact Details
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">First Name <span className="text-red-500">*</span></label>
                      <input name="firstName" type="text" required className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Last Name <span className="text-red-500">*</span></label>
                      <input name="lastName" type="text" required className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Email Address <span className="text-red-500">*</span></label>
                      <input name="email" type="email" required className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Phone Number <span className="text-red-500">*</span></label>
                      <input name="phone" type="tel" pattern="[0-9\-\+\s\(\)]*" title="Please enter a valid phone number" required className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-slate-700">Current Location (City, State, Country, Zip Code) <span className="text-red-500">*</span></label>
                      <input name="location" type="text" required className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Willingness to Relocate? <span className="text-red-500">*</span></label>
                      <select name="relocate" required className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all">
                        <option value="">Select option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Negotiable">Negotiable</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Work Authorization Status <span className="text-red-500">*</span></label>
                      <select name="workAuth" required className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all">
                        <option value="">Select status</option>
                        <option value="Citizen">Citizen</option>
                        <option value="Permanent Resident">Permanent Resident</option>
                        <option value="H1B">H1B</option>
                        <option value="Require Sponsorship">Require Sponsorship</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-3 md:col-span-2 bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <label className="text-sm font-medium text-slate-800">I will need a sponsorship visa from HMTEC Staffing, now or in the future, to work as a W2 employee. <span className="text-red-500">*</span></label>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="needSponsorship" value="Yes" required className="w-4 h-4 text-sky-600" />
                          <span className="text-sm text-slate-700">Yes</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="needSponsorship" value="No" required className="w-4 h-4 text-sky-600" />
                          <span className="text-sm text-slate-700">No</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Professional Profiles & Links */}
                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-sm">2</span>
                    Professional Profiles & Links
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">LinkedIn Profile URL</label>
                      <input name="linkedin" type="url" placeholder="https://linkedin.com/in/..." className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Personal Website / Portfolio URL</label>
                      <input name="portfolio" type="url" placeholder="https://..." className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">GitHub / GitLab URL (Crucial for developers)</label>
                      <input name="github" type="url" placeholder="https://github.com/..." className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Other Tech Profiles (e.g. HackerRank, LeetCode)</label>
                      <input name="otherProfiles" type="text" className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all" />
                    </div>
                  </div>
                </div>

                {/* 3. Career Profile & Qualifications */}
                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-sm">3</span>
                    Career Profile & Qualifications
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Current Job Title <span className="text-red-500">*</span></label>
                      <input name="currentJob" type="text" required className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Current/Most Recent Employer</label>
                      <input name="employer" type="text" className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Total Years of Experience <span className="text-red-500">*</span></label>
                      <input name="experience" type="number" step="0.1" required className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Highest Level of Education <span className="text-red-500">*</span></label>
                      <input name="education" type="text" placeholder="Degree, Major, Institution" required className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-slate-700">Primary Core Skills & Technologies <span className="text-red-500">*</span></label>
                      <textarea name="coreSkills" rows="2" placeholder="e.g. React, Node.js, Python, AWS" required className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all resize-none"></textarea>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-slate-700">Secondary/Supporting Skills</label>
                      <input name="secondarySkills" type="text" className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-slate-700">Relevant Certifications (e.g. AWS Certified, PMP)</label>
                      <input name="certifications" type="text" className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all" />
                    </div>
                  </div>
                </div>

                {/* 4. Job Preferences & Requirements */}
                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-sm">4</span>
                    Job Preferences & Requirements
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Desired Role / Job Title <span className="text-red-500">*</span></label>
                      <input name="desiredRole" type="text" required className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Expected Compensation / Hourly Rate <span className="text-red-500">*</span></label>
                      <input name="expectedComp" type="text" required className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Preferred Employment Type <span className="text-red-500">*</span></label>
                      <select name="employmentType" required className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all">
                        <option value="">Select type</option>
                        <option value="Full-Time">Full-Time</option>
                        <option value="W2 Contract">W2 Contract</option>
                        <option value="C2C">C2C</option>
                        <option value="Contract-to-Hire">Contract-to-Hire</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Preferred Work Model <span className="text-red-500">*</span></label>
                      <select name="workModel" required className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all">
                        <option value="">Select model</option>
                        <option value="100% Remote">100% Remote</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="On-site">On-site</option>
                      </select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-slate-700">Notice Period / Availability to Start <span className="text-red-500">*</span></label>
                      <input name="noticePeriod" type="text" placeholder="e.g. Immediate, 2 Weeks" required className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all" />
                    </div>
                  </div>
                </div>

                {/* 5. Application Documents */}
                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-sm">5</span>
                    Application Documents
                  </h4>
                  <div className="grid gap-6">
                    <div className="space-y-2 p-6 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                      <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        <i className="fas fa-file-upload text-sky-500"></i>
                        Upload your resume <span className="text-red-500">*</span>
                      </label>
                      <p className="text-xs text-slate-500 mb-3">Accepted file types: pdf, doc, docx, rtf, odt, or txt. Max size 10 MB</p>
                      <input 
                        name="resume" 
                        type="file" 
                        accept=".pdf,.doc,.docx,.rtf,.odt,.txt" 
                        required 
                        className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 cursor-pointer text-sm text-slate-600" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Cover Letter (Optional)</label>
                      <textarea name="coverLetter" rows="4" className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all resize-none" placeholder="Share why you are a great fit..."></textarea>
                    </div>
                  </div>
                </div>

                {/* 6. Compliance & Agreements */}
                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-sm">6</span>
                    Compliance & Agreements
                  </h4>
                  <div className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-100">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" name="consent" required className="mt-1 w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500" />
                      <span className="text-sm text-slate-700 leading-relaxed">
                        I consent to the processing of my personal data for recruitment purposes and agree to the Privacy Policy. <span className="text-red-500">*</span>
                      </span>
                    </label>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full bg-sky-500 text-white font-bold text-lg py-4 rounded-xl hover:bg-sky-600 transition-colors shadow-lg shadow-sky-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? (
                      <span className="flex items-center justify-center gap-2">
                        <i className="fas fa-spinner fa-spin"></i> Submitting Application...
                      </span>
                    ) : "Submit Application"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
