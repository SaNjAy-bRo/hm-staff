"use client";
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50">
      <span className="text-sm text-slate-500">Page {currentPage} of {totalPages}</span>
      <div className="flex items-center gap-1">
        <button onClick={() => onPageChange(1)} disabled={currentPage === 1} className="px-3 py-1.5 text-sm rounded-md disabled:opacity-40 hover:bg-slate-200 transition-colors">«</button>
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1.5 text-sm rounded-md disabled:opacity-40 hover:bg-slate-200 transition-colors">‹</button>
        {pages.map(p => (
          <button key={p} onClick={() => onPageChange(p)} className={`px-3 py-1.5 text-sm rounded-md transition-colors ${p === currentPage ? 'bg-sky-600 text-white' : 'hover:bg-slate-200'}`}>{p}</button>
        ))}
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1.5 text-sm rounded-md disabled:opacity-40 hover:bg-slate-200 transition-colors">›</button>
        <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} className="px-3 py-1.5 text-sm rounded-md disabled:opacity-40 hover:bg-slate-200 transition-colors">»</button>
      </div>
    </div>
  );
}
