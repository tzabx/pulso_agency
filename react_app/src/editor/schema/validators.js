import { allowedFeatureIcons, getCardCollectionKey } from './templates';

function isString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

export function validateSite(siteData) {
  const errors = [];

  if (!isString(siteData?.site?.defaultTitle)) {
    errors.push('site.defaultTitle es requerido.');
  }

  if (!isString(siteData?.site?.defaultDescription)) {
    errors.push('site.defaultDescription es requerido.');
  }

  if (!isString(siteData?.branding?.logo)) {
    errors.push('branding.logo es requerido.');
  }

  if (!isString(siteData?.navigation?.cta?.label)) {
    errors.push('navigation.cta.label es requerido.');
  }

  return errors;
}

export function validateHome(homeData) {
  const errors = [];

  if (!isString(homeData?.meta?.title)) {
    errors.push('meta.title es requerido.');
  }

  if (!isString(homeData?.meta?.description)) {
    errors.push('meta.description es requerido.');
  }

  if (!Array.isArray(homeData?.sections)) {
    errors.push('sections debe ser un arreglo.');
    return errors;
  }

  homeData.sections.forEach((section, index) => {
    if (!isString(section?.type)) {
      errors.push(`sections[${index}].type es requerido.`);
      return;
    }

    if (!isString(section?.id)) {
      errors.push(`sections[${index}].id es requerido.`);
    }

    const cardKey = getCardCollectionKey(section.type);
    if (cardKey && !Array.isArray(section?.props?.[cardKey])) {
      errors.push(`sections[${index}].props.${cardKey} debe ser un arreglo.`);
    }

    if (section.type === 'differentiators' && Array.isArray(section?.props?.items)) {
      section.props.items.forEach((item, itemIndex) => {
        if (!allowedFeatureIcons.includes(item.icon)) {
          errors.push(`sections[${index}].props.items[${itemIndex}].icon no es valido.`);
        }
      });
    }
  });

  return errors;
}
