"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button} from "@nextui-org/react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Toast } from "@livekit/components-react";
// import DefaultLayout from "../userdetails/layout";
export default function TeacherDetails(){
    const [data,setData] = useState([])
    useEffect(()=>{
      console.log("entered in setdata")
        const fetchAllData = async ()=>{
            try{
                const res = await axios.get("http://localhost:9900/showteachersDetails")
                setData(res.data)
                console.log("teacher details in admin is",data) 
            }catch(e){
                console.log(e);
            }
        }
        fetchAllData()  
    },[])
    const handleDelete = async (teacherid:any)=>{
        try{
            await axios.delete("http://localhost:9900/deleteteacher/" +teacherid)
            alert(" deleted successfully");
        } catch(err){
            console.log(err)
        }
    }
    return(
        <>
        {/* <DefaultLayout> */}
        <Breadcrumb pageName="teacher Details"/>
       
         <div style={{width:"80%"}}>
        


        <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>E-Mail</TableColumn>
        <TableColumn>Date of Birth</TableColumn>
        <TableColumn>Age</TableColumn>
        <TableColumn>Contact</TableColumn>
        <TableColumn>Subject</TableColumn>
        <TableColumn>Button</TableColumn>
      </TableHeader>
      <TableBody>
      {data.map(data=>(
        <TableRow>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.email}</TableCell>
              <TableCell>{data.dob}</TableCell>
              <TableCell>{data.age}</TableCell>
              <TableCell>{data.phone}</TableCell>
              <TableCell>{data.subject}</TableCell>
              <TableCell> 
                {/* <button className='delete' onClick={()=>handleDelete(books.id)}>Delete</button> */}
              <Button color="danger" onClick={()=>handleDelete(data.teacherid)}>
                Delete Teacher
              </Button> 
              {/* &nbsp;&nbsp;
              <Button color="warning">
                Update Teacher
              </Button>  */}
              </TableCell>
        </TableRow>
          ))} 
      </TableBody>
    </Table>
          </div>
    {/* </DefaultLayout> */}
        </>
    )
}