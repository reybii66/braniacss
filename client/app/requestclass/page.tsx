"use client"
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import React, { useEffect, useState } from 'react'
import DefaultLayout from '../dashboard/layout'
import { Input } from '@nextui-org/input'
// import { Radio, RadioGroup, Select, SelectItem } from '@nextui-org/react'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function RequestClass() {
    const [studentEmail, setEmail] = useState('')
    const [message, setMessage] = useState('')
    // gettingStudentName
    useEffect(() => {
        console.log("entered in setMessage")
        axios.get('http://localhost:9900/studentEmail').then(res => {
            if (res.data.Status === "Success") {
                setEmail(res.data.email)
            } else {
                setMessage(res.data.Message)
            }
        })
    }, [])

    const [formdata, setFormData] = useState({
        studentemail:"",
        date: "",
        description: ""
    });

    const handleChange = (e: any) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleClick = async (e: any) => {
        // console.log("reybiiii")
        e.preventDefault()
        try {
            await axios.post("http://localhost:9900/requestClass", formdata)
            alert("Request has sent successfully")

        } catch (err) {
            console.log(err)
        }
    }
    const currentDate = moment().format('YYYY-MM-DD');
    return (
        <>
            <DefaultLayout>
                <Breadcrumb pageName="Request Class" />
                <div className='flex flex-col gap' >
                    <form action="#">
                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                            <div className="w-full sm:w-1/2">

                                <div className="relative">
                                    {/* <Select
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
                                    </Select> */}

                                </div>
                            </div>
                        </div>
                        {/* <br /> */}
                        <div className="w-full sm:w-1/2">
                            {/* <Select
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
                            </Select> */}

                        </div>
                        <div className="mb-5.5">

                            <div className="relative">

                                <Input
                                    type="Email"
                                    isRequired
                                    variant="bordered"
                                    label="Your Email"
                                    className="max-w-xs"
                                    placeholder="Enter the e-mail"
                                    name="studentemail"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="mb-5.5">

                            <div className="relative">

                                <Input
                                    isRequired
                                    type="date"
                                    min={currentDate}
                                    variant="bordered"
                                    label="Select Date"
                                    className="max-w-xs"
                                    placeholder="Enter the date"
                                    name="date"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* <div className="mb-5.5">

                            <div className="relative">
                               
                                <Input type="time"
                                    label="Select Time"
                                    className="max-w-xs"
                                    placeholder="Enter time"
                                    name="time"
                                    onChange={handleChange} />

                            </div>
                        </div>
                         */}
                        {/* <div className="mb-5.5">

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
                        </div> */}
                        <br />
                        <div className="mb-5.5">

                            <div className="relative">

                                <Input
                                    type="text"
                                    isRequired
                                    label="Description"
                                    name='description'
                                    variant="bordered"
                                    className="max-w-xs"
                                    placeholder="Enter Description"
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <br /><br />
                        <div className="flex  gap-4.5 ml-10">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {/* <button
                      className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                      >
                      Cancel
                    </button> &nbsp;&nbsp;&nbsp; */}
                            < button
                                className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                                type="submit"
                                onClick={handleClick}
                            >
                                Request Class
                            </button>
                        </div>
                    </form>

                </div>



            </DefaultLayout>
        </>
    )
}
