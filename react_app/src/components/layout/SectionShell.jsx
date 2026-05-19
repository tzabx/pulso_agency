const toneClass = {
  default: 'bg-brand-cream text-brand-dark',
  dark: 'bg-brand-dark text-brand-cream',
  soft: 'bg-soft-panel text-brand-dark',
};

export default function SectionShell({
  id,
  tone = 'default',
  className = '',
  containerClassName = '',
  children,
}) {
  return (
    <section id={id} className={`py-20 lg:py-24 ${toneClass[tone]} ${className}`}>
      <div className={`mx-auto max-w-shell px-8 ${containerClassName}`}>{children}</div>
    </section>
  );
}
