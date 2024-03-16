"use client"
import React, { useEffect, useState } from 'react'
import {Input,Select, SelectItem,RadioGroup, Radio} from "@nextui-org/react";
import axios from 'axios';
import { useRouter } from 'next/navigation';
// import TimePicker from 'react-time-picker';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
const ScheduleMeeting = () => {
    // fetchStudentEmail
    const [email,setEmail] = useState([])
    useEffect(()=>{
      console.log("entered in setdata")
        const fetchEmail = async ()=>{
            try{
                const res = await axios.get("http://localhost:9900/showStudentEmail")
                setEmail(res.data)
                console.log(email) 
            }catch(e){
                console.log(e);
            }
        }
        fetchEmail()  
    },[])
    // fetchTeacherEmail
    const [temail,setTeacherEmail] = useState([])
    useEffect(()=>{
      console.log("entered in setdata")
        const fetchTeacherEmail = async ()=>{
            try{
                const res = await axios.get("http://localhost:9900/showTeacherEmail")
                setTeacherEmail(res.data)
                // console.log(email) 
            }catch(e){
                console.log(e);
            }
        }
        fetchTeacherEmail()  
    },[])
    // getDataInConsole
    const router = useRouter()
  const [formdata,setFormData] = useState({
    studentemail:"",
    teacheremail:"",
    date:"",
    time:"",
    timelimit:null,
    room:""
});

const handleChange = (e:any)=>{
  setFormData(prev=>({...prev, [e.target.name]: e.target.value}));
}
const handleClick = async (e: any) =>{
  e.preventDefault()
  try{
    await axios.post("http://localhost:9900/schedulemeet", formdata)
    alert("Meeting scheduled successfully")
    router.push("/admindash")
  } catch(err){
    console.log(err)
  }
}
console.log(formdata);
  return (
    <>
    {/* <DefaultLayout> */}

    
    <div className="mx-auto max-w-full">
        <Breadcrumb pageName="Schedule Meeting" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="max-w-full rounded-sm border border-stroke bg-white dark:bg-slate-600 shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      
                      <div className="relative">
                      <Select
                        label="Select Student Email"
                        placeholder="Select email"
                        className="max-w-xs"
                        name='studentemail'
                        onChange={handleChange}
                        >
                        {email.map(email => (
                            <SelectItem 
                            key={email.email}
                            // key={email.iduser}
                            // value={email.useremail}
                            >
                            {email.email}
                            </SelectItem>
                        ))}
                        </Select>
                      
                      </div>
                    </div>
                    </div>
                    <br />
                    <div className="w-full sm:w-1/2">
                    <Select
                        label="Select Teacher Email"
                        placeholder="Select email"
                        className="max-w-xs"
                        name='teacheremail'
                        onChange={handleChange}
                        >
                        {temail.map(temail => (
                            <SelectItem key={temail.email}>
                            {temail.email}
                            </SelectItem>
                        ))}
                        </Select>

                    </div>
                  <br />
                  <div className="mb-5.5">
                    
                    <div className="relative">
                      
                    <Input
                            type="date"
                            label="Select Date"
                            className="max-w-xs"
                            placeholder="Enter the e-mail"
                            name="date"
                            onChange={handleChange}
                        /> 
                    </div>
                  </div>
                  <br />
                  <div className="mb-5.5">
                    
                    <div className="relative">
                    {/* <Input
                            type="password"
                            label="Old Password"
                            className="max-w-xs"
                            placeholder="Enter the old password"
                            name="olpass"
                        />  */}
                        {/* <TimePicker label="Basic time picker" /> */}
                        <Input type="time"
                         label="Select Time"
                         className="max-w-xs"
                         placeholder="Enter time"
                         name="time"
                         onChange={handleChange} />
                      
                    </div>
                  </div>
                  <br />
                  <div className="mb-5.5">
                    
                    <div className="relative">
                    <RadioGroup
                      label="Select time limit"
                      orientation="horizontal"
                      name='timelimit'
                      onChange={handleChange}
                    >
                      <Radio value="20 Min">20 Min</Radio>
                      <Radio value="30 Min">30 Min</Radio>
                      <Radio value="1hr">1 Hr</Radio>
                    </RadioGroup>
                    </div>
                  </div>
                  <br />
                  <div className="mb-5.5">
                    
                    <div className="relative">
                    
                      <Input type="text" label="Room" name='room' className="max-w-xs" placeholder="Enter Room Name" onChange={handleChange}/>
                    </div>
                  </div><br /><br />
                  <div className="flex  gap-4.5">
                    {/* <button
                      className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                      >
                      Cancel
                    </button> &nbsp;&nbsp;&nbsp; */}
                    <button
                      className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                      onClick={handleClick}
                      >
                      Schedule
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </DefaultLayout> */}
    </>
  )
}

export default ScheduleMeeting