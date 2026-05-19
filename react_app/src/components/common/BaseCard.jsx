const toneClasses = {
  light: 'bg-white text-brand-dark shadow-soft',
  dark: 'bg-brand-dark text-white',
  glass: 'border border-white/5 bg-white/5 text-brand-cream',
};

export default function BaseCard({ tone = 'light', className = '', children }) {
  return <article className={`rounded-4xl p-8 ${toneClasses[tone]} ${className}`}>{children}</article>;
}
