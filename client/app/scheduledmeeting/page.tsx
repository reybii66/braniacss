"use client"
// import { Metadata } from "next";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
export default function VideoConf() {
  // const [studentEmail,setEmail] = useState('')
  const [schedule, setSchedule] = useState([])
  // useEffect(()=>{
  //   console.log("entered in setMessage")
  //   axios.get('http://localhost:9900/showStudentEmail').then(res=>{
  //     if(res.data.Status === "Success"){
  //       setEmail(res.data.studentEmail)
  //     } else {
  //       // setMessage(res.data.Message)
  //     }
  //   })
  // },[])
  // getScheduleData
  useEffect(() => {
    console.log("entered in setdata")
    const fetchAllData = async () => {
      console.log("enter to ")
      try {
        const res = await axios.get("http://localhost:9900/showSchedule")
        setSchedule(res.data)
        // console.log(res.data)
        console.log("data is", schedule)
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
    // <DefaultLayout>
    <div className="mx-auto max-w-270">
      <Breadcrumb pageName="Scheduled Meet" />
      {/* <h1>{userEmail}</h1> */}
      <Table aria-label="Example static collection table">
        <TableHeader>
          {/* <TableColumn>Session Id</TableColumn> */}
          <TableColumn>Student E-Mail</TableColumn>
          <TableColumn>Teacher E-Mail</TableColumn>
          <TableColumn>Date</TableColumn>
          <TableColumn>Time</TableColumn>
          <TableColumn>Time Limit</TableColumn>
          <TableColumn>Button</TableColumn>
        </TableHeader>
        <TableBody>
          {schedule.map(data => (
            <TableRow>
              {/* <TableCell>{data.sessionid}</TableCell> */}
              <TableCell>{data.studentemail}</TableCell>
              <TableCell>{data.teacheremail}</TableCell>
              <TableCell>{data.date}</TableCell>
              <TableCell>{data.time}</TableCell>
              <TableCell>{data.limit}</TableCell>
              <TableCell>
                {/* <Button color="warning" href={data.meetlinkuser}>
                
                Join
              </Button>  */}
                <Link
                  isExternal
                  // isDisabled
                  // className={buttonStyles({ color:"primary", variant: "shadow", radius: "full",  })}
                  href={data.studentlink}
                >
                  Join
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    //</DefaultLayout>
  )
}