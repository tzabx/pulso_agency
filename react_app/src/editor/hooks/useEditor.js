import { useContext } from 'react';
import { EditContext } from '../state/EditProvider';

export function useEditor() {
  const context = useContext(EditContext);

  if (!context) {
    throw new Error('useEditor debe usarse dentro de EditProvider');
  }

  return context;
}
