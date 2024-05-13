const exp=require('express');
const cor=require('cors');
const model =require('./model/User');
app=exp();


app.use(exp.urlencoded({extended:false}));
app.use(cor());
app.use(exp.json()); //for handling json files

//importing controllers
const get=require('./controller/getUser');
const del=require('./controller/deleteUser');
const edit=require('./controller/editUser');
const put=require('./controller/updateUser');
const add=require('./controller/addUser');


app.use('/admin/get-user',get)
app.use('/admin/add-user',add)
app.use('/admin/edit-user',edit);
app.use('/admin/put-user',put);
app.use('/admin/delete-user',del)

app.get('/',(req,res)=>{
    res.status(200).json("thanks for visiting backend")
})

app.listen(3000,()=>{
    console.log('success connection at localhost');
})
