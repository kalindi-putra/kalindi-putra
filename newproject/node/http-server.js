const http = require('http');
const mod=require('./stream_data');

const server = http.createServer(mod.handler);

server.listen(3000, "127.0.0.1", (error) => {
  if(error){
    console.log(error);
  }
  console.log('Server running at http://127.0.0.1:3000/');
});
