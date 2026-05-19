#!/usr/bin/env node
/**
 * Sincroniza los archivos JSON de shared/data/ al db.json para json-server
 * Se ejecuta antes de iniciar json-server para cargar los datos más recientes
 */

const fs = require('fs');
const path = require('path');

const sharedDataDir = path.join(__dirname, '../shared/data');
const dbPath = path.join(__dirname, '../db.json');

try {
  // Leer archivos desde shared/data/
  const homeData = JSON.parse(fs.readFileSync(path.join(sharedDataDir, 'home.json'), 'utf-8'));
  const siteData = JSON.parse(fs.readFileSync(path.join(sharedDataDir, 'site.json'), 'utf-8'));

  // Crear estructura para db.json
  const db = {
    home: homeData,
    site: siteData,
  };

  // Escribir a db.json
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  console.log('✓ db.json sincronizado desde shared/data/');
} catch (error) {
  console.error('✗ Error sincronizando db.json:', error.message);
  process.exit(1);
}
