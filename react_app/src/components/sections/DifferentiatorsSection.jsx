import CardGrid from '../common/CardGrid';
import MediaFrame from '../common/MediaFrame';
import SectionHeader from '../common/SectionHeader';
import SectionShell from '../layout/SectionShell';
import FeatureCard from '../cards/FeatureCard';

export default function DifferentiatorsSection({ id, badge, title, highlight, description, items, video }) {
  return (
    <SectionShell id={id} tone="dark">
      <SectionHeader
        badge={badge}
        title={title}
        highlight={highlight}
        description={description}
        tone="dark"
        className="reveal mb-12"
      />
      <CardGrid columns={3} className="mb-12">
        {items.map((item, index) => (
          <div key={`${item.title}-${index}`} className="reveal">
            <FeatureCard {...item} />
          </div>
        ))}
      </CardGrid>
      <div className="reveal">
        <MediaFrame className="aspect-video rounded-4xl shadow-feature">
          <iframe
            src={video.embedUrl}
            title={video.title}
            width="100%"
            height="100%"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </MediaFrame>
      </div>
    </SectionShell>
  );
}
