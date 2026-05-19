import CardGrid from '../common/CardGrid';
import SectionHeader from '../common/SectionHeader';
import SectionShell from '../layout/SectionShell';
import StepCard from '../cards/StepCard';

export default function ProcessSection({ id, badge, title, highlight, description, steps }) {
  return (
    <SectionShell id={id} tone="soft">
      <SectionHeader badge={badge} title={title} highlight={highlight} description={description} className="reveal mb-12" />
      <CardGrid columns={4}>
        {steps.map((step, index) => (
          <div key={`${step.number}-${index}`} className="reveal">
            <StepCard {...step} />
          </div>
        ))}
      </CardGrid>
    </SectionShell>
  );
}
