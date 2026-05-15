"use client";
import { useState } from "react";

const ROLES = ["Frontend Developer","Backend Developer","Full Stack Developer","Mobile Developer","DevOps Engineer","Cloud Architect","QA Engineer","Data Scientist / Engineer","UI/UX Designer","Product Manager","Business Analyst","System Administrator","IT Support / Helpdesk","Other"];
const EDUCATION = ["High School / GED","Associate Degree","Bachelor's Degree","Master's Degree","Ph.D. / Doctorate","Diploma","Certification Program","Other"];

export default function JoinFormModal({ submission, onClose, onSave }) {
  const isEdit = !!submission;
  const [form, setForm] = useState(submission || {
    firstName:"",lastName:"",email:"",phone:"",location:"",relocate:"No",workAuth:"Citizen",needSponsorship:"No",
    desiredRole:"Frontend Developer",otherRole:"",employmentType:"Full-Time",workModel:"Remote",expectedComp:"",noticePeriod:"",
    currentJob:"",employer:"",experience:"",education:"Bachelor's Degree",coreSkills:"",secondarySkills:"",
    linkedin:"",portfolio:"",github:"",coverLetter:""
  });
  const [saving, setSaving] = useState(false);

  const set = (k,v) => setForm(p => ({...p,[k]:v}));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try { await onSave(form, isEdit); } finally { setSaving(false); }
  };

  const Field = ({label,name,type="text",required}) => (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1">{label}{required&&<span className="text-red-500">*</span>}</label>
      <input type={type} value={form[name]||""} onChange={e=>set(name,e.target.value)} required={required} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"/>
    </div>
  );

  const Select = ({label,name,options,required}) => (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1">{label}{required&&<span className="text-red-500">*</span>}</label>
      <select value={form[name]||""} onChange={e=>set(name,e.target.value)} required={required} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-sky-500 outline-none bg-white">
        {options.map(o=><option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={e=>e.stopPropagation()}>
        <div className="p-5 border-b border-slate-200 flex justify-between items-center sticky top-0 bg-white z-10">
          <h3 className="text-lg font-bold text-slate-900">{isEdit?"Edit Application":"Add Application"}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="First Name" name="firstName" required/>
            <Field label="Last Name" name="lastName" required/>
            <Field label="Email" name="email" type="email" required/>
            <Field label="Phone" name="phone" required/>
            <Field label="Location" name="location" required/>
            <Select label="Relocate?" name="relocate" options={["Yes","No"]}/>
            <Select label="Work Auth" name="workAuth" options={["Citizen","Green Card","H1B","EAD","Other"]}/>
            <Select label="Needs Visa Sponsorship?" name="needSponsorship" options={["Yes","No"]}/>
          </div>
          <hr className="border-slate-200"/>
          <div className="grid md:grid-cols-2 gap-4">
            <Select label="Desired Role" name="desiredRole" options={ROLES} required/>
            {form.desiredRole==="Other"&&<Field label="Specify Role" name="otherRole"/>}
            <Select label="Employment Type" name="employmentType" options={["Full-Time","Part-Time","Contract","Contract-to-Hire"]}/>
            <Select label="Work Model" name="workModel" options={["Remote","On-site","Hybrid"]}/>
            <Field label="Expected Compensation" name="expectedComp"/>
            <Field label="Notice Period" name="noticePeriod"/>
          </div>
          <hr className="border-slate-200"/>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Current Job Title" name="currentJob"/>
            <Field label="Current Employer" name="employer"/>
            <Field label="Experience (years)" name="experience" type="number"/>
            <Select label="Education" name="education" options={EDUCATION} required/>
          </div>
          <Field label="Core Skills (comma separated)" name="coreSkills" required/>
          <Field label="Secondary Skills (comma separated)" name="secondarySkills"/>
          <div className="grid md:grid-cols-3 gap-4">
            <Field label="LinkedIn URL" name="linkedin"/>
            <Field label="Portfolio URL" name="portfolio"/>
            <Field label="GitHub URL" name="github"/>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Cover Letter</label>
            <textarea value={form.coverLetter||""} onChange={e=>set("coverLetter",e.target.value)} rows={3} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-sky-500 outline-none"/>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">Cancel</button>
            <button type="submit" disabled={saving} className="px-5 py-2.5 text-sm font-medium rounded-lg bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-50">{saving?"Saving...":isEdit?"Update":"Add Application"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
