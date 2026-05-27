const steps = [
  'Student Uploads Complaint',
  'Rector Verifies',
  'Worker Assigned',
  'Repair Started',
  'Completed',
  'Student Confirms'
];

export default function WorkflowTimeline() {
  return (
    <div className="space-y-6 rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.15)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Workflow</p>
          <h3 className="text-2xl font-semibold text-white">Complaint progress timeline</h3>
        </div>
      </div>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step} className="flex items-start gap-4">
            <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-slate-950/75 text-sm text-white">
              {index + 1}
            </div>
            <div>
              <p className="text-white font-medium">{step}</p>
              <p className="text-slate-500 text-sm">{index === steps.length - 1 ? 'Final confirmation by student' : 'Next step in the hostel issue flow'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
