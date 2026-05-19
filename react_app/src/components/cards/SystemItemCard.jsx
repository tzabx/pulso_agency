import BaseCard from '../common/BaseCard';
import Checklist from '../common/Checklist';
import MediaFrame from '../common/MediaFrame';

export default function SystemItemCard({ number, title, description, body, checklist, image }) {
  return (
    <div className="grid overflow-hidden rounded-4xl bg-white shadow-soft transition hover:-translate-y-1 md:grid-cols-[280px_1fr]">
      <BaseCard tone="dark" className="rounded-none bg-brand-dark">
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="text-5xl font-bold text-gradient">{number}</div>
            <h3 className="mt-2 text-2xl font-bold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-brand-light">{description}</p>
          </div>
        </div>
      </BaseCard>
      <div className="p-8">
        <p className="mb-5 text-sm leading-relaxed text-brand-mid md:text-[0.95rem]">{body}</p>
        <Checklist items={checklist} className="mb-6" />
        <MediaFrame src={image.src} alt={image.alt} className="rounded-3xl" imageClassName="max-h-[320px]" />
      </div>
    </div>
  );
}
