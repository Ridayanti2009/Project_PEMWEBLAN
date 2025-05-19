import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import read from './utils/read.js'; // pastikan read.js export default

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Baca halaman login saat server dinyalakan
const login = await read('./page/login.html');

// Fungsi untuk menentukan tipe konten
const getContentType = (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  const types = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
  };
  return types[ext] || 'application/octet-stream';
};

const server = http.createServer((req, res) => {
  console.log(`[ADMIN] ${req.url} ${req.method}`);

  // Handle file CSS
  if (req.url.startsWith('/css/')) {
    const filePath = path.join(__dirname, req.url);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error('Gagal baca CSS:', err);
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('CSS tidak ditemukan');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(data);
    });
    return;
  }

  // Handle gambar
  if (req.url.startsWith('/images/')) {
    const filePath = path.join(__dirname, req.url);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error('Gagal baca gambar:', err);
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Gambar tidak ditemukan');
        return;
      }
      const contentType = getContentType(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
    return;
  }

  // Halaman default: login admin
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(login);
});

server.listen(3001, () => {
  console.log('Admin Server running at http://localhost:3001/');
});
