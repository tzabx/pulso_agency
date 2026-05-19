const featureIcons = ['layers', 'pencil', 'link', 'bolt', 'pin', 'check'];

export function getCardCollectionKey(sectionType) {
  if (sectionType === 'system' || sectionType === 'differentiators' || sectionType === 'testimonials') {
    return 'items';
  }

  if (sectionType === 'process') {
    return 'steps';
  }

  return null;
}

export function createCardTemplate(sectionType, index) {
  const number = String(index + 1).padStart(2, '0');

  if (sectionType === 'system') {
    return {
      number,
      title: 'Nuevo bloque del sistema',
      description: 'Describe brevemente este bloque.',
      body: 'Describe con mas detalle como funciona este bloque.',
      checklist: ['Nuevo item'],
      image: {
        src: '/images/01.jpg',
        alt: 'Imagen del bloque',
      },
    };
  }

  if (sectionType === 'differentiators') {
    return {
      icon: featureIcons[index % featureIcons.length],
      title: 'Nuevo diferenciador',
      description: 'Describe el diferenciador.',
    };
  }

  if (sectionType === 'testimonials') {
    return {
      initials: 'NN',
      quote: 'Nuevo testimonio.',
      name: 'Nuevo nombre',
      role: 'Nuevo rol',
    };
  }

  if (sectionType === 'process') {
    return {
      number,
      title: 'Nuevo paso',
      description: 'Describe el paso.',
    };
  }

  return null;
}

export const allowedFeatureIcons = featureIcons;
