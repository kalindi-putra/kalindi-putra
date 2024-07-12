const exp=require('express');
const cor=require('cors');
app=exp();
const path=require('path')
const fs=require('fs')
const Order=require('./model/order')
const User=require('./model/user')
const Expense=require('./model/expense')
const Forg=require('./model/forgotPassword')
const helmet=require('helmet')
const morgan=require('morgan')


app.use(exp.urlencoded({extended:false}));
app.use(cor());
app.use(exp.json()); //for handling json files
app.use(helmet())


const logFile=fs.createWriteStream('acccess.log',{flags:'a'})

app.use(morgan('combined',{stream:logFile}))

//importing controllers

const get=require('./controllers/signIn');
const del=require('./controllers/deleteExpense')
//const edit=require('./controller/editUser');
const check=require('./controllers/checkUser');
const add=require('./controllers/add');
const addExp=require('./controllers/addExpsense')
const fetchExp=require('./controllers/fetchExpense')
const createOrder=require('./controllers/createOrder_AtRazorPay')
const updateOrder=require('./controllers/updateOrder')
const updateUser=require('./controllers/User/updateUserPremium');
//const Order = require('./model/order');
const chkPrem=require('./controllers/User/checkUserPremium')
const leader=require('./controllers/Premium/fetchLeaderBoard')
const pass=require('./controllers/User/forgotPassword')

const update=require('./controllers/User/updatePassword')
const download=require('./controllers/Premium/downloadReport')




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


//definig relation
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId', targetKey:'userId' });

User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId', targetKey:'userId' });


User.hasMany(Forg,{foreignKey:'userId'})
Forg.belongsTo(User, { foreignKey: 'userId', targetKey:'userId' });


app.use(exp.static(path.join(__dirname, 'public')));



app.get('/',(req,res)=>{
   // res.status(200).json("thanks for visiting backend")
   console.log(req.url);
   res.status(200).sendFile(path.join(__dirname,'public',req.url))
})




app.listen(3000,()=>
{
    console.log('success connection at localhost');
})
