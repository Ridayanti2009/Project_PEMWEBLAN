import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import read from './utils/read.js';

// Mengubah __dirname untuk ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const home = await read('./src/page/home.html');

// Fungsi untuk menentukan tipe konten berdasarkan ekstensi file
const getContentType = (filePath) => {
  const extname = path.extname(filePath).toLowerCase();
  const contentTypes = {
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
  
  return contentTypes[extname] || 'application/octet-stream';
};

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  
  // Menangani permintaan CSS
  if (req.url.startsWith('/css/')) {
    const filePath = path.join(__dirname, req.url);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error('Error reading CSS file:', err);
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File CSS tidak ditemukan');
        return;
      }
      
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(data);
    });
    return;
  }
  
  // Menangani permintaan gambar
  if (req.url.startsWith('/images/')) {
    const filePath = path.join(__dirname, req.url);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error('Error reading image file:', err);
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File gambar tidak ditemukan');
        return;
      }
      
      const contentType = getContentType(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
    return;
  }
  
  // Menangani permintaan halaman utama
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(home);
  res.end();
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});