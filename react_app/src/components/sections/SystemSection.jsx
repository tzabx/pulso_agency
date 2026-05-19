import SectionHeader from '../common/SectionHeader';
import SectionShell from '../layout/SectionShell';
import SystemItemCard from '../cards/SystemItemCard';

export default function SystemSection({ id, badge, title, highlight, description, items }) {
  return (
    <SectionShell id={id}>
      <SectionHeader badge={badge} title={title} highlight={highlight} description={description} className="reveal mb-12" />
      <div className="space-y-8">
        {items.map((item, index) => (
          <div key={`${item.number}-${index}`} className="reveal">
            <SystemItemCard {...item} />
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
