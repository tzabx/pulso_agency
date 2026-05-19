import Badge from '../common/Badge';
import SectionShell from '../layout/SectionShell';

export default function DiagnosisSection({ id, badge, titleLines, description, callout }) {
  return (
    <SectionShell id={id} tone="dark">
      <div className="mx-auto max-w-4xl text-center">
        <div className="reveal">
          <Badge label={badge} tone="dark" className="mb-6" />
          <h2 className="text-4xl font-bold leading-tight text-brand-cream md:text-5xl">
            {titleLines.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-brand-light md:text-lg">{description}</p>
          <div className="mx-auto mt-6 max-w-2xl rounded-2xl border-l-4 border-brand-mint bg-brand-mint/10 px-6 py-5 text-left text-base font-medium leading-relaxed text-brand-cream">
            {callout}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
