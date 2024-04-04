"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../admindash/layout";
export default function UserDetails() {
  const [data, setData] = useState([])
  useEffect(() => {
    console.log("entered in setdata")
    const fetchAllData = async () => {
      try {
        const res = await axios.get("http://localhost:9900/showStudentsDetails")
        setData(res.data)
        console.log("Student details in admin is", data)
      } catch (e) {
        console.log(e);
      }
    }
    fetchAllData()
  }, [])
  const handleDelete = async (id: any) => {
    try {
      await axios.delete("http://localhost:9900/deletestudent/" + id)
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <DefaultLayout>

        <Breadcrumb pageName="Student Details" />
        <div style={{width:"80%"}}>

        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>E-Mail</TableColumn>
            <TableColumn>Date of Birth</TableColumn>
            <TableColumn>Age</TableColumn>
            <TableColumn>Contact</TableColumn>
            <TableColumn>Syllabus</TableColumn>
            <TableColumn>Class</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody>
            {data.map(data => (
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
                  <Button color="danger" onClick={() => handleDelete(data.studentid)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg>
                    Delete User
                  </Button> &nbsp;&nbsp;
                  <Button color="warning">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                    </svg>
                    Update User
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
            </div>

      </DefaultLayout>
    </>
  )
}