"use client"
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import React, { useEffect, useState } from 'react'
import DefaultLayout from '../dashboard/layout'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'
import {Link} from "@nextui-org/link";
import axios from 'axios'

export default function Notes() {
    const [notes, setNotes] = useState([])

    // getScheduleData
  useEffect(() => {
    console.log("entered in setdata")
    const fetchAllData = async () => {
      console.log("enter to ")
      try {
        const res = await axios.get("http://localhost:9900/notesavailable")
        setNotes(res.data)
        // console.log(res.data)
        console.log("data is", notes)
      } catch (e) {
        console.log(e);
      }
    }
    fetchAllData()
  }, [])

  function buttonStyles(arg0: { color: string; variant: string; radius: string; }): string | undefined {
    throw new Error("Function not implemented.");
  }
    return (
    <>
    <DefaultLayout>
    <Breadcrumb pageName="Notes" />
    <div style={{width:"80%"}}>
    <Table 
    color="default"
    selectionMode="single" 
    aria-label="Example static collection table"
    >
        <TableHeader>
          {/* <TableColumn>Session Id</TableColumn> */}
          <TableColumn>Student E-Mail</TableColumn>
          <TableColumn>Teacher E-Mail</TableColumn>
          <TableColumn>Subject</TableColumn>
          <TableColumn>View</TableColumn>
        </TableHeader>
        <TableBody>
          {notes.map(data => (
            <TableRow>
              {/* <TableCell>{data.sessionid}</TableCell> */}
              <TableCell>{data.student_email}</TableCell>
              <TableCell>{data.teacher_email}</TableCell>
              <TableCell>{data.subjec_tname}</TableCell>
              
              <TableCell>
                {/* <Button color="warning" href={data.meetlinkuser}>
                
                Join
              </Button>  */}
                <Link
                  isExternal
                  href={data.file_loc}
                  color="warning"
                  >
                  View
                </Link>
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
