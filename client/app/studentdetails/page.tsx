"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button} from "@nextui-org/react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
export default function UserDetails(){
    const [data,setData] = useState([])
    useEffect(()=>{
      console.log("entered in setdata")
        const fetchAllData = async ()=>{
            try{
                const res = await axios.get("http://localhost:9900/showStudentsDetails")
                setData(res.data)
                console.log("Student details in admin is",data) 
            }catch(e){
                console.log(e);
            }
        }
        fetchAllData()  
    },[])
    const handleDelete = async (id:any)=>{
        try{
            await axios.delete("http://localhost:9900/deletestudent/"+id)
            window.location.reload()
        } catch(err){
            console.log(err)
        }
    }
    return(
        <>
        <Breadcrumb pageName="Student Details"/>
        <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>E-Mail</TableColumn>
        <TableColumn>Date of Birth</TableColumn>
        <TableColumn>Age</TableColumn>
        <TableColumn>Contact</TableColumn>
        <TableColumn>Syllabus</TableColumn>
        <TableColumn>Class</TableColumn>
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
              <TableCell>{data.syllabus}</TableCell>
              <TableCell>{data.class}</TableCell>
              <TableCell> 
                {/* <button className='delete' onClick={()=>handleDelete(books.id)}>Delete</button> */}
              <Button color="danger" onClick={()=>handleDelete(data.studentid)}>
                Delete User
              </Button> &nbsp;&nbsp;
              <Button color="warning">
                Update User
              </Button> 
              </TableCell>
        </TableRow>
          ))} 
      </TableBody>
    </Table>
        
        </>
    )
}