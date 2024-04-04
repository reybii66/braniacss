"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";



export default function addNotes() {
    const [studemail, setStudentEmail] = useState("");
    const [teachemail, setTeacherEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [file, setFile] = useState("");
    const [studentemail, setStudEmail] = useState([]);
    const [message, setMessage] = useState('')


    // gettingteacherName
    //   useEffect(()=>{
    //     console.log("entered in setMessage")
    //     axios.get('http://localhost:9900/teachertoken').then(res=>{
    //       if(res.data.Status === "Success"){
    //         setName(res.data.name)
    //       } else {
    //         setMessage(res.data.Message)
    //       }
    //     })
    //   },[])



    // fetchStudentEmail
    useEffect(() => {

        console.log("entered in setdata")
        const fetchEmail = async () => {
            try {
                const res = await axios.get("http://localhost:9900/showStudentEmail")
                setStudEmail(res.data)

            } catch (e) {
                console.log(e);
            }
        }
        fetchEmail()
    }, [])
    const submitFile = async (e: any) => {
        e.preventDefault();
        console.log("entered in file submit");
        const formData = new FormData();
        formData.append("studentemail", studemail);
        formData.append("teacheremail", teachemail);
        formData.append("subject", subject);
        formData.append("file", file);
        // console.log(file);
        const result = await axios.post("http://localhost:9900/noteupload",
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" }
            });
        console.log(result)
        alert("File Uploaded")
        // window.location.reload();
    }

    // console.log(email, subject);
    return (
        <>
            <Breadcrumb pageName="Add Notes" />

            <form>

                <div className="grid grid-flow-row gap-4 mt-5 max-w-md ">
                    <Input
                        type="Email"
                        name="teacheremail"
                        placeholder="Teacher Email"
                        isRequired
                        onChange={(e) => setTeacherEmail(e.target.value)} />
                    <Select
                        label="Select Student Email"
                        placeholder="Select email"
                        name='studentemail'
                        onChange={(e) => setStudentEmail(e.target.value)}
                    >
                        {studentemail.map(email => (
                            <SelectItem
                                key={email.email}
                            // key={email.iduser}
                            // value={email.useremail}
                            >
                                {email.email}
                            </SelectItem>
                        ))}
                    </Select>

                    <Input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        onChange={(e) => setSubject(e.target.value)}
                        isRequired />
                    <Input
                        type="file"
                        name="file"
                        placeholder="file"
                        accept="application/pdf"
                        onChange={(e) => setFile(e.target.files[0])}
                        isRequired />

                    <Button
                        type="submit"
                        className="w-20 h-9"
                        onClick={submitFile}
                        color="primary"
                        variant="bordered">
                        Upload
                    </Button>
                </div>
            </form>
        </>
    )
}