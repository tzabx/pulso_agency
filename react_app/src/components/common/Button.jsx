export default function Button({ href, label, variant = 'primary', target, className = '' }) {
  const rel = target === '_blank' ? 'noreferrer noopener' : undefined;
  const variantClass =
    variant === 'primary'
      ? 'bg-brand-gradient text-white shadow-mint hover:-translate-y-[3px] hover:shadow-mint-hover'
      : 'border border-brand-dark/20 text-brand-dark hover:border-brand-mint hover:text-brand-mint';

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`inline-flex items-center justify-center gap-2 rounded-5xl px-8 py-4 text-[0.8rem] font-bold uppercase tracking-[0.05rem] transition ${variantClass} ${className}`}
    >
      {label}
    </a>
  );
}
