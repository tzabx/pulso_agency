import { useEffect } from 'react';

export default function BaseLayout({ meta, site, children }) {
  useEffect(() => {
    const title = meta?.title ?? site.defaultTitle;
    const description = meta?.description ?? site.defaultDescription;

    document.title = title;

    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.setAttribute('name', 'description');
      document.head.appendChild(descriptionMeta);
    }

    descriptionMeta.setAttribute('content', description);
    document.documentElement.lang = site.locale ?? 'es-MX';
  }, [meta, site]);

  useEffect(() => {
    const nav = document.querySelector('[data-navbar]');
    const syncNavbar = () => {
      if (!nav) return;

      if (window.scrollY > 30) {
        nav.classList.add('bg-brand-cream/90', 'backdrop-blur', 'shadow-[0_2px_10px_rgba(0,0,0,0.05)]');
      } else {
        nav.classList.remove('bg-brand-cream/90', 'backdrop-blur', 'shadow-[0_2px_10px_rgba(0,0,0,0.05)]');
      }
    };

    syncNavbar();
    window.addEventListener('scroll', syncNavbar, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

    return () => {
      window.removeEventListener('scroll', syncNavbar);
      observer.disconnect();
    };
  }, []);

  return <>{children}</>;
}
