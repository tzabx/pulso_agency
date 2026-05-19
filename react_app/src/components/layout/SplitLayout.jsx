export default function SplitLayout({ reverse = false, className = '', align = 'center', start, end }) {
  const alignmentClass = align === 'start' ? 'items-start' : 'items-center';

  return (
    <div className={`grid gap-12 lg:grid-cols-2 ${alignmentClass} ${className}`}>
      <div className={reverse ? 'lg:order-2' : ''}>{start}</div>
      <div className={reverse ? 'lg:order-1' : ''}>{end}</div>
    </div>
  );
}
