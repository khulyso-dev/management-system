const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

//connect to database
const db = mysql.createConnection({
        user: "root",
        host: "localhost",
        password: "Khuljohn-studi0",
        database: "regstatus",
    });

    //request the infomation from the from frontend
app.post('/create',(req,res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const age = req.body.age;
    const grade = req.body.grade;
    const gender = req.body.gender;
    

    //insert information to the table
    db.query(
    "INSERT INTO infomation (name, surname, age, grade, gender) Values(?,?,?,?,?,?,?)",
    [name, surname, age, grade, gender],
    (err, result) =>{
        if(err){
            console.log(err)
        }else{
            res.send("values inserted");
        }
    });
});
//get information from database
app.get('/infomation',(req,res) => {
    db.query("SELECT * FROM infomation", (err, result) =>{
        if (err){
            console.log(err)
        }else{
            res.send(result);
        }
    });
});

//running node on server
app.listen(3001, () =>{
    console.log("hey your server is running at port 3001");
})