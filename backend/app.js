const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();

const mongo=require('./util/db');

mongo()

// Import Mongoose model
const User = require('./model/user');
const Order = require('./model/order');
const Expense = require('./model/expense');
const ForgotPassword = require('./model/forgotPassword');


app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json()); // for handling JSON files
app.use(helmet());

const logFile = fs.createWriteStream('access.log', { flags: 'a' });

app.use(morgan('combined', { stream: logFile }));

// Importing controllers
const get = require('./controllers/signIn');
const del = require('./controllers/deleteExpense');
const check = require('./controllers/checkUser');
const add = require('./controllers/add');
const addExp = require('./controllers/addExpense');
const fetchExp = require('./controllers/fetchExpense');
const createOrder = require('./controllers/createOrder_AtRazorPay');
const updateOrder = require('./controllers/updateOrder');
const updateUser = require('./controllers/User/updateUserPremium');
const chkPrem = require('./controllers/User/checkUserPremium');
const leader = require('./controllers/Premium/fetchLeaderBoard');
const pass = require('./controllers/User/forgotPassword');
const update = require('./controllers/User/updatePassword');
const download = require('./controllers/Premium/downloadReport');

app.use('/expense/adduser',add)
app.use('/expense/signInUser',get)
app.use('/expense/checkUser',check)
app.use('/expense/updatePassword',update)
app.use('/expense/check-userPremium',chkPrem)
app.use('/premium/fetch-leaderBoard',leader)

app.use('/user/forgot-password',pass)
app.use('/user/updatePassword',update)
app.use('/premium/download-report',download)



//expense adding and updating
app.use('/expense/addExpense',addExp)
app.use('/expense/fetchExpense',fetchExp)
app.use('/expense/deleteExpense',del)



//RazorPay CRUD operations
app.use('/expense/create-RazorPayId',createOrder)
app.use('/expense/updateOrder',updateOrder)
app.use('/expense/update-User-status',updateUser)

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
   console.log(req.url);
   res.status(200).sendFile(path.join(__dirname, 'public', req.url));
});

app.listen(8000, () => {
    console.log('Server running on http://localhost:8000');
});
