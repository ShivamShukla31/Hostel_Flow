export default function ComplaintDetails() {
  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-12">
      <div className="mx-auto max-w-5xl rounded-[36px] border border-white/10 bg-white/5 p-10 shadow-[0_40px_120px_rgba(15,23,42,0.22)] backdrop-blur-2xl">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Complaint detail</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Issue summary and workflow</h1>
          <p className="mt-3 text-slate-300">Review complaint history, current status, assigned worker, and next steps in the ticket lifecycle.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold text-white">Issue Overview</h2>
            <p className="mt-4 text-slate-300">Electrical failure in room 302. Student reported that the ceiling fan is making sparks and turning off randomly during the night.</p>
            <ul className="mt-6 space-y-3 text-slate-300">
              <li>• Priority: High</li>
              <li>• Status: In Progress</li>
              <li>• Reporter: Student</li>
              <li>• Assigned Worker: Maintenance Team</li>
            </ul>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold text-white">Status Timeline</h2>
            <div className="mt-5 space-y-4">
              <div className="rounded-3xl bg-slate-950/80 p-4">
                <p className="font-semibold text-white">Student Uploads Complaint</p>
                <p className="mt-1 text-slate-400">May 22, 10:12 AM</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-4">
                <p className="font-semibold text-white">Rector Verifies</p>
                <p className="mt-1 text-slate-400">May 22, 11:00 AM</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-4">
                <p className="font-semibold text-white">Worker Assigned</p>
                <p className="mt-1 text-slate-400">May 22, 11:15 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
