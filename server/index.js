
import express from 'express'
import mysql from "mysql"
import cors from "cors"
import session from 'express-session';
import cookieParser from 'cookie-parser';
import jwt, { decode } from "jsonwebtoken"

import multer from 'multer';

const app = express()
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST, GET", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
// app.use(session({
//      secret: 'secret',
//      resave: false,
//      saveUninitialized: false,
//      cookie:{
//         secure:tfalse,  // set this to true if using
//         maxAge: 1000 * 60 * 60 * 24   // expires in 24 hours    
//      }
// }));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "braniacs",
    insecureAuth: true
})
if (!db) {
    console.log("db connected")
}
else {
    console.log("connected")
}
app.get("/", (req, res) => {
    res.json("hello this is the backend and your connected to the database")
})


// StudentEmail Token
const getStudentEmail = (req,res,next) =>{
    const tokenEmail = req.cookies.studentemail;

    if(!tokenEmail){
        return res.json({Message: "we need token please. Login now"})
    } else {
        jwt.verify(tokenEmail,"our-jsonwebtokenEmail- secrete-key",(err,decode)=>{
            if(err){

                return res.json({Message: "Authentication error."})
            } else {
                req.email = decode.email;
                next();
            }
        })
    }
}
app.get('/studentEmail',getStudentEmail,(req,res)=>{
    return res.json({Status: "Success",studentemail: req.email})
})

//  studentname token
const getStudentName = (req, res, next) => {
    const token = req.cookies.studentname;

    if (!token) {
        return res.json({ Message: "we need token please. Login now" })
    } else {
        jwt.verify(token, "our-jsonwebtoken- secrete-key", (err, decode) => {
            if (err) {
                return res.json({ Message: "Authentication error." })
            } else {
                req.name = decode.name;
                // req.age = decode.age;
                next();
            }
        })
    }
}
app.get('/token', getStudentName, (req, res) => {
    return res.json({ Status: "Success", name: req.name })
})


//  Admin Name token
const getAdminName = (req, res, next) => {
    const token = req.cookies.adminname;
    // console.log(token)
    if (!token) {
        return res.json({ Message: "we need token please. Login now" })
    } else {
        jwt.verify(token, "our-jsonwebtoken- secrete-key", (err, decode) => {
            if (err) {
                return res.json({ Message: "Authentication error." })
            } else {
                req.name = decode.name;
                // req.age = decode.age;
                // console.log(req.name)
                next();
            }
        })
    }
}
app.get('/admintoken', getAdminName, (req, res) => {
    return res.json({ Status: "Success", name: req.name })
})



app.post("/login", (req, res) => {
    // res.json("Now you are connected to the books route")
    const q = "SELECT password FROM user where email=(?)"
    const val = req.body.email
    const pas = req.body.pass
    console.log(val)
    console.log(pas)
    db.query(q, val, (err, data) => {
        console.log(data)
        const dbpass = (data[0].password)
        console.log(dbpass)
        if (err) {
            // return res.json("Cannot select data from table")
            return res.json(err)
        }
        else {
            // res.json("Can select data from table")
            if (dbpass === pas) {
                return res.json("Success")
            } else {
                return res.json("Invalid User")
            }
        }
    })
})
// app.get("/showUserDetails",(req,res)=>{
//     const q = "SELECT user_id,name,role,email FROM user"
//     // const q = "SELECT * FROM user"
//     db.query(q,(err,data)=>{
//         if(err) return res.json(err)
//         return res.json(data)
//     })
// })

// studentsdetails
app.get("/showStudentsDetails", (req, res) => {
    // const q = "SELECT iduser, username, useremail, dob,age,contact,gender FROM user"
    const q = "SELECT * FROM student"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        // console.log(data[2].iduser)
        return res.json(data)
    })
})
// teachersdetails
app.get("/showTeachersDetails", (req, res) => {
    // const q = "SELECT iduser, username, useremail, dob,age,contact,gender FROM user"
    const q = "SELECT * FROM teacher"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        // console.log(data[2].iduser)
        return res.json(data)
    })
})


//delete studentdetails
app.delete("/deletestudent/:idstudent", (req, res) => {
    // console.log("entered in server delete")
    const iduser = req.params.iduser
    const q = "DELETE FROM student where studentid = (?)"
    // console.log("")
    db.query(q, iduser, (err, data) => {
        if (err) return res.json(err);
        return res.json("user has been deleted successfully");
    })
})
//delete teacherdetails
app.delete("/deleteteacher/:idteacher", (req, res) => {
    // console.log("entered in server delete")
    const iduser = req.params.iduser
    const q = "DELETE FROM teacher where teacherid = (?)"
    // console.log("")
    db.query(q, iduser, (err, data) => {
        if (err) return res.json(err);
        return res.json("Teacher has been deleted successfully");
    })
})

app.post("/user", (req, res) => {
    const q = "INSERT INTO user (`name`,`role`,`email`,`password`) VALUES (?)"
    const values = [
        req.body.username,
        req.body.role,
        req.body.email,
        req.body.password,
    ]
    console.log("data is", values)
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("data has been added")
    })
})

//student login
app.post("/studentlogin", (req, res) => {
    // res.json("Now you are connected to the books route")
    const q = "SELECT * FROM student where email=(?)"
    const val = req.body.email;
    const pas = req.body.password;

    // console.log(val)
    // console.log(pas)
    db.query(q, val, (err, data) => {
        const dbpass = (data[0].password)
        const name = (data[0].name)
        console.log(dbpass)
        if (err) {
            // return res.json("Cannot select data from table")
            return res.json(err)
        }
        else {
            const Studenttoken = jwt.sign({ val }, "our-jsonwebtoken- secrete-key")
            const studentname = jwt.sign({ name }, "our-jsonwebtoken- secrete-key")
            // const tokenEmail = jwt.sign({email},"our-jsonwebtokenEmail- secrete-key")
            // const tokenPass = jwt.sign({dbpass},"our-jsonwebtokenTPassword- secrete-key")
            res.cookie('studentemail', Studenttoken)
            res.cookie('studentname', studentname)
            // res.cookie('userEmail',tokenEmail)
            // res.json("Can select data from table")
            if (dbpass === pas) {

                return res.json("Success")
            } else {
                return res.json("Invalid User")
            }
        }
    })
})



//student register
app.post("/studentregister", (req, res) => {
    console.log("student data entered")
    const q = "INSERT INTO student (`name`,`email`,`phone`,`dob`,`class`,`syllabus`,`age`,`password`) VALUES (?)"
    const values = [
        req.body.fullname,
        req.body.email,
        req.body.phone,
        req.body.dob,
        req.body.class,
        req.body.syllabus,
        req.body.age,
        req.body.password,
    ]
    console.log("data is", values)
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("data has been added")
    })
})





//teacher register
app.post("/teacherregister", (req, res) => {
    console.log("teacher data entered")
    const q = "INSERT INTO teacher (`name`,`email`,`phone`,`dob`,`age`,`subject`,`password`) VALUES (?)"
    const values = [
        req.body.fullname,
        req.body.email,
        req.body.phone,
        req.body.dob,
        req.body.age,
        req.body.subject,
        req.body.password,
    ]
    console.log("data is", values)
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("data has been added")
    })
})

//  teachername token
const getTeacherName = (req, res, next) => {
    const token = req.cookies.TtokenName;

    if (!token) {
        return res.json({ Message: "we need token please. Login now" })
    } else {
        jwt.verify(token, "our-jsonwebtoken- secrete-key", (err, decode) => {
            if (err) {
                return res.json({ Message: "Authentication error." })
            } else {
                req.name = decode.name;
                // req.age = decode.age;
                next();
            }
        })
    }
}
app.get('/teachertoken', getTeacherName, (req, res) => {
    return res.json({ Status: "Success", name: req.name })
})


