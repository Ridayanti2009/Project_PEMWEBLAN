import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import read from './utils/read.js';
import formidable from 'formidable';
import mysql from 'mysql2/promise';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Baca halaman HTML statis
const home = await read('./src/page/home.html');

// Buat koneksi pool ke MySQL
const db = await mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // sesuaikan
  database: 'wbs_pemweb'
});

// Dapatkan content type
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

// Buat server
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  // CSS
  if (req.url.startsWith('/css/')) {
    const filePath = path.join(__dirname, req.url);
    return fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('CSS tidak ditemukan');
      }
      res.writeHead(200, { 'Content-Type': 'text/css' });
      return res.end(data);
    });
  }

  // Gambar
  if (req.url.startsWith('/images/')) {
    const filePath = path.join(__dirname, req.url);
    return fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('Gambar tidak ditemukan');
      }
      const contentType = getContentType(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      return res.end(data);
    });
  }

  // Menangani form POST
  if (req.method === 'POST' && req.url === '/submit') {
    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('Terjadi kesalahan saat memproses formulir');
      }

      try {
        // Ambil data dari form
        const kategori = fields.kategori;
        const judul = fields.judul;
        const isi = fields.isi;
        const tanggal = fields.tanggal;
        const lokasi = fields.lokasi || '';
        const nama = fields.nama || null;
        const kontak = fields.kontak || null;
        const anonim = fields.anonim ? 1 : 0;

        // Ambil bukti file sebagai buffer
        const buktiFile = files.bukti?.[0] || files.bukti;
        const buktiBuffer = fs.readFileSync(buktiFile.filepath);

        // Simpan ke DB
        await db.query(`
          INSERT INTO laporan 
          (kategori, judul, isi, bukti, tanggal, lokasi, nama, kontak, anonim) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [kategori, judul, isi, buktiBuffer, tanggal, lokasi, nama, kontak, anonim]);

        res.writeHead(302, { Location: '/' }); // redirect
        return res.end();
      } catch (error) {
        console.error('DB Error:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('Gagal menyimpan data ke database');
      }
    });
    return;
  }

  // Halaman utama
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(home);
  res.end();
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
