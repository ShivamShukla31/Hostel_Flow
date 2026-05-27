import { motion } from 'framer-motion';
import Button from './Button';
import StatusPill from './StatusPill';

export default function WorkerTaskCard({ task, onStart, onUpdate, onComplete }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="rounded-[32px] border border-white/10 bg-white/6 p-6 shadow-[0_40px_120px_rgba(15,23,42,0.18)] backdrop-blur-[24px]"
    >
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3 text-slate-300">
            <span className="text-xs uppercase tracking-[0.3em]">{task.category}</span>
            <span className="text-xs uppercase tracking-[0.3em] text-slate-500">Room {task.room}</span>
          </div>
          <h3 className="mt-3 text-2xl font-semibold text-white">{task.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">{task.description}</p>
          {task.image && (
            <div className="mt-5 overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/85">
              <img src={task.image} alt={task.title} className="h-52 w-full object-cover" />
            </div>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <StatusPill status={task.status} />
            <span className="inline-flex rounded-3xl border border-white/10 bg-slate-950/80 px-3 py-2 text-xs uppercase tracking-[0.28em] text-slate-400">
              {task.priority}
            </span>
            <span className="inline-flex rounded-3xl border border-white/10 bg-slate-950/80 px-3 py-2 text-xs uppercase tracking-[0.28em] text-slate-400">
              Assigned {task.assignedDate}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 xl:items-end">
          <div className="inline-flex items-center rounded-3xl bg-slate-950/85 px-4 py-3 text-sm text-slate-300 border border-white/10">
            <span className="mr-2 text-cyan-300">Student:</span> {task.student}
          </div>
          <div className="inline-flex items-center rounded-3xl bg-slate-950/85 px-4 py-3 text-sm text-slate-300 border border-white/10">
            <span className="mr-2 text-cyan-300">Room:</span> {task.room}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_220px]">
        <div className="rounded-[28px] border border-white/10 bg-slate-950/85 p-4">
          <div className="flex items-center justify-between gap-4 text-sm text-slate-400">
            <span>Task progress</span>
            <span className="font-semibold text-white">{task.progress}%</span>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
              style={{ width: `${task.progress}%` }}
            />
          </div>
          <div className="mt-4 text-sm text-slate-400">Upload completion proof and keep status updates current for faster approval.</div>
          <div className="mt-4 flex items-center gap-3">
            <label className="cursor-pointer rounded-2xl bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10">
              Upload proof
              <input type="file" className="sr-only" />
            </label>
            <span className="text-xs uppercase tracking-[0.3em] text-slate-500">{task.proofStatus}</span>
          </div>
        </div>

        <div className="grid gap-3">
          <Button variant="primary" fullWidth onClick={() => onStart(task)}>
            Start Work
          </Button>
          <Button variant="assign" fullWidth onClick={() => onUpdate(task)}>
            Update Progress
          </Button>
          <Button variant="success" fullWidth onClick={() => onComplete(task)}>
            Mark Completed
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
