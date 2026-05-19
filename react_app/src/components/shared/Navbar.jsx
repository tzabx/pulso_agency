import { withBasePath } from '../../utils/assetPath';

export default function Navbar({ branding, navigation }) {
  return (
    <nav data-navbar className="fixed inset-x-0 top-0 z-50 bg-transparent py-4 transition-all duration-300">
      <div className="mx-auto flex max-w-shell items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <img src={withBasePath(branding.logo)} alt={branding.logoAlt} className="h-8 w-auto" />
          <span className="rounded-full border border-brand-mint/30 bg-brand-mint/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.1rem] text-brand-mint">
            {branding.badge}
          </span>
        </div>
        <a
          href={navigation.cta.href}
          className="rounded-full bg-brand-gradient px-6 py-3 text-xs font-bold uppercase tracking-[0.05rem] text-white shadow-[0_4px_12px_rgba(15,191,159,0.2)] transition hover:-translate-y-0.5 hover:shadow-mint"
        >
          {navigation.cta.label}
        </a>
      </div>
    </nav>
  );
}
