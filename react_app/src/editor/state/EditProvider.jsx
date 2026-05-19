import { createContext, useEffect, useMemo, useReducer, useState } from 'react';
import { clearDraft, loadDraft, saveDraft } from '../storage/localDraft';
import { loadFromServer, saveToServer, isServerAvailable } from '../storage/jsonServerStorage';
import { createInitialState, reducer } from './reducer';

export const EditContext = createContext(null);

export function EditProvider({ source, children }) {
  const [state, dispatch] = useReducer(reducer, source, createInitialState);
  const [useServer, setUseServer] = useState(false);
  const [syncStatus, setSyncStatus] = useState('idle'); // idle, syncing, success, error

  // Cargar datos desde json-server o localStorage
  useEffect(() => {
    const initializeData = async () => {
      try {
        const serverAvailable = await isServerAvailable();
        setUseServer(serverAvailable);

        if (serverAvailable) {
          setSyncStatus('syncing');
          const serverData = await loadFromServer();
          dispatch({
            type: 'HYDRATE_DRAFT',
            payload: serverData,
          });
          setSyncStatus('success');
          console.log('✓ Datos cargados desde servidor');
        } else {
          // Fallback a localStorage
          const localDraft = loadDraft();
          if (localDraft?.home && localDraft?.site) {
            dispatch({
              type: 'HYDRATE_DRAFT',
              payload: localDraft,
            });
          }
          console.log('ⓘ json-server no disponible, usando localStorage');
        }
      } catch (error) {
        console.error('Error inicializando datos:', error);
        setSyncStatus('error');
        // Fallback final a localStorage
        const localDraft = loadDraft();
        if (localDraft?.home && localDraft?.site) {
          dispatch({
            type: 'HYDRATE_DRAFT',
            payload: localDraft,
          });
        }
      }
    };

    initializeData();
  }, []);

  // Guardar cambios
  useEffect(() => {
    if (state.isDirty) {
      const saveChanges = async () => {
        try {
          if (useServer) {
            setSyncStatus('syncing');
            await saveToServer(state.draft);
            setSyncStatus('success');
            // Limpiar status después de 2 segundos
            setTimeout(() => setSyncStatus('idle'), 2000);
          } else {
            // Fallback a localStorage
            saveDraft(state.draft);
          }
        } catch (error) {
          console.error('Error guardando cambios:', error);
          setSyncStatus('error');
          // Intentar guardar en localStorage como fallback
          saveDraft(state.draft);
          setTimeout(() => setSyncStatus('idle'), 2000);
        }
      };

      saveChanges();
    }
  }, [state.isDirty, state.draft, useServer]);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      clearLocalDraft: clearDraft,
      useServer,
      syncStatus,
    }),
    [state, dispatch, useServer, syncStatus]
  );

  return <EditContext.Provider value={value}>{children}</EditContext.Provider>;
}
