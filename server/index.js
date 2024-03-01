import express from 'express'
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"fithub",
    // insecureAuth: true
})
if(!db){
    console.log("db connected")
}
else{
    console.log("connected")
}
app.get("/",(req,res)=>{
    res.json("hello this is the backend and your connected to the database")
})


app.use(express.json())
app.use(cors())

app.get("/login/:email",(req,res)=>{
    // res.json("Now you are connected to the books route")
    const q = "SELECT pass FROM user where name=(?)"
    const val = req.body.name
    console.log(val)
    db.query(q,val,(err,data)=>{
        if(err){
            // return res.json("Cannot select data from table")
             return res.json(err)
        }
        else{
            // res.json("Can select data from table")
            return res.json(data)
        }
    })
})
app.get("/showUserDetails",(req,res)=>{
    const q = "SELECT iduser,username,useremail,dob,age,contact,gender FROM user"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
app.post("/register",(req,res)=>{
    const q ="INSERT INTO user (`username`,`useremail`,`dob`,`age`,`password`,`contact`,`gender`,`bmi`) VALUES (?)"
    const values = [
        req.body.name,
        req.body.email,
        req.body.dob,
        req.body.age,
        req.body.password,
        req.body.contact,
        req.body.gender,
    ]
    const weigh = parseInt(req.body.weight)
    const heigh = parseInt(req.body.height)
    const h = heigh/100
    const bmi = weigh/(h*h)
    // console.log(weigh)
    // console.log(heigh)
    // console.log(h)
    // console.log(bmi)
    values[7] = bmi.toString()
    console.log(values)
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("data has been added")
    })
})
app.listen(9900, ()=>{
    console.log("Connected to the server")
})