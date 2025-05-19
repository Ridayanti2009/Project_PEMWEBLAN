import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { credentials } from '../admin_credentials.js'; // data login admin
import { parse } from 'querystring';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const route = {
  '/': async (req, res) => {
    res.writeHead(302, { Location: '/login' });
    res.end();
  },

  '/login': async (req, res) => {
    if (req.method === 'GET') {
      const html = await readFile(path.join(__dirname, '../page/login.html'), 'utf-8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    } else if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });

      req.on('end', async () => {
        const parsed = parse(body);
        const { username, password } = parsed;

        // ✅ Hardcoded credentials check
        if (username === credentials.username && password === credentials.password) {
          // Redirect to dashboard
          res.writeHead(302, { Location: '/admin_dashboard' });
          res.end();
        } else {
          // Show login with error (simple, no template engine)
          const html = await readFile(path.join(__dirname, '../page/login.html'), 'utf-8');
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(html.replace('{% if error %}{{ error }}{% endif %}', '<p style="color:red;">Login gagal</p>'));
        }
      });
    }
  },

  '/admin_dashboard': async (req, res) => {
    const html = await readFile(path.join(__dirname, '../page/admin_dashboard.html'), 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  },

  '/laporan_list': async (req, res) => {
    const html = await readFile(path.join(__dirname, '../page/laporan_list.html'), 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  }
};
