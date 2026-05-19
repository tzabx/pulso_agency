import BaseCard from '../common/BaseCard';

const icons = {
  layers: '<rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" />',
  pencil: '<path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />',
  bolt: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />',
  pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />',
  check: '<polyline points="20 6 9 17 4 12" />',
};

export default function FeatureCard({ icon, title, description }) {
  const iconMarkup = icons[icon] ?? icons.layers;

  return (
    <BaseCard tone="glass" className="h-full border transition hover:border-brand-mint hover:bg-brand-mint/5">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-dark2 shadow-[4px_4px_12px_rgba(0,0,0,0.3),-2px_-2px_6px_rgba(255,255,255,0.03)]">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          className="text-brand-mint"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: iconMarkup }}
        />
      </div>
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-brand-light">{description}</p>
    </BaseCard>
  );
}
