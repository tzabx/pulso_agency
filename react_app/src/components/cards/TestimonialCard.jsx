import BaseCard from '../common/BaseCard';

export default function TestimonialCard({ initials, quote, name, role }) {
  return (
    <BaseCard className="h-full transition hover:-translate-y-1.5">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-brand-mint bg-brand-dark text-lg font-bold text-white">
        {initials}
      </div>
      <p className="mb-4 text-[0.95rem] italic leading-relaxed text-brand-mid">“{quote}”</p>
      <p className="font-bold text-brand-dark">{name}</p>
      <p className="text-xs text-brand-light">{role}</p>
    </BaseCard>
  );
}
