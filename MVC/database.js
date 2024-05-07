const { error } = require('console');
const sql=require('mysql2');
//const config=require('config');
const connection=sql.createPool(
{
    host:'localhost',
    port: 3306,
    databse:'test',
    user:'root',
    password:'oracle'
});

module.exports=connection.promise();


