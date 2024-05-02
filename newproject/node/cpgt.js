const express = require('express');
const fs = require('fs');
const app = express();

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  fs.readFile("usrname.txt", (err, data) => {
    if (err) {
      console.log(err);
      data = "no chat exists";
    }
    res.send(
      `${data}<form action="/" method="POST">
      <input type="text" name="message" placeholder="Message">
      <input type="text" name="username" placeholder="Username">
      <button type="submit">Send Message</button>
      </form>`
    );
  });
});

app.post('/', (req, res) => {
  const username = req.body.username;
  const message = req.body.message;
  fs.writeFile("usrname.txt", `${username}:${message}\n`, { flag: 'a+' }, (err) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
});

app.listen(3000, '127.0.0.1', () => {
  console.log("Server running at http://127.0.0.1:3000");
});
