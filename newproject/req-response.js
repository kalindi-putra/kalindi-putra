const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  const url=req.url;

  if (url === '/home') {
    res.end('Welcome home\n');
  } else if (url === '/about') {
    res.end('Welcome to About Us page\n');
  } else if (url === '/node') {
    res.end('Welcome to my Node Js project\n');
  } 
  
});

server.listen(5500, "127.0.0.1", () => {
  console.log('Server running at http://127.0.0.1:5500/');
});
