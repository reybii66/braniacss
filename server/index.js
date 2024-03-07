import express from 'express'
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"braniacs",
    insecureAuth: true
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
app.use(cors(
    {
     origin: ["http://localhost:3000"],
     methods: ["POST, GET","DELETE"],
     credentials: true
 }
 ));

app.get("/login/:email",(req,res)=>{
    // res.json("Now you are connected to the books route")
    const q = "SELECT password FROM user where name=(?)"
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
    const q = "SELECT user_id,name,role,email FROM user"
    // const q = "SELECT * FROM user"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
app.post("/user",(req,res)=>{
    const q ="INSERT INTO user (`name`,`role`,`email`,`password`) VALUES (?)"
    const values = [
        req.body.username,
        req.body.role,
        req.body.email,
        req.body.password,
    ]
    console.log("data is",values)
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("data has been added")
    })
})
// adminlogin

app.post("/adminlogin",(req,res)=>{
    // res.json("Now you are connected to the books route")
    // console.log("entered ")
    const q = "SELECT adminname,password FROM admin where adminemail=(?)"
    const val = req.body.adminemail
    const pass = req.body.password
    // console.log(pass)
    // console.log(val)
    db.query(q,val,(err,data)=>{
        if(err){
             return res.json(err)
        }
        else{
            const dbpass = (data[0].password)
            const name = (data[0].adminname)
            // const age = (data[0].age)
            // const token = jwt.sign({name},"our-jsonwebtoken- secrete-key")
            // const tokenAge = jwt.sign({age},"our-jsonwebtokenAge- secrete-key")
            // res.cookie('username',token)
            // res.cookie('userAge',tokenAge)
            if(dbpass === pass){
                return res.json(name)
            }
            if(dbpass != pass){
                return res.json("invalid")
            }
        }
    })
})



app.listen(9900, ()=>{
    console.log("Connected to the server")
})