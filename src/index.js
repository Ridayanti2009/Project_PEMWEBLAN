import http from 'http';

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write("Hello, World!");
  res.end();
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
}); 
