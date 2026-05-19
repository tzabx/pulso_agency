import { createCardTemplate, getCardCollectionKey } from '../schema/templates';
import { validateHome, validateSite } from '../schema/validators';

function clone(value) {
  return structuredClone(value);
}

function setIn(target, path, value) {
  const next = clone(target);
  let cursor = next;

  for (let index = 0; index < path.length - 1; index += 1) {
    cursor = cursor[path[index]];
  }

  cursor[path[path.length - 1]] = value;
  return next;
}

function swap(list, fromIndex, toIndex) {
  const next = [...list];
  const [item] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, item);
  return next;
}

function getValidationErrors(draft) {
  return {
    site: validateSite(draft.site),
    home: validateHome(draft.home),
  };
}

function withHistory(state, draft) {
  return {
    ...state,
    history: [...state.history, state.draft],
    future: [],
    draft,
    isDirty: true,
    errors: getValidationErrors(draft),
    lastEditedAt: Date.now(),
  };
}

export function createInitialState(source) {
  return {
    source,
    draft: clone(source),
    history: [],
    future: [],
    isDirty: false,
    isPanelOpen: false,
    activeTab: 'site',
    errors: getValidationErrors(source),
    lastEditedAt: null,
  };
}

export function reducer(state, action) {
  if (action.type === 'HYDRATE_DRAFT') {
    const draft = clone(action.payload);
    return {
      ...state,
      draft,
      isDirty: true,
      errors: getValidationErrors(draft),
      lastEditedAt: Date.now(),
    };
  }

  if (action.type === 'TOGGLE_PANEL') {
    return {
      ...state,
      isPanelOpen: typeof action.payload === 'boolean' ? action.payload : !state.isPanelOpen,
    };
  }

  if (action.type === 'SET_ACTIVE_TAB') {
    return {
      ...state,
      activeTab: action.payload,
    };
  }

  if (action.type === 'UPDATE_SITE_FIELD') {
    const draft = {
      ...state.draft,
      site: setIn(state.draft.site, action.payload.path, action.payload.value),
    };

    return withHistory(state, draft);
  }

  if (action.type === 'UPDATE_HOME_META_FIELD') {
    const draft = {
      ...state.draft,
      home: setIn(state.draft.home, ['meta', action.payload.key], action.payload.value),
    };

    return withHistory(state, draft);
  }

  if (action.type === 'UPDATE_SECTION_FIELD') {
    const { sectionIndex, path, value } = action.payload;
    const nextSections = [...state.draft.home.sections];
    nextSections[sectionIndex] = setIn(nextSections[sectionIndex], path, value);

    const draft = {
      ...state.draft,
      home: {
        ...state.draft.home,
        sections: nextSections,
      },
    };

    return withHistory(state, draft);
  }

  if (action.type === 'ADD_CARD') {
    const { sectionIndex } = action.payload;
    const section = state.draft.home.sections[sectionIndex];
    const collectionKey = getCardCollectionKey(section.type);

    if (!collectionKey) {
      return state;
    }

    const currentItems = section.props[collectionKey] ?? [];
    const template = createCardTemplate(section.type, currentItems.length);

    if (!template) {
      return state;
    }

    const nextSections = [...state.draft.home.sections];
    nextSections[sectionIndex] = {
      ...section,
      props: {
        ...section.props,
        [collectionKey]: [...currentItems, template],
      },
    };

    const draft = {
      ...state.draft,
      home: {
        ...state.draft.home,
        sections: nextSections,
      },
    };

    return withHistory(state, draft);
  }

  if (action.type === 'REMOVE_CARD') {
    const { sectionIndex, cardIndex } = action.payload;
    const section = state.draft.home.sections[sectionIndex];
    const collectionKey = getCardCollectionKey(section.type);

    if (!collectionKey) {
      return state;
    }

    const currentItems = section.props[collectionKey] ?? [];
    const nextItems = currentItems.filter((_, index) => index !== cardIndex);

    const nextSections = [...state.draft.home.sections];
    nextSections[sectionIndex] = {
      ...section,
      props: {
        ...section.props,
        [collectionKey]: nextItems,
      },
    };

    const draft = {
      ...state.draft,
      home: {
        ...state.draft.home,
        sections: nextSections,
      },
    };

    return withHistory(state, draft);
  }

  if (action.type === 'MOVE_CARD') {
    const { sectionIndex, cardIndex, direction } = action.payload;
    const section = state.draft.home.sections[sectionIndex];
    const collectionKey = getCardCollectionKey(section.type);

    if (!collectionKey) {
      return state;
    }

    const currentItems = section.props[collectionKey] ?? [];
    const targetIndex = direction === 'up' ? cardIndex - 1 : cardIndex + 1;

    if (targetIndex < 0 || targetIndex >= currentItems.length) {
      return state;
    }

    const nextItems = swap(currentItems, cardIndex, targetIndex);

    const nextSections = [...state.draft.home.sections];
    nextSections[sectionIndex] = {
      ...section,
      props: {
        ...section.props,
        [collectionKey]: nextItems,
      },
    };

    const draft = {
      ...state.draft,
      home: {
        ...state.draft.home,
        sections: nextSections,
      },
    };

    return withHistory(state, draft);
  }

  if (action.type === 'UNDO') {
    if (state.history.length === 0) {
      return state;
    }

    const previous = state.history[state.history.length - 1];
    return {
      ...state,
      draft: previous,
      history: state.history.slice(0, -1),
      future: [state.draft, ...state.future],
      isDirty: true,
      errors: getValidationErrors(previous),
      lastEditedAt: Date.now(),
    };
  }

  if (action.type === 'REDO') {
    if (state.future.length === 0) {
      return state;
    }

    const next = state.future[0];
    return {
      ...state,
      draft: next,
      history: [...state.history, state.draft],
      future: state.future.slice(1),
      isDirty: true,
      errors: getValidationErrors(next),
      lastEditedAt: Date.now(),
    };
  }

  if (action.type === 'RESET_DRAFT') {
    return {
      ...state,
      draft: clone(state.source),
      history: [],
      future: [],
      isDirty: false,
      errors: getValidationErrors(state.source),
      lastEditedAt: Date.now(),
    };
  }

  if (action.type === 'IMPORT_SITE_JSON') {
    const draft = {
      ...state.draft,
      site: clone(action.payload),
    };

    return withHistory(state, draft);
  }

  if (action.type === 'IMPORT_HOME_JSON') {
    const draft = {
      ...state.draft,
      home: clone(action.payload),
    };

    return withHistory(state, draft);
  }

  return state;
}
