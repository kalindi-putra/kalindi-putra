const http = require('http');
const fs = require('fs');

const handler =(req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title><head>');
    fs.readFile('message.txt','utf8',(err,data)=>{
        res.write('<body><h2>'+data+'</h2></body>');
    })

    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message , err=>{

       if(err){    
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');
        return;
    }
        
         res.statusCode = 302;
         res.setHeader('Location', '/',);
         res.setHeader('Content-Type', 'text/plain');
         res.write('<html>');
         res.write('<body><p>'+message+'</p></body>');
         res.write('</html>');
         
   
          res.end();

      });

    });
    
  }
  
  //res.end();
};
module.exports={
   handler:handler
};
//server.listen(3000,'127.0.0.1');
