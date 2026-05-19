import { useState } from 'react';
import { useEditor } from '../../../editor/hooks/useEditor';
import { allowedFeatureIcons, getCardCollectionKey } from '../../../editor/schema/templates';

function Field({ label, value, onChange }) {
  return (
    <label className="grid gap-1">
      <span className="text-[11px] font-semibold uppercase tracking-[0.08rem] text-brand-mid">{label}</span>
      <input
        className="rounded-lg border border-brand-dark/20 bg-white px-2 py-1.5 text-sm outline-none transition focus:border-brand-mint"
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function CardEditor({ section, sectionIndex, card, cardIndex }) {
  const { dispatch } = useEditor();
  const collectionKey = getCardCollectionKey(section.type);

  const updateCardField = (path, value) => {
    dispatch({
      type: 'UPDATE_SECTION_FIELD',
      payload: {
        sectionIndex,
        path: ['props', collectionKey, cardIndex, ...path],
        value,
      },
    });
  };

  return (
    <div className="grid gap-2 rounded-xl border border-brand-dark/10 bg-white p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold text-brand-dark">
          Card {cardIndex + 1}: {card.title ?? card.name ?? card.number ?? 'Nuevo'}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-lg border border-brand-dark/20 px-2 py-1 text-xs"
            onClick={() => dispatch({ type: 'MOVE_CARD', payload: { sectionIndex, cardIndex, direction: 'up' } })}
          >
            Up
          </button>
          <button
            type="button"
            className="rounded-lg border border-brand-dark/20 px-2 py-1 text-xs"
            onClick={() => dispatch({ type: 'MOVE_CARD', payload: { sectionIndex, cardIndex, direction: 'down' } })}
          >
            Down
          </button>
          <button
            type="button"
            className="rounded-lg border border-red-300 px-2 py-1 text-xs text-red-700"
            onClick={() => dispatch({ type: 'REMOVE_CARD', payload: { sectionIndex, cardIndex } })}
          >
            Remove
          </button>
        </div>
      </div>

      {Object.entries(card).map(([key, value]) => {
        if (Array.isArray(value)) {
          return (
            <div key={key} className="grid gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08rem] text-brand-mid">{key}</p>
              {value.map((item, itemIndex) => (
                <input
                  key={`${key}-${itemIndex}`}
                  className="rounded-lg border border-brand-dark/20 bg-white px-2 py-1.5 text-sm outline-none transition focus:border-brand-mint"
                  value={item}
                  onChange={(event) => {
                    const next = [...value];
                    next[itemIndex] = event.target.value;
                    updateCardField([key], next);
                  }}
                />
              ))}
              <button
                type="button"
                className="w-fit rounded-lg border border-brand-dark/20 px-2 py-1 text-xs"
                onClick={() => updateCardField([key], [...value, 'Nuevo item'])}
              >
                Add item
              </button>
            </div>
          );
        }

        if (value && typeof value === 'object') {
          return (
            <div key={key} className="grid gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08rem] text-brand-mid">{key}</p>
              {Object.entries(value).map(([nestedKey, nestedValue]) => (
                <Field
                  key={`${key}-${nestedKey}`}
                  label={nestedKey}
                  value={nestedValue}
                  onChange={(nextValue) => updateCardField([key, nestedKey], nextValue)}
                />
              ))}
            </div>
          );
        }

        if (section.type === 'differentiators' && key === 'icon') {
          return (
            <label key={key} className="grid gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-[0.08rem] text-brand-mid">Icon</span>
              <select
                className="rounded-lg border border-brand-dark/20 bg-white px-2 py-1.5 text-sm outline-none transition focus:border-brand-mint"
                value={value}
                onChange={(event) => updateCardField([key], event.target.value)}
              >
                {allowedFeatureIcons.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </label>
          );
        }

        return <Field key={key} label={key} value={value ?? ''} onChange={(nextValue) => updateCardField([key], nextValue)} />;
      })}
    </div>
  );
}

function PropsEditor({ section, sectionIndex, cardCollectionKey }) {
  const { dispatch } = useEditor();

  const updatePropField = (path, value) => {
    dispatch({
      type: 'UPDATE_SECTION_FIELD',
      payload: {
        sectionIndex,
        path: ['props', ...path],
        value,
      },
    });
  };

  return (
    <div className="grid gap-3">
      {Object.entries(section.props).map(([key, value]) => {
        // Skip card collections (handled separately)
        if (key === cardCollectionKey) {
          return null;
        }

        if (Array.isArray(value)) {
          return (
            <div key={key} className="grid gap-2">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08rem] text-brand-mid">{key}</p>
                {typeof value[0] === 'string' && (
                  <button
                    type="button"
                    className="text-xs rounded px-1.5 py-0.5 border border-brand-dark/20"
                    onClick={() => updatePropField([key], [...value, 'Nuevo item'])}
                  >
                    Add
                  </button>
                )}
              </div>
              {Array.isArray(value) &&
                typeof value[0] === 'string' &&
                value.map((item, idx) => (
                  <div key={idx} className="flex gap-1">
                    <input
                      className="flex-1 rounded-lg border border-brand-dark/20 bg-white px-2 py-1.5 text-sm outline-none transition focus:border-brand-mint"
                      value={item}
                      onChange={(e) => {
                        const next = [...value];
                        next[idx] = e.target.value;
                        updatePropField([key], next);
                      }}
                    />
                    <button
                      type="button"
                      className="rounded px-2 border border-red-300 text-xs text-red-700"
                      onClick={() => {
                        const next = value.filter((_, i) => i !== idx);
                        updatePropField([key], next);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
            </div>
          );
        }

        if (value && typeof value === 'object') {
          return (
            <div key={key} className="grid gap-2 rounded-lg border border-brand-dark/10 bg-white p-2.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08rem] text-brand-mid">{key}</p>
              {Object.entries(value).map(([nestedKey, nestedValue]) => (
                <Field
                  key={`${key}-${nestedKey}`}
                  label={nestedKey}
                  value={nestedValue ?? ''}
                  onChange={(nextValue) => updatePropField([key, nestedKey], nextValue)}
                />
              ))}
            </div>
          );
        }

        return (
          <Field
            key={key}
            label={key}
            value={value ?? ''}
            onChange={(nextValue) => updatePropField([key], nextValue)}
          />
        );
      })}
    </div>
  );
}

export default function SectionsTab() {
  const {
    state: { draft },
    dispatch,
  } = useEditor();
  const [expanded, setExpanded] = useState(0);

  return (
    <div className="grid gap-3">
      <h3 className="text-sm font-bold text-brand-dark">Sections and Cards</h3>
      {draft.home.sections.map((section, sectionIndex) => {
        const cardCollectionKey = getCardCollectionKey(section.type);
        const cards = cardCollectionKey ? section.props[cardCollectionKey] ?? [] : [];

        return (
          <article key={section.id} className="rounded-2xl border border-brand-dark/10 bg-brand-dark/5 p-3">
            <button
              type="button"
              className="flex w-full items-center justify-between text-left"
              onClick={() => setExpanded(expanded === sectionIndex ? -1 : sectionIndex)}
            >
              <span className="text-sm font-semibold text-brand-dark">
                {section.type} · #{section.id}
              </span>
              <span className="text-xs text-brand-mid">{expanded === sectionIndex ? 'Collapse' : 'Expand'}</span>
            </button>

            {expanded === sectionIndex && (
              <div className="mt-3 grid gap-3">
                <Field
                  label="Section ID"
                  value={section.id}
                  onChange={(value) =>
                    dispatch({
                      type: 'UPDATE_SECTION_FIELD',
                      payload: { sectionIndex, path: ['id'], value },
                    })
                  }
                />

                <div className="border-t border-brand-dark/10 pt-3">
                  <PropsEditor section={section} sectionIndex={sectionIndex} cardCollectionKey={cardCollectionKey} />
                </div>

                {cardCollectionKey && (
                  <div className="border-t border-brand-dark/10 pt-3">
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold uppercase tracking-[0.08rem] text-brand-mid">Cards ({cards.length})</p>
                        <button
                          type="button"
                          className="rounded-lg border border-brand-dark/20 px-2 py-1 text-xs"
                          onClick={() => dispatch({ type: 'ADD_CARD', payload: { sectionIndex } })}
                        >
                          Add card
                        </button>
                      </div>

                      {cards.map((card, cardIndex) => (
                        <CardEditor
                          key={`${section.id}-${cardIndex}`}
                          section={section}
                          sectionIndex={sectionIndex}
                          card={card}
                          cardIndex={cardIndex}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
