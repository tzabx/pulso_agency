import Button from '../common/Button';
import SplitLayout from '../layout/SplitLayout';
import SectionShell from '../layout/SectionShell';
import { withBasePath } from '../../utils/assetPath';

export default function HeroSection({
  id,
  titleLeading,
  titleHighlight,
  description,
  primaryCta,
  secondaryCta,
  tags,
  media,
  floatingBadge,
}) {
  return (
    <SectionShell id={id} className="relative min-h-screen overflow-hidden bg-hero-radial pt-28">
      <div className="absolute inset-0 opacity-10">
        <img
          src={withBasePath('/images/header-PI-agency.png')}
          alt=""
          className="h-full w-full object-cover object-center"
          loading="lazy"
        />
      </div>
      <SplitLayout
        className="relative z-10"
        start={
          <div className="reveal text-center lg:text-left">
            <h1 className="text-5xl font-bold leading-none tracking-[-0.02em] text-brand-dark md:text-7xl">
              {titleLeading}
              <br />
              <span className="text-gradient">{titleHighlight}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-mid lg:max-w-[90%]">{description}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Button href={primaryCta.href} label={primaryCta.label} />
              <Button href={secondaryCta.href} label={secondaryCta.label} variant="outline" />
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-brand-mint/20 bg-brand-mint/10 px-4 py-1.5 text-xs font-semibold text-brand-mint"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        }
        end={
          <div className="reveal relative mx-auto max-w-2xl lg:max-w-none">
            <img src={withBasePath(media.src)} alt={media.alt} className="w-full rounded-4xl shadow-feature" loading="eager" />
            {floatingBadge && (
              <div className="absolute -bottom-4 left-1/2 rounded-full border-l-4 border-brand-mint bg-white px-5 py-3 text-sm font-semibold text-brand-dark shadow-soft sm:left-0 sm:-translate-x-0 lg:-left-4 lg:translate-x-0">
                {floatingBadge}
              </div>
            )}
          </div>
        }
      />
    </SectionShell>
  );
}
