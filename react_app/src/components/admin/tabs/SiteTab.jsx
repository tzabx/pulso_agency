import { useEditor } from '../../../editor/hooks/useEditor';

function Field({ label, value, onChange, placeholder }) {
  return (
    <label className="grid gap-1">
      <span className="text-xs font-semibold uppercase tracking-[0.08rem] text-brand-mid">{label}</span>
      <input
        className="rounded-xl border border-brand-dark/20 bg-white px-3 py-2 text-sm outline-none transition focus:border-brand-mint"
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

export default function SiteTab() {
  const {
    state: { draft },
    dispatch,
  } = useEditor();

  const update = (path) => (value) => {
    dispatch({
      type: 'UPDATE_SITE_FIELD',
      payload: { path, value },
    });
  };

  return (
    <div className="grid gap-4">
      <h3 className="text-sm font-bold text-brand-dark">Site Config</h3>
      <Field label="Site Name" value={draft.site.site.name} onChange={update(['site', 'name'])} />
      <Field label="Site URL" value={draft.site.site.url} onChange={update(['site', 'url'])} />
      <Field label="Locale" value={draft.site.site.locale} onChange={update(['site', 'locale'])} />
      <Field label="Default Title" value={draft.site.site.defaultTitle} onChange={update(['site', 'defaultTitle'])} />
      <Field
        label="Default Description"
        value={draft.site.site.defaultDescription}
        onChange={update(['site', 'defaultDescription'])}
      />

      <h3 className="mt-2 text-sm font-bold text-brand-dark">Branding</h3>
      <Field label="Logo" value={draft.site.branding.logo} onChange={update(['branding', 'logo'])} />
      <Field label="Logo Alt" value={draft.site.branding.logoAlt} onChange={update(['branding', 'logoAlt'])} />
      <Field label="Badge" value={draft.site.branding.badge} onChange={update(['branding', 'badge'])} />

      <h3 className="mt-2 text-sm font-bold text-brand-dark">Navigation CTA</h3>
      <Field label="CTA Label" value={draft.site.navigation.cta.label} onChange={update(['navigation', 'cta', 'label'])} />
      <Field label="CTA Href" value={draft.site.navigation.cta.href} onChange={update(['navigation', 'cta', 'href'])} />

      <h3 className="mt-2 text-sm font-bold text-brand-dark">Contact</h3>
      <Field label="Phone" value={draft.site.contact.phone} onChange={update(['contact', 'phone'])} />
      <Field label="Phone Href" value={draft.site.contact.phoneHref} onChange={update(['contact', 'phoneHref'])} />
      <Field label="Email" value={draft.site.contact.email} onChange={update(['contact', 'email'])} />
      <Field label="Email Href" value={draft.site.contact.emailHref} onChange={update(['contact', 'emailHref'])} />
      <Field label="Website" value={draft.site.contact.website} onChange={update(['contact', 'website'])} />
      <Field label="Website Href" value={draft.site.contact.websiteHref} onChange={update(['contact', 'websiteHref'])} />
      <Field label="Location" value={draft.site.contact.location} onChange={update(['contact', 'location'])} />

      <h3 className="mt-2 text-sm font-bold text-brand-dark">Footer</h3>
      <Field label="Footer Left" value={draft.site.footer.left} onChange={update(['footer', 'left'])} />
      <Field label="Footer Right" value={draft.site.footer.right} onChange={update(['footer', 'right'])} />
    </div>
  );
}
