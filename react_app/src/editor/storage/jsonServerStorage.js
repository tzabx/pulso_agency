/**
 * Persistencia con json-server
 * Reemplaza localStorage para guardar cambios directamente en db.json
 */

const JSON_SERVER_URL = 'http://localhost:3001';

/**
 * Carga los datos desde json-server
 */
export async function loadFromServer() {
  try {
    const [homeRes, siteRes] = await Promise.all([
      fetch(`${JSON_SERVER_URL}/home`),
      fetch(`${JSON_SERVER_URL}/site`),
    ]);

    if (!homeRes.ok || !siteRes.ok) {
      throw new Error('Error loading from server');
    }

    const home = await homeRes.json();
    const site = await siteRes.json();

    return { home, site };
  } catch (error) {
    console.error('Failed to load from json-server:', error);
    throw error;
  }
}

/**
 * Guarda los datos al json-server
 */
export async function saveToServer(draft) {
  try {
    const [homeRes, siteRes] = await Promise.all([
      fetch(`${JSON_SERVER_URL}/home`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft.home),
      }),
      fetch(`${JSON_SERVER_URL}/site`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft.site),
      }),
    ]);

    if (!homeRes.ok || !siteRes.ok) {
      throw new Error('Error saving to server');
    }

    console.log('✓ Datos guardados en servidor');
    return true;
  } catch (error) {
    console.error('Failed to save to json-server:', error);
    throw error;
  }
}

/**
 * Verifica si json-server está disponible
 */
export async function isServerAvailable() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    
    const res = await fetch(`${JSON_SERVER_URL}/home`, { 
      method: 'GET',
      signal: controller.signal
    });
    
    clearTimeout(timeout);
    return res.ok;
  } catch {
    return false;
  }
}
