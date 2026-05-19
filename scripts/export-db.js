#!/usr/bin/env node
/**
 * Copia los datos desde db.json de vuelta a shared/data/
 * Útil para sincronizar cambios hechos via json-server hacia los archivos source
 */

const fs = require('fs');
const path = require('path');

const sharedDataDir = path.join(__dirname, '../shared/data');
const dbPath = path.join(__dirname, '../db.json');

try {
  // Leer db.json
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

  // Escribir home.json
  if (db.home) {
    fs.writeFileSync(
      path.join(sharedDataDir, 'home.json'),
      JSON.stringify(db.home, null, 2)
    );
    console.log('✓ shared/data/home.json actualizado');
  }

  // Escribir site.json
  if (db.site) {
    fs.writeFileSync(
      path.join(sharedDataDir, 'site.json'),
      JSON.stringify(db.site, null, 2)
    );
    console.log('✓ shared/data/site.json actualizado');
  }
} catch (error) {
  console.error('✗ Error exportando desde db.json:', error.message);
  process.exit(1);
}
