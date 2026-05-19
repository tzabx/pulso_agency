import { useEffect, useMemo, useState } from 'react';
import { useEditor } from '../../../editor/hooks/useEditor';

function downloadJson(fileName, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function DataTab() {
  const {
    state: { draft, errors, history, future },
    dispatch,
    clearLocalDraft,
  } = useEditor();
  const [importError, setImportError] = useState('');
  const [rawSite, setRawSite] = useState('');
  const [rawHome, setRawHome] = useState('');

  useEffect(() => {
    setRawSite(JSON.stringify(draft.site, null, 2));
    setRawHome(JSON.stringify(draft.home, null, 2));
  }, [draft.site, draft.home]);

  const hasErrors = useMemo(() => errors.site.length > 0 || errors.home.length > 0, [errors]);

  const importFile = async (event, kind) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);

      dispatch({
        type: kind === 'site' ? 'IMPORT_SITE_JSON' : 'IMPORT_HOME_JSON',
        payload: parsed,
      });

      setImportError('');
    } catch {
      setImportError('No se pudo importar el archivo JSON.');
    }
  };

  const applyRaw = (kind) => {
    try {
      const parsed = JSON.parse(kind === 'site' ? rawSite : rawHome);
      dispatch({
        type: kind === 'site' ? 'IMPORT_SITE_JSON' : 'IMPORT_HOME_JSON',
        payload: parsed,
      });
      setImportError('');
    } catch {
      setImportError('El JSON en modo avanzado no es valido.');
    }
  };

  return (
    <div className="grid gap-4">
      <h3 className="text-sm font-bold text-brand-dark">Data Operations</h3>

      <div className="rounded-xl bg-brand-mint/20 p-3">
        <p className="text-xs font-semibold text-brand-dark">📡 Usando json-server</p>
        <p className="text-xs text-brand-mid">
          Los cambios se guardan directamente en db.json. Para sincronizar con Astro y shared/data/, ejecuta:
        </p>
        <code className="mt-2 block rounded bg-white px-2 py-1 text-[11px] font-mono text-brand-dark">npm run export:db</code>
      </div>

      <div className="grid gap-2">
        <button
          type="button"
          className="rounded-xl border border-brand-dark/20 px-3 py-2 text-sm"
          onClick={() => downloadJson('site.json', draft.site)}
        >
          Export site.json
        </button>
        <button
          type="button"
          className="rounded-xl border border-brand-dark/20 px-3 py-2 text-sm"
          onClick={() => downloadJson('home.json', draft.home)}
        >
          Export home.json
        </button>
      </div>

      <div className="grid gap-2 rounded-xl border border-brand-dark/10 bg-brand-dark/5 p-3">
        <label className="text-xs font-semibold uppercase tracking-[0.08rem] text-brand-mid">Import site.json</label>
        <input type="file" accept="application/json" onChange={(event) => importFile(event, 'site')} />

        <label className="text-xs font-semibold uppercase tracking-[0.08rem] text-brand-mid">Import home.json</label>
        <input type="file" accept="application/json" onChange={(event) => importFile(event, 'home')} />

        {importError && <p className="text-xs text-red-600">{importError}</p>}
      </div>

      <div className="grid gap-2">
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-xl border border-brand-dark/20 px-3 py-2 text-xs"
            onClick={() => dispatch({ type: 'UNDO' })}
            disabled={history.length === 0}
          >
            Undo
          </button>
          <button
            type="button"
            className="rounded-xl border border-brand-dark/20 px-3 py-2 text-xs"
            onClick={() => dispatch({ type: 'REDO' })}
            disabled={future.length === 0}
          >
            Redo
          </button>
          <button
            type="button"
            className="rounded-xl border border-red-300 px-3 py-2 text-xs text-red-700"
            onClick={() => {
              dispatch({ type: 'RESET_DRAFT' });
              clearLocalDraft();
            }}
          >
            Reset Draft
          </button>
        </div>

        <div className="rounded-xl bg-brand-dark/5 p-3 text-xs text-brand-mid">
          <p>Errores Site: {errors.site.length}</p>
          <p>Errores Home: {errors.home.length}</p>
          {hasErrors && (
            <ul className="mt-2 list-disc pl-4">
              {[...errors.site, ...errors.home].slice(0, 6).map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="grid gap-2 rounded-xl border border-brand-dark/10 bg-brand-dark/5 p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.08rem] text-brand-mid">Raw JSON mode</p>

          <label className="grid gap-1">
            <span className="text-[11px] font-semibold uppercase tracking-[0.08rem] text-brand-mid">site.json</span>
            <textarea
              rows={8}
              className="rounded-xl border border-brand-dark/20 bg-white px-3 py-2 font-mono text-xs outline-none transition focus:border-brand-mint"
              value={rawSite}
              onChange={(event) => setRawSite(event.target.value)}
            />
            <button
              type="button"
              className="w-fit rounded-lg border border-brand-dark/20 px-2 py-1 text-xs"
              onClick={() => applyRaw('site')}
            >
              Apply raw site
            </button>
          </label>

          <label className="grid gap-1">
            <span className="text-[11px] font-semibold uppercase tracking-[0.08rem] text-brand-mid">home.json</span>
            <textarea
              rows={8}
              className="rounded-xl border border-brand-dark/20 bg-white px-3 py-2 font-mono text-xs outline-none transition focus:border-brand-mint"
              value={rawHome}
              onChange={(event) => setRawHome(event.target.value)}
            />
            <button
              type="button"
              className="w-fit rounded-lg border border-brand-dark/20 px-2 py-1 text-xs"
              onClick={() => applyRaw('home')}
            >
              Apply raw home
            </button>
          </label>
        </div>
      </div>
    </div>
  );
}
