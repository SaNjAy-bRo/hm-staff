"use client";
import { useState } from "react";
import * as XLSX from "xlsx";

export default function DashboardClient({ initialJoinData, initialContactData }) {
  const [activeTab, setActiveTab] = useState("join");

  
  // Filters for Join Us
  const [roleFilter, setRoleFilter] = useState("");
  const [educationFilter, setEducationFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const filteredJoin = initialJoinData.filter(sub => {
    const matchRole = roleFilter === "" || (sub.desiredRole && sub.desiredRole === roleFilter);
    const matchEdu = educationFilter === "" || (sub.education && sub.education === educationFilter);
    const matchSkill = skillFilter === "" || (
      (sub.coreSkills && sub.coreSkills.toLowerCase().includes(skillFilter.toLowerCase())) || 
      (sub.secondarySkills && sub.secondarySkills.toLowerCase().includes(skillFilter.toLowerCase()))
    );
    return matchRole && matchEdu && matchSkill;
  });

  const downloadExcel = () => {
    const dataToExport = activeTab === "join" ? filteredJoin : initialContactData;
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, activeTab === "join" ? "Applications" : "Contacts");
    XLSX.writeFile(workbook, `hmtech_${activeTab}_data.xlsx`);
  };

  return (
    <div>
      <div className="flex space-x-4 mb-8">
        <button 
          onClick={() => setActiveTab("join")}
          className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${activeTab === "join" ? "bg-sky-600 text-white" : "bg-white text-slate-600 hover:bg-slate-100"}`}
        >
          Join Us Applications ({initialJoinData.length})
        </button>
        <button 
          onClick={() => setActiveTab("contact")}
          className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${activeTab === "contact" ? "bg-sky-600 text-white" : "bg-white text-slate-600 hover:bg-slate-100"}`}
        >
          Contact Messages ({initialContactData.length})
        </button>
      </div>

      <div className="mb-4 flex justify-end">
        <button
          onClick={downloadExcel}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
        >
          <i className="fas fa-file-excel"></i> Download Excel
        </button>
      </div>

      {activeTab === "join" && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-slate-50 flex flex-col md:flex-row gap-4 items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">Applications</h2>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <select 
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-2 border border-slate-200 rounded-md outline-none focus:border-sky-500 text-sm w-full md:w-56 bg-white"
              >
                <option value="">All Roles</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="Mobile Developer">Mobile Developer</option>
                <option value="DevOps Engineer">DevOps Engineer</option>
                <option value="Cloud Architect">Cloud Architect</option>
                <option value="QA Engineer">QA Engineer</option>
                <option value="Data Scientist / Engineer">Data Scientist / Engineer</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Business Analyst">Business Analyst</option>
                <option value="System Administrator">System Administrator</option>
                <option value="IT Support / Helpdesk">IT Support / Helpdesk</option>
                <option value="Other">Other</option>
              </select>
              
              <select 
                value={educationFilter}
                onChange={(e) => setEducationFilter(e.target.value)}
                className="px-4 py-2 border border-slate-200 rounded-md outline-none focus:border-sky-500 text-sm w-full md:w-56 bg-white"
              >
                <option value="">All Qualifications</option>
                <option value="High School / GED">High School / GED</option>
                <option value="Associate Degree">Associate Degree</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="Ph.D. / Doctorate">Ph.D. / Doctorate</option>
                <option value="Diploma">Diploma</option>
                <option value="Certification Program">Certification Program</option>
                <option value="Other">Other</option>
              </select>

              <input 
                type="text"
                placeholder="Filter by Skill..."
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
                className="px-4 py-2 border border-slate-200 rounded-md outline-none focus:border-sky-500 text-sm w-full md:w-56 bg-white"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-700 uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">Applicant</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Experience</th>
                  <th className="px-6 py-4">Education</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJoin.map((sub, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{sub.firstName} {sub.lastName}</div>
                      <div className="text-slate-500 text-xs">{sub.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      {sub.desiredRole === "Other" && sub.otherRole ? `Other (${sub.otherRole})` : (sub.desiredRole || "N/A")}
                    </td>
                    <td className="px-6 py-4">{sub.experience} yrs</td>
                    <td className="px-6 py-4">{sub.education || "N/A"}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => setSelectedSubmission({ type: "join", data: sub })} className="text-sky-600 font-medium hover:text-sky-800">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredJoin.length === 0 && (
                  <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">No applications found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "contact" && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-slate-50">
            <h2 className="text-lg font-bold text-slate-800">Contact Messages</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-700 uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">Sender</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {initialContactData.map((sub, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{sub.name}</div>
                      <div className="text-slate-500 text-xs">{sub.email}</div>
                    </td>
                    <td className="px-6 py-4">{sub.subject}</td>
                    <td className="px-6 py-4">{new Date(sub.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => setSelectedSubmission({ type: "contact", data: sub })} className="text-sky-600 font-medium hover:text-sky-800">
                        Read Message
                      </button>
                    </td>
                  </tr>
                ))}
                {initialContactData.length === 0 && (
                  <tr><td colSpan="4" className="px-6 py-8 text-center text-slate-500">No messages found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center sticky top-0 bg-white">
              <h3 className="text-xl font-bold text-slate-900">
                {selectedSubmission.type === "join" ? "Application Details" : "Message Details"}
              </h3>
              <button onClick={() => setSelectedSubmission(null)} className="text-slate-400 hover:text-slate-600">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {selectedSubmission.type === "join" && (
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <h4 className="font-bold text-slate-800 mb-3 border-b pb-2">Personal Details</h4>
                    <p><span className="text-slate-500 w-24 inline-block">Name:</span> {selectedSubmission.data.firstName} {selectedSubmission.data.lastName}</p>
                    <p><span className="text-slate-500 w-24 inline-block">Email:</span> {selectedSubmission.data.email}</p>
                    <p><span className="text-slate-500 w-24 inline-block">Phone:</span> {selectedSubmission.data.phone}</p>
                    <p><span className="text-slate-500 w-24 inline-block">Location:</span> {selectedSubmission.data.location}</p>
                    <p><span className="text-slate-500 w-24 inline-block">Relocate:</span> {selectedSubmission.data.relocate}</p>
                    <p><span className="text-slate-500 w-24 inline-block">Work Auth:</span> {selectedSubmission.data.workAuth}</p>
                    <p><span className="text-slate-500 w-24 inline-block">Needs Visa:</span> {selectedSubmission.data.needSponsorship}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-3 border-b pb-2">Job Preferences</h4>
                    <p><span className="text-slate-500 w-24 inline-block">Role:</span> {selectedSubmission.data.desiredRole === "Other" && selectedSubmission.data.otherRole ? `Other (${selectedSubmission.data.otherRole})` : selectedSubmission.data.desiredRole}</p>
                    <p><span className="text-slate-500 w-24 inline-block">Type:</span> {selectedSubmission.data.employmentType}</p>
                    <p><span className="text-slate-500 w-24 inline-block">Model:</span> {selectedSubmission.data.workModel}</p>
                    <p><span className="text-slate-500 w-24 inline-block">Expected:</span> {selectedSubmission.data.expectedComp}</p>
                    <p><span className="text-slate-500 w-24 inline-block">Notice:</span> {selectedSubmission.data.noticePeriod}</p>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="font-bold text-slate-800 mb-3 border-b pb-2">Professional Profile</h4>
                    <p><span className="text-slate-500 w-32 inline-block">Current Job:</span> {selectedSubmission.data.currentJob} at {selectedSubmission.data.employer}</p>
                    <p><span className="text-slate-500 w-32 inline-block">Experience:</span> {selectedSubmission.data.experience} Years</p>
                    <p><span className="text-slate-500 w-32 inline-block">Education:</span> {selectedSubmission.data.education}</p>
                    <p className="mt-2"><span className="text-slate-500 block mb-1">Core Skills:</span> {selectedSubmission.data.coreSkills}</p>
                    {selectedSubmission.data.secondarySkills && <p className="mt-2"><span className="text-slate-500 block mb-1">Secondary Skills:</span> {selectedSubmission.data.secondarySkills}</p>}
                    
                    <div className="flex gap-4 mt-4">
                      {selectedSubmission.data.linkedin && <a href={selectedSubmission.data.linkedin} target="_blank" className="text-sky-600 hover:underline">LinkedIn <i className="fas fa-external-link-alt text-xs"></i></a>}
                      {selectedSubmission.data.portfolio && <a href={selectedSubmission.data.portfolio} target="_blank" className="text-sky-600 hover:underline">Portfolio <i className="fas fa-external-link-alt text-xs"></i></a>}
                      {selectedSubmission.data.github && <a href={selectedSubmission.data.github} target="_blank" className="text-sky-600 hover:underline">GitHub <i className="fas fa-external-link-alt text-xs"></i></a>}
                    </div>
                  </div>
                  {selectedSubmission.data.coverLetter && (
                    <div className="md:col-span-2">
                      <h4 className="font-bold text-slate-800 mb-3 border-b pb-2">Cover Letter</h4>
                      <p className="whitespace-pre-wrap text-slate-700 bg-slate-50 p-4 rounded-md">{selectedSubmission.data.coverLetter}</p>
                    </div>
                  )}
                  {selectedSubmission.data.resumeUrl && (
                    <div className="md:col-span-2 pt-4 border-t">
                      <a 
                        href={selectedSubmission.data.resumeUrl} 
                        download 
                        className="inline-flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-slate-900 transition-colors"
                      >
                        <i className="fas fa-download"></i> Download Resume
                      </a>
                    </div>
                  )}
                </div>
              )}

              {selectedSubmission.type === "contact" && (
                <div className="space-y-4 text-sm">
                  <p><span className="font-bold text-slate-800 w-24 inline-block">From:</span> {selectedSubmission.data.name} &lt;{selectedSubmission.data.email}&gt;</p>
                  <p><span className="font-bold text-slate-800 w-24 inline-block">Subject:</span> {selectedSubmission.data.subject}</p>
                  <p><span className="font-bold text-slate-800 w-24 inline-block">Date:</span> {new Date(selectedSubmission.data.createdAt).toLocaleString()}</p>
                  
                  <div className="mt-6">
                    <h4 className="font-bold text-slate-800 mb-2">Message:</h4>
                    <p className="whitespace-pre-wrap text-slate-700 bg-slate-50 p-6 rounded-lg border border-slate-100 leading-relaxed">
                      {selectedSubmission.data.message}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
