const e = require('express');
const app = e();

app.use((req, res, next) => {
    console.log('middleware!!!!!!');
    next();
});

app.use((req, res, next) => {
    console.log('GBH');
    res.send({'key': 'value'});
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
