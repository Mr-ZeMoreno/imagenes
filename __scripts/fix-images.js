#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const imgDir = path.resolve('./'); // o la ruta de tu repo de imágenes

function sanitizeFilename(filename) {
  return filename
    .replace(/\s+/g, '-')          // espacios → guiones
    .replace(/[()]/g, '')          // eliminar paréntesis
    .replace(/:/g, '-')            // reemplazar : con -
    .replace(/á/g, 'a')            // reemplazar acentos
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u');
}

// Leer todos los archivos en la carpeta (no recursivo, recursivo si quieres)
const files = fs.readdirSync(imgDir);

for (const file of files) {
  const oldPath = path.join(imgDir, file);
  const newName = sanitizeFilename(file);
  const newPath = path.join(imgDir, newName);

  if (oldPath !== newPath && !fs.existsSync(newPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`${file} → ${newName}`);
  }
}

console.log('✅ Todos los archivos de imágenes han sido normalizados');
