export default function Checklist({ items, tone = 'light', className = '' }) {
  const textClass = tone === 'dark' ? 'text-brand-light' : 'text-brand-mid';

  return (
    <ul className={`grid gap-x-4 gap-y-2 text-sm sm:grid-cols-2 ${textClass} ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 leading-relaxed">
          <span className="mt-[2px] text-brand-mint">✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
