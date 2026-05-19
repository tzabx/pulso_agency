import CardGrid from '../common/CardGrid';
import SectionHeader from '../common/SectionHeader';
import SectionShell from '../layout/SectionShell';
import TestimonialCard from '../cards/TestimonialCard';

export default function TestimonialsSection({ id, badge, title, highlight, items }) {
  return (
    <SectionShell id={id}>
      <SectionHeader badge={badge} title={title} highlight={highlight} className="reveal mb-12" />
      <CardGrid columns={3}>
        {items.map((item, index) => (
          <div key={`${item.name}-${index}`} className="reveal">
            <TestimonialCard {...item} />
          </div>
        ))}
      </CardGrid>
    </SectionShell>
  );
}
