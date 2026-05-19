import Button from '../common/Button';
import ContactItem from '../common/ContactItem';
import MediaFrame from '../common/MediaFrame';
import SplitLayout from '../layout/SplitLayout';
import SectionShell from '../layout/SectionShell';

export default function CtaSection({
  id,
  badge,
  title,
  highlight,
  description,
  primaryCta,
  secondaryCta,
  contacts,
  image,
}) {
  return (
    <SectionShell id={id}>
      <div className="reveal rounded-5xl bg-brand-dark p-8 md:p-12">
        <SplitLayout
          start={
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.2rem] text-brand-mint">{badge}</p>
              <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl">
                {title} <span className="text-gradient">{highlight}</span>
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-light md:text-lg">{description}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href={primaryCta.href} label={primaryCta.label} target={primaryCta.target} />
                <Button
                  href={secondaryCta.href}
                  label={secondaryCta.label}
                  variant="outline"
                  className="border-white/20 text-white hover:border-brand-mint hover:text-brand-mint"
                />
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                {contacts.map((contact) => (
                  <ContactItem key={contact.label} {...contact} />
                ))}
              </div>
            </div>
          }
          end={<MediaFrame src={image.src} alt={image.alt} className="rounded-3xl" />}
        />
      </div>
    </SectionShell>
  );
}
