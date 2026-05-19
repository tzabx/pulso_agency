export default function ContactItem({ icon, label, href }) {
  if (href) {
    const isExternal = href.startsWith('http');

    return (
      <div className="flex items-center gap-2 text-sm text-brand-light">
        <a
          href={href}
          className="flex items-center gap-2 transition hover:text-white"
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noreferrer noopener' : undefined}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-dark2 text-sm">{icon}</span>
          <span>{label}</span>
        </a>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm text-brand-light">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-dark2 text-sm">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
