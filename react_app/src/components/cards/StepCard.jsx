import BaseCard from '../common/BaseCard';

export default function StepCard({ number, title, description }) {
  return (
    <BaseCard className="h-full transition hover:-translate-y-1">
      <div className="mb-3 text-4xl font-bold text-gradient">{number}</div>
      <h3 className="text-lg font-bold text-brand-dark">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-brand-mid">{description}</p>
    </BaseCard>
  );
}
