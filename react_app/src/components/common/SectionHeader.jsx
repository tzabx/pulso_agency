import Badge from './Badge';

export default function SectionHeader({
  badge,
  title,
  highlight,
  description,
  tone = 'light',
  className = '',
}) {
  const titleClass = tone === 'dark' ? 'text-white' : 'text-brand-dark';
  const descriptionClass = tone === 'dark' ? 'text-brand-light' : 'text-brand-mid';

  return (
    <div className={`mx-auto max-w-3xl text-center ${className}`}>
      {badge && <Badge label={badge} tone={tone === 'dark' ? 'dark' : 'light'} className="mb-6" />}
      <h2 className={`text-4xl font-bold leading-tight md:text-5xl ${titleClass}`}>
        {title}
        {highlight && (
          <>
            {' '}
            <span className="text-gradient">{highlight}</span>
          </>
        )}
      </h2>
      {description && <p className={`mt-4 text-base leading-relaxed md:text-lg ${descriptionClass}`}>{description}</p>}
    </div>
  );
}
