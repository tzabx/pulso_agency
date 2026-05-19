import { useEffect } from 'react';
import SiteTab from './tabs/SiteTab';
import MetaTab from './tabs/MetaTab';
import SectionsTab from './tabs/SectionsTab';
import DataTab from './tabs/DataTab';
import { useEditor } from '../../editor/hooks/useEditor';

const tabs = [
  { id: 'site', label: 'Site' },
  { id: 'meta', label: 'Meta' },
  { id: 'sections', label: 'Sections' },
  { id: 'data', label: 'Data' },
];

export default function AdminPanel() {
  const {
    state: { isPanelOpen, activeTab, isDirty, lastEditedAt },
    dispatch,
    useServer,
    syncStatus,
  } = useEditor();

  useEffect(() => {
    const onKeyDown = (event) => {
      const isShortcut = event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'e';
      if (!isShortcut) {
        return;
      }

      event.preventDefault();
      dispatch({ type: 'TOGGLE_PANEL' });
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [dispatch]);

  const renderTab = () => {
    if (activeTab === 'site') return <SiteTab />;
    if (activeTab === 'meta') return <MetaTab />;
    if (activeTab === 'sections') return <SectionsTab />;
    return <DataTab />;
  };

  const getStatusColor = () => {
    if (syncStatus === 'error') return 'bg-red-100 text-red-800';
    if (syncStatus === 'syncing') return 'bg-yellow-100 text-yellow-800';
    if (syncStatus === 'success') return 'bg-green-100 text-green-800';
    return useServer ? 'bg-brand-mint/20 text-brand-dark' : 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = () => {
    if (syncStatus === 'error') return '✗ Error guardando';
    if (syncStatus === 'syncing') return '⟳ Guardando...';
    if (syncStatus === 'success') return '✓ Guardado';
    return useServer ? '✓ Servidor activo' : 'ⓘ LocalStorage';
  };

  return (
    <>
      <button
        type="button"
        className="fixed bottom-5 right-5 z-[120] rounded-full bg-brand-dark px-4 py-3 text-xs font-semibold uppercase tracking-[0.08rem] text-white shadow-feature"
        onClick={() => dispatch({ type: 'TOGGLE_PANEL', payload: true })}
      >
        Editor
      </button>

      {isPanelOpen && (
        <aside className="fixed inset-y-5 right-5 z-[130] w-[380px] overflow-hidden rounded-3xl border border-brand-dark/20 bg-brand-cream shadow-feature">
          <header className="border-b border-brand-dark/10 bg-white/80 px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-brand-dark">Live JSON Editor</p>
                <p className="text-xs text-brand-mid">
                  {isDirty ? 'Draft activo' : 'Sin cambios'}
                  {lastEditedAt ? ` · ${new Date(lastEditedAt).toLocaleTimeString()}` : ''}
                </p>
              </div>
              <button
                type="button"
                className="rounded-lg border border-brand-dark/20 px-2 py-1 text-xs"
                onClick={() => dispatch({ type: 'TOGGLE_PANEL', payload: false })}
              >
                Close
              </button>
            </div>

            {/* Status badge */}
            <div className={`mt-2 inline-block rounded-full px-2 py-1 text-[11px] font-semibold ${getStatusColor()}`}>
              {getStatusLabel()}
            </div>

            <div className="mt-3 flex gap-2 overflow-auto pb-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                    activeTab === tab.id ? 'bg-brand-dark text-white' : 'border border-brand-dark/20 text-brand-dark'
                  }`}
                  onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: tab.id })}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </header>

          <div className="h-[calc(100%-124px)] overflow-auto px-4 py-3">{renderTab()}</div>
        </aside>
      )}
    </>
  );
}
