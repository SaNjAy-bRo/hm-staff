"use client";
import { useState } from "react";

export default function ContactFormModal({ submission, onClose, onSave }) {
  const isEdit = !!submission;
  const [form, setForm] = useState(submission || { name:"", email:"", subject:"", message:"" });
  const [saving, setSaving] = useState(false);
  const set = (k,v) => setForm(p=>({...p,[k]:v}));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try { await onSave(form, isEdit); } finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full" onClick={e=>e.stopPropagation()}>
        <div className="p-5 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">{isEdit?"Edit Message":"Add Message"}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Name<span className="text-red-500">*</span></label>
            <input type="text" value={form.name} onChange={e=>set("name",e.target.value)} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-sky-500 outline-none"/>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Email<span className="text-red-500">*</span></label>
            <input type="email" value={form.email} onChange={e=>set("email",e.target.value)} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-sky-500 outline-none"/>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Subject<span className="text-red-500">*</span></label>
            <input type="text" value={form.subject} onChange={e=>set("subject",e.target.value)} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-sky-500 outline-none"/>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Message<span className="text-red-500">*</span></label>
            <textarea value={form.message} onChange={e=>set("message",e.target.value)} required rows={4} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-sky-500 outline-none"/>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">Cancel</button>
            <button type="submit" disabled={saving} className="px-5 py-2.5 text-sm font-medium rounded-lg bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-50">{saving?"Saving...":isEdit?"Update":"Add Message"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
