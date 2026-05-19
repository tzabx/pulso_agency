import HeroSection from '../sections/HeroSection';
import DiagnosisSection from '../sections/DiagnosisSection';
import SystemSection from '../sections/SystemSection';
import DifferentiatorsSection from '../sections/DifferentiatorsSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import ProcessSection from '../sections/ProcessSection';
import CtaSection from '../sections/CtaSection';

const componentMap = {
  hero: HeroSection,
  diagnosis: DiagnosisSection,
  system: SystemSection,
  differentiators: DifferentiatorsSection,
  testimonials: TestimonialsSection,
  process: ProcessSection,
  cta: CtaSection,
};

export default function SectionRenderer({ section }) {
  const Component = componentMap[section.type];

  if (!Component) {
    return null;
  }

  return <Component id={section.id} {...section.props} />;
}
