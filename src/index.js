import http from 'http';
import read from './utils/read.js';

const home=await read('./src/page/home.html');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(home);
  res.end();
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
}); 
