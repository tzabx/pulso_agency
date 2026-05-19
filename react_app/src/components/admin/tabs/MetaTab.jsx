import { useEditor } from '../../../editor/hooks/useEditor';

export default function MetaTab() {
  const {
    state: { draft },
    dispatch,
  } = useEditor();

  return (
    <div className="grid gap-4">
      <h3 className="text-sm font-bold text-brand-dark">Home Meta</h3>
      <label className="grid gap-1">
        <span className="text-xs font-semibold uppercase tracking-[0.08rem] text-brand-mid">Title</span>
        <textarea
          rows={3}
          className="rounded-xl border border-brand-dark/20 bg-white px-3 py-2 text-sm outline-none transition focus:border-brand-mint"
          value={draft.home.meta.title}
          onChange={(event) =>
            dispatch({
              type: 'UPDATE_HOME_META_FIELD',
              payload: { key: 'title', value: event.target.value },
            })
          }
        />
      </label>

      <label className="grid gap-1">
        <span className="text-xs font-semibold uppercase tracking-[0.08rem] text-brand-mid">Description</span>
        <textarea
          rows={4}
          className="rounded-xl border border-brand-dark/20 bg-white px-3 py-2 text-sm outline-none transition focus:border-brand-mint"
          value={draft.home.meta.description}
          onChange={(event) =>
            dispatch({
              type: 'UPDATE_HOME_META_FIELD',
              payload: { key: 'description', value: event.target.value },
            })
          }
        />
      </label>

      <div className="rounded-2xl bg-brand-dark/5 p-3 text-xs text-brand-mid">
        <p className="font-semibold text-brand-dark">Preview SEO</p>
        <p className="mt-1 text-sm font-medium text-brand-dark">{draft.home.meta.title}</p>
        <p className="mt-1 leading-relaxed">{draft.home.meta.description}</p>
      </div>
    </div>
  );
}
