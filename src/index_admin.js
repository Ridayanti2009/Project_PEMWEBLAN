import http from 'http';
import { route } from './utils/route.js'; // kita buat route khusus admin juga

const server = http.createServer(async (req, res) => {
  console.log(`[ADMIN] ${req.url} ${req.method}`);

  const login=await read('./src/page/login.html');
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(login);
  res.end();
});

server.listen(3001, () => {
  console.log('Admin Server running at http://localhost:3001/');
});
