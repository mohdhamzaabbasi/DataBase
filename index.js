const express=require("express");
const app=express();
let port=8080;
const path=require("path");
const over=require("method-override");
app.use(over("_method"));
app.listen(port,()=>{
    console.log("Server Started!");
});
app.use(express.urlencoded({extended : true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
const { faker } = require('@faker-js/faker');
let getRandomUser=()=> {
    return [
      faker.string.uuid(),
      faker.internet.userName(),
      faker.internet.email(),
      faker.internet.password(),
    ];
}
const mysql = require('mysql2');
const connection=mysql.createConnection({
host: 'localhost',
user: 'root',
database: 'INFO',
password: 'Hamzalfs@7086'
});
app.get("/",(req,res)=>{
    let q="Select * FROM new_data";
    let data;
    try{
        connection.query(q,(err,resp)=>{
            if(err)
            {
                throw err;
            }
            let datas=resp;
            res.render("index.ejs",{datas});
        }); 
    } 
    catch{
        console.log("eRROR");
    }
    connection.end();
});