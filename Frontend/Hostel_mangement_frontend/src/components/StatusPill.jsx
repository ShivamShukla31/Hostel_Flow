const statusStyles = {
  Pending: 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/20',
  'Approved by Rector': 'bg-blue-500/10 text-blue-300 border border-blue-500/20',
  'Rejected by Rector': 'bg-red-500/10 text-red-300 border border-red-500/20',
  'Assigned to Worker': 'bg-purple-500/10 text-purple-300 border border-purple-500/20',
  'In Progress': 'bg-blue-500/10 text-blue-300 border border-blue-500/20',
  Completed: 'bg-green-500/10 text-emerald-300 border border-green-500/20',
  Closed: 'bg-slate-700/80 text-slate-200 border border-white/10'
};

export default function StatusPill({ status }) {
  return (
    <span className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${statusStyles[status] || statusStyles.Closed}`}>
      {status}
    </span>
  );
}
