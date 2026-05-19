export default function Badge({ label, tone = 'light', className = '' }) {
  const toneClass =
    tone === 'dark'
      ? 'border border-brand-mint/30 bg-brand-mint/10 text-brand-mint'
      : 'border border-brand-dark/20 text-brand-dark';

  return (
    <span
      className={`inline-flex rounded-full px-4 py-1 text-[0.7rem] font-bold uppercase tracking-[0.1rem] ${toneClass} ${className}`}
    >
      {label}
    </span>
  );
}
