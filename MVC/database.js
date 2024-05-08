//const { error } = require('console');
const sql=require('sequelize');
//const config=require('config');
const connection=new sql('test','root','oracle',
{
    dialect:'mysql',
    host:'localhost'
});

//console.log(connection.listenerCount())

module.exports=connection;