//teacher login
app.post("/teacherlogin", (req, res) => {
    // res.json("Now you are connected to the books route")
    const q = "SELECT * FROM teacher where email=(?)"
    const val = req.body.email
    const pas = req.body.password
    console.log(val)
    console.log(pas)
    db.query(q, val, (err, data) => {
        const dbpass = (data[0].password)
        const name = (data[0].name)
        const age = (data[0].age)
        console.log(name)
        console.log(dbpass)
        if (err) {
            // return res.json("Cannot select data from table")
            return res.json(err)
        }
        else {

            const TeacherEmail = jwt.sign({ val}, "our-jsonwebtoken- secrete-key")
            const TeacherName = jwt.sign({ name }, "our-jsonwebtoken- secrete-key")
            // const TeacherAge = jwt.sign({ age }, "our-jsonwebtoken- secrete-key")
            // const tokenEmail = jwt.sign({email},"our-jsonwebtokenEmail- secrete-key")
            // const Teacher = jwt.sign({ email:val,name:name,age:age}, "our-jsonwebtoken- secrete-key")
            res.cookie("Ttoken",TeacherEmail)
            res.cookie("TtokenName",TeacherName)
            
            // const tokenPass = jwt.sign({dbpass},"our-jsonwebtokenTPassword- secrete-key")

            // res.cookie('teacheremail',{temail: TeacherEmail,tname:TeacherName})
            // res.cookie('teachername', Teachername)
            // res.json("Can select data from table")

            // res.cookie("TtokenEmail",TeacherEmail)
            // res.cookie("TtokenName",TeacherName)
            // res.cookie("TtokenAge",TeacherAge)


            if (dbpass === pas) {
                return res.json("Success")
            } else {
                return res.json("Invalid User")
            }
        }
    })
})



// adminlogin

app.post("/adminlogin", (req, res) => {
    // res.json("Now you are connected to the books route")
    // console.log("entered ")
    const q = "SELECT * FROM admin where adminemail=(?)"
    const val = req.body.adminemail
    const pass = req.body.password
    console.log(pass)
    console.log(val)
    db.query(q, val, (err, data) => {
        if (err) {
            return res.json(err)
        }
        else {
            const dbpass = (data[0].password)
            const name = (data[0].name)
            const Admintoken = jwt.sign({ val }, "our-jsonwebtoken- secrete-key")
            const Adminname = jwt.sign({ name }, "our-jsonwebtoken- secrete-key")
            // const tokenEmail = jwt.sign({email},"our-jsonwebtokenEmail- secrete-key")
            // const tokenPass = jwt.sign({dbpass},"our-jsonwebtokenTPassword- secrete-key")
            res.cookie('adminemail', Admintoken)
            res.cookie('adminname', Adminname)


            // const age = (data[0].age)
            // const token = jwt.sign({name},"our-jsonwebtoken- secrete-key")
            // const tokenAge = jwt.sign({age},"our-jsonwebtokenAge- secrete-key")
            // res.cookie('username',token)
            // res.cookie('userAge',tokenAge)
            if (dbpass === pass) {
                return res.json(name)
            }
            if (dbpass != pass) {
                return res.json("invalid")
            }
        }
    })
})

// studentemail
app.get("/showStudentEmail", (req, res) => {
    // const q = "SELECT iduser, username, useremail, dob,age,contact,gender FROM user"
    const q = "SELECT studentid,email FROM student"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        // console.log(data)
        return res.json(data)
    })
})
// teacherEmail
app.get("/showTeacherEmail", (req, res) => {
    // const q = "SELECT iduser, username, useremail, dob,age,contact,gender FROM user"
    const q = "SELECT teacherid,email FROM teacher"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        // console.log(data)
        return res.json(data)
    })
})
// schedule storing
app.post("/schedulemeet", (req, res) => {
    const q = "INSERT INTO classschedule (`studentemail`,`teacheremail`,`date`,`time`,`limit`,`studentlink`,`teacherlink`,`classname`) VALUES (?)"
    const values = [
        req.body.studentemail,
        req.body.teacheremail,
        req.body.date,
        req.body.time,
        req.body.timelimit,
    ]
    const classname = req.body.room
    values[5] = `http://localhost:3000/room?room=${classname}&name=${values[0]}`
    values[6] = `http://localhost:3000/room?room=${classname}&name=${values[1]}`
    values[7] = classname
    // console.log(values[4])
    console.log(values)
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        console.log(err)
        console.log("data added")
        return res.json("data has been added")
    })
})




