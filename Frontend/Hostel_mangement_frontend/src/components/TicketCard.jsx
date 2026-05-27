import StatusPill from './StatusPill';

export default function TicketCard({ title, room, status, description, priority, date, image, cta, onAction }) {
  return (
    <article className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.12)] transition hover:-translate-y-1 hover:border-blue-500/20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="mt-1 text-sm text-slate-400">Room {room} • {priority}</p>
        </div>
        <StatusPill status={status} />
      </div>

      <p className="mt-5 text-sm leading-7 text-slate-300">{description}</p>

      {image && (
        <div className="group relative mt-5 overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/85">
          <img
            src={image}
            alt={title}
            className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
          <div className="absolute bottom-4 left-4 rounded-2xl bg-slate-950/80 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-950/40">
            Issue preview
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Reported on {date}</p>
        {cta && (
          <button
            type="button"
            onClick={onAction}
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95"
          >
            {cta}
          </button>
        )}
      </div>
    </article>
  );
}
