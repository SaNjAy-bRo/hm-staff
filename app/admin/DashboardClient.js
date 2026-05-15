"use client";
import { useState, useMemo } from "react";
import * as XLSX from "xlsx";
import Pagination from "./Pagination";
import JoinFormModal from "./JoinFormModal";
import ContactFormModal from "./ContactFormModal";

const PER_PAGE = 8;

export default function DashboardClient({ initialJoinData, initialContactData }) {
  const [activeTab, setActiveTab] = useState("join");
  const [joinData, setJoinData] = useState(initialJoinData);
  const [contactData, setContactData] = useState(initialContactData);

  // Filters
  const [roleFilter, setRoleFilter] = useState("");
  const [educationFilter, setEducationFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");

  // Pagination
  const [joinPage, setJoinPage] = useState(1);
  const [contactPage, setContactPage] = useState(1);

  // Modals
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [formModal, setFormModal] = useState(null); // { type, data? }
  const [deleteConfirm, setDeleteConfirm] = useState(null); // { type, id, name }
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Refresh data from server
  const refreshData = async () => {
    try {
      const res = await fetch("/api/admin/submissions");
      if (res.ok) {
        const d = await res.json();
        setJoinData(d.joinSubmissions);
        setContactData(d.contactSubmissions);
      }
    } catch (e) { console.error(e); }
  };

  // Unique skills for auto-suggestion
  const uniqueSkills = useMemo(() => Array.from(new Set(
    joinData.flatMap(sub => {
      const skills = [];
      if (sub.coreSkills) skills.push(...sub.coreSkills.split(',').map(s => s.trim()).filter(Boolean));
      if (sub.secondarySkills) skills.push(...sub.secondarySkills.split(',').map(s => s.trim()).filter(Boolean));
      return skills;
    })
  )).sort((a, b) => a.localeCompare(b)), [joinData]);

  // Filtered join data
  const filteredJoin = useMemo(() => joinData.filter(sub => {
    const matchRole = roleFilter === "" || (sub.desiredRole && sub.desiredRole === roleFilter);
    const matchEdu = educationFilter === "" || (sub.education && sub.education === educationFilter);
    const matchSkill = skillFilter === "" || (
      (sub.coreSkills && sub.coreSkills.toLowerCase().includes(skillFilter.toLowerCase())) ||
      (sub.secondarySkills && sub.secondarySkills.toLowerCase().includes(skillFilter.toLowerCase()))
    );
    return matchRole && matchEdu && matchSkill;
  }), [joinData, roleFilter, educationFilter, skillFilter]);

  // Paginated slices
  const joinTotalPages = Math.max(1, Math.ceil(filteredJoin.length / PER_PAGE));
  const paginatedJoin = filteredJoin.slice((joinPage - 1) * PER_PAGE, joinPage * PER_PAGE);
  const contactTotalPages = Math.max(1, Math.ceil(contactData.length / PER_PAGE));
  const paginatedContact = contactData.slice((contactPage - 1) * PER_PAGE, contactPage * PER_PAGE);

  // Reset page when filters change
  const setRoleFilterAndReset = v => { setRoleFilter(v); setJoinPage(1); };
  const setEduFilterAndReset = v => { setEducationFilter(v); setJoinPage(1); };
  const setSkillFilterAndReset = v => { setSkillFilter(v); setJoinPage(1); };

  // Download Excel
  const downloadExcel = () => {
    const dataToExport = activeTab === "join" ? filteredJoin : contactData;
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, activeTab === "join" ? "Applications" : "Contacts");
    XLSX.writeFile(workbook, `hmtech_${activeTab}_data.xlsx`);
  };

  // CRUD handlers
  const handleSaveJoin = async (formData, isEdit) => {
    const url = "/api/admin/submissions";
    const method = isEdit ? "PUT" : "POST";
    const body = isEdit
      ? { type: "join", id: formData.id, data: formData }
      : { type: "join", data: formData };
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) {
      await refreshData();
      setFormModal(null);
      showToast(isEdit ? "Application updated!" : "Application added!");
    } else { showToast("Failed to save", "error"); }
  };

  const handleSaveContact = async (formData, isEdit) => {
    const url = "/api/admin/submissions";
    const method = isEdit ? "PUT" : "POST";
    const body = isEdit
      ? { type: "contact", id: formData.id, data: formData }
      : { type: "contact", data: formData };
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) {
      await refreshData();
      setFormModal(null);
      showToast(isEdit ? "Message updated!" : "Message added!");
    } else { showToast("Failed to save", "error"); }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    const res = await fetch("/api/admin/submissions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: deleteConfirm.type, id: deleteConfirm.id }),
    });
    if (res.ok) {
      await refreshData();
      setDeleteConfirm(null);
      showToast("Deleted successfully!");
    } else { showToast("Failed to delete", "error"); }
  };

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[60] px-5 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all ${toast.type === "error" ? "bg-red-500" : "bg-emerald-500"}`}>
          {toast.msg}
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex space-x-3">
          <button onClick={() => setActiveTab("join")} className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${activeTab === "join" ? "bg-sky-600 text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"}`}>
            Applications ({joinData.length})
          </button>
          <button onClick={() => setActiveTab("contact")} className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${activeTab === "contact" ? "bg-sky-600 text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"}`}>
            Messages ({contactData.length})
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setFormModal({ type: activeTab })} className="flex items-center gap-2 px-4 py-2.5 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 transition-colors shadow-sm">
            <span className="text-lg leading-none">+</span> Add {activeTab === "join" ? "Application" : "Message"}
          </button>
          <button onClick={downloadExcel} className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors shadow-sm">
            <i className="fas fa-file-excel"></i> Excel
          </button>
        </div>
      </div>

      {/* JOIN TAB */}
      {activeTab === "join" && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-200 bg-slate-50 flex flex-col md:flex-row gap-4 items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">Applications <span className="text-sm font-normal text-slate-400">({filteredJoin.length} results)</span></h2>
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <select value={roleFilter} onChange={e => setRoleFilterAndReset(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-md text-sm w-full md:w-48 bg-white outline-none focus:border-sky-500">
                <option value="">All Roles</option>
                {["Frontend Developer","Backend Developer","Full Stack Developer","Mobile Developer","DevOps Engineer","Cloud Architect","QA Engineer","Data Scientist / Engineer","UI/UX Designer","Product Manager","Business Analyst","System Administrator","IT Support / Helpdesk","Other"].map(r=><option key={r} value={r}>{r}</option>)}
              </select>
              <select value={educationFilter} onChange={e => setEduFilterAndReset(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-md text-sm w-full md:w-48 bg-white outline-none focus:border-sky-500">
                <option value="">All Qualifications</option>
                {["High School / GED","Associate Degree","Bachelor's Degree","Master's Degree","Ph.D. / Doctorate","Diploma","Certification Program","Other"].map(e=><option key={e} value={e}>{e}</option>)}
              </select>
              <div className="relative w-full md:w-48">
                <input type="text" list="skills-list" placeholder="Filter by Skill..." value={skillFilter} onChange={e => setSkillFilterAndReset(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-md text-sm w-full bg-white outline-none focus:border-sky-500"/>
                <datalist id="skills-list">{uniqueSkills.map(s=><option key={s} value={s}/>)}</datalist>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-xs">
                <tr>
                  <th className="px-6 py-3">Applicant</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Exp</th>
                  <th className="px-6 py-3">Education</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedJoin.map((sub) => (
                  <tr key={sub.id} className="border-b border-slate-100 hover:bg-sky-50/40 transition-colors">
                    <td className="px-6 py-3">
                      <div className="font-medium text-slate-900">{sub.firstName} {sub.lastName}</div>
                      <div className="text-slate-400 text-xs">{sub.email}</div>
                    </td>
                    <td className="px-6 py-3">{sub.desiredRole === "Other" && sub.otherRole ? `Other (${sub.otherRole})` : (sub.desiredRole || "N/A")}</td>
                    <td className="px-6 py-3">{sub.experience} yrs</td>
                    <td className="px-6 py-3">{sub.education || "N/A"}</td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setSelectedSubmission({ type: "join", data: sub })} className="text-sky-600 hover:text-sky-800 px-2 py-1 rounded hover:bg-sky-50" title="View">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button onClick={() => setFormModal({ type: "join", data: sub })} className="text-amber-600 hover:text-amber-800 px-2 py-1 rounded hover:bg-amber-50" title="Edit">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button onClick={() => setDeleteConfirm({ type: "join", id: sub.id, name: `${sub.firstName} ${sub.lastName}` })} className="text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50" title="Delete">
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {paginatedJoin.length === 0 && (
                  <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-400">No applications found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination currentPage={joinPage} totalPages={joinTotalPages} onPageChange={setJoinPage}/>
        </div>
      )}

      {/* CONTACT TAB */}
      {activeTab === "contact" && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-200 bg-slate-50">
            <h2 className="text-lg font-bold text-slate-800">Contact Messages <span className="text-sm font-normal text-slate-400">({contactData.length} total)</span></h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-xs">
                <tr>
                  <th className="px-6 py-3">Sender</th>
                  <th className="px-6 py-3">Subject</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedContact.map((sub) => (
                  <tr key={sub.id} className="border-b border-slate-100 hover:bg-sky-50/40 transition-colors">
                    <td className="px-6 py-3">
                      <div className="font-medium text-slate-900">{sub.name}</div>
                      <div className="text-slate-400 text-xs">{sub.email}</div>
                    </td>
                    <td className="px-6 py-3">{sub.subject}</td>
                    <td className="px-6 py-3">{new Date(sub.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setSelectedSubmission({ type: "contact", data: sub })} className="text-sky-600 hover:text-sky-800 px-2 py-1 rounded hover:bg-sky-50" title="View">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button onClick={() => setFormModal({ type: "contact", data: sub })} className="text-amber-600 hover:text-amber-800 px-2 py-1 rounded hover:bg-amber-50" title="Edit">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button onClick={() => setDeleteConfirm({ type: "contact", id: sub.id, name: sub.name })} className="text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50" title="Delete">
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {paginatedContact.length === 0 && (
                  <tr><td colSpan="4" className="px-6 py-8 text-center text-slate-400">No messages found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination currentPage={contactPage} totalPages={contactTotalPages} onPageChange={setContactPage}/>
        </div>
      )}

      {/* VIEW DETAIL MODAL */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedSubmission(null)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-5 border-b border-slate-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold text-slate-900">
                {selectedSubmission.type === "join" ? "Application Details" : "Message Details"}
              </h3>
              <button onClick={() => setSelectedSubmission(null)} className="text-slate-400 hover:text-slate-600 text-xl">&times;</button>
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
                      <a href={selectedSubmission.data.resumeUrl} download className="inline-flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-slate-900 transition-colors">
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
                    <p className="whitespace-pre-wrap text-slate-700 bg-slate-50 p-6 rounded-lg border border-slate-100 leading-relaxed">{selectedSubmission.data.message}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ADD/EDIT MODALS */}
      {formModal && formModal.type === "join" && (
        <JoinFormModal submission={formModal.data || null} onClose={() => setFormModal(null)} onSave={handleSaveJoin}/>
      )}
      {formModal && formModal.type === "contact" && (
        <ContactFormModal submission={formModal.data || null} onClose={() => setFormModal(null)} onSave={handleSaveContact}/>
      )}

      {/* DELETE CONFIRMATION */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[55] flex items-center justify-center bg-black/50 p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 text-center" onClick={e => e.stopPropagation()}>
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-trash-alt text-red-500 text-xl"></i>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Submission?</h3>
            <p className="text-sm text-slate-500 mb-6">Are you sure you want to delete <strong>{deleteConfirm.name}</strong>? This cannot be undone.</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="px-5 py-2.5 text-sm font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">Cancel</button>
              <button onClick={handleDelete} className="px-5 py-2.5 text-sm font-medium rounded-lg bg-red-500 text-white hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
