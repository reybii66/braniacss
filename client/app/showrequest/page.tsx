"use client"
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import React, { useEffect, useState } from 'react'
import DefaultLayout from '../admindash/layout'
import { Button } from '@nextui-org/button'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function showRequest() {
    const router = useRouter()
  const [data,setData] = useState([])
  useEffect(()=>{
    // console.log("entered in setdata")
      const fetchAllData = async ()=>{
        // console.log("entered in fetchall")
          try{
              const res = await axios.get("http://localhost:9900/showStudentRequest")
              setData(res.data)
              console.log("Student details in admin is",data) 
          }catch(e){
              console.log(e);
          }
      }
      fetchAllData()  
  },[])
  const handleDelete = async (idrequestclass:any)=>{
      try{
          await axios.delete("http://localhost:9900/deleteRequest/"+idrequestclass)
          
          // router.push("/showreq")
      } catch(err){
          console.log(err)
      }
  }
  return (
    <div>
        <DefaultLayout>
        <Breadcrumb pageName='Show Request' />
        {/* <div>User Request</div><br /> */}
    <div style={{width:"80%"}}>

    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Student Email</TableColumn>
        <TableColumn>Date</TableColumn>
        <TableColumn>Discription</TableColumn>
        {/* <TableColumn>Date of Birth</TableColumn>
        <TableColumn>Age</TableColumn>
        <TableColumn>Contact</TableColumn> */}
        <TableColumn>Button</TableColumn>
      </TableHeader>
      <TableBody>
      {data.map(data=>(
        <TableRow>
              <TableCell>{data.studentemail}</TableCell>
              <TableCell>{data.date}</TableCell>
              <TableCell>{data.description}</TableCell>
              {/* <TableCell>{data.age}</TableCell>
              <TableCell>{data.contact}</TableCell>
              <TableCell>{data.gender}</TableCell> */}
              <TableCell> 
              <Button color="warning" 
              onClick={()=>handleDelete(data.idrequestclass)}
              >
                
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
              </svg>
              </Button> &nbsp;&nbsp;
              
              </TableCell>
        </TableRow>
          ))} 
      </TableBody>
    </Table> <br /><br />
    </div>
    {/* <div>Teacher Request</div><br />     */}

        </DefaultLayout>
    </div>
  )
}
