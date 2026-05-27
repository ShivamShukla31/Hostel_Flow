import { Link } from 'react-router-dom';

export default function Logo({ className = '', textClassName = '', iconClassName = 'h-10 w-10' }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src="/favicon.svg"
        alt="Hostel Flow logo"
        className={`${iconClassName} rounded-3xl bg-slate-950/90 p-2 shadow-lg shadow-slate-900/30`}
      />
      <div className={`leading-tight ${textClassName}`}>
        <p className="text-base font-semibold text-white">Hostel Flow</p>
        <p className="text-xs text-slate-400">Smart hostel system</p>
      </div>
    </Link>
  );
}
