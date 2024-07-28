const exp=require('express');
const cor=require('cors');
app=exp();
const path=require('path')
const fs=require('fs')
const helmet=require('helmet')
const morgan=require('morgan')


app.use(exp.urlencoded({extended:false}));
app.use(cor());
app.use(exp.json()); //for handling json files
app.use(helmet())


const logFile=fs.createWriteStream('access.log',{flags:'a'})

app.use(morgan('combined',{stream:logFile}))

//importing controllers
const user=require('./controllers/userController')
const charity=require('./controllers/charity')
const donation=require('./controllers/Donation')


app.use('/user',user)
app.use('/charity',charity)



app.get('/',(req,res)=>{
   console.log(req.url);
   res.json('welcome to backend of donate kart');
})




app.listen(8000,()=>
{
    console.log('success connection at localhost');
})