// Teacher schedule
app.get("/showScheduleteacher", (req, res) => {
    // console.log("entered to showSchedule")

    const Etoken = req.cookies.Ttoken;
    // const Ntoken = req.cookies.TtokenName;
    // const Atoken = req.cookies.TtokenAge;
    // console.log("Email",Etoken);
    // console.log("NAme",Ntoken);
    // console.log("age",Atoken);
    const token = req.cookies.teacheremail;

    console.log("new token i",token)

    jwt.verify(Etoken, "our-jsonwebtoken- secrete-key", (err, decode) => {
        if (err) {

            return res.json({ Message: "Authentication error." })
        } else {
            req.val = decode.val;
            console.log(req.val)
            // next();
        }
    })

    // req.email = decode.email
    // console.log("email is",req.email)
    const email = req.val
    console.log("email is",email)
    const q = "SELECT * FROM classschedule where teacheremail=(?)"
    db.query(q, email, (err, data) => {
        if (err) return res.json(err)
        // console.log("data is not yet ")
        return res.json(data)
    })
})

//request Class
app.post("/requestClass",(req,res) => {
    const q = "INSERT INTO requestclass (`studentemail`,`date`,`description`) VALUES (?)"
    const values = [
        req.body.studentemail,
        req.body.date,
        req.body.description,
    ]
   
    db.query(q, [values], (err,data) => {
        if (err) return res.json(err)
        console.log(err)
        console.log("Request Data added")
        return res.json("data has been added")
    })
})

// Student schedule
app.get("/showSchedule", (req, res) => {
    console.log("entered to showSchedule")
    const tokenEmail = req.cookies.studentemail;
    // console.log(tokenEmail);
    jwt.verify(tokenEmail, "our-jsonwebtoken- secrete-key", (err, decode) => {
        if (err) {

            return res.json({ Message: "Authentication error." })
        } else {
            req.val = decode.val;
            console.log(req.val)
            // next();
        }
    })

    // req.email = decode.email
    // console.log("email is",req.email)
    const email = req.val
    // console.log("email is",tokenEmail)
    const q = "SELECT * FROM classschedule where studentemail=(?)"
    db.query(q, email, (err, data) => {
        if (err) return res.json(err)
        // console.log(data)
        return res.json(data)
    })
})
// list all scheduled meeting
app.get("/showAllMeetings", (req, res) => {
    // const q = "SELECT iduser, username, useremail, dob,age,contact,gender FROM user"
    const q = "SELECT * FROM classschedule"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        // console.log(data[2].iduser)
        return res.json(data)
    })
})





// upload notes to particular student
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null,
            uniqueSuffix+
            file.originalname)
        }
    })
    
    //   const PdfSchema = mongoose.model("PdfDetails")
    const upload = multer({ storage: storage })
    app.post("/noteupload",upload.single('file'),async(req,res)=>{
        const q = "INSERT INTO subject_notes (teacher_email,student_email,subjec_tname,file_loc) VALUES (?)"
        console.log("file uploaded")
        // const title = req.body.title
        // const name = req.body.name
        const fileName = req.file.filename
        const values =[
            req.body.teacher_email,
            req.body.student_email,
            req.body.subjec_tname,
        ]
        const file_loc = "http://localhost:9900/files/"+fileName
        values[3] = file_loc
        console.log(file_loc)
        console.log(values)
    // console.log(name)
    // res.send('upload successfully')
    try{
        // await PdfSchema.create({name:name,email:title,pdf: fileName})
        // res.send({status:"ok"});
        db.query(q,[values],(err,data)=>{
            if(err) return res.json(err)
            res.send({status:"ok"})
        })
    }
    catch(e){
        res.json({status:e})
    }
})




app.listen(9900, () => {
    console.log("Connected to the server")
})