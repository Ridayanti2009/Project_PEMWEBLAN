// utils/route_admin.js
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// karena __dirname tidak tersedia di ES Module, kita buat sendiri
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const route = {
  '/': async (req, res) => {
    const html = await readFile(path.join(__dirname, '../page/login.html'), 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  },

  '/login': async (req, res) => {
    const html = await readFile(path.join(__dirname, '../page/login.html'), 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  },

  '/admin_dashboard': async (req, res) => {
    const html = await readFile(path.join(__dirname, '../page/admin_dashboard.html'), 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  }
};

