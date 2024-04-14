"use client"
import { Textarea } from '@nextui-org/react'
import { Input } from "@nextui-org/input";
import React, { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function page() {
    const router=useRouter();
    const [data,setData]=useState({
      email:"",
      subject:"",
      message:"",
     
      
  })
    const handleChange = (e:any)=>{
        setData((prev)=>({...prev, [e.target.name]: e.target.value}));
      } ;
    
      const handleClick = async (e:any) =>{
        console.log("entered")
        e.preventDefault()
        try{
          // console.log("data")
          await axios.post("http://localhost:9900/contact",data)
          alert("Message sent successfully")
          router.push("/")
        } catch(err){
          console.log(err)
        }
        
       }  
    return (
        <div>
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
                    <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Course? Let us know.</p>
                    <form action="#" className="space-y-8">
                        
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                            <Input type='email' name='email' onChange={handleChange} className="shadow-sm  text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:shadow-sm-light" placeholder="name@flowbite.com" isRequired></Input>
                        
                    
                            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                            <Input type="text" name='subject' className="block p-3 w-full text-sm text-gray-900 shadow-sm focus:ring-primary-500 focus:border-primary-500dark:shadow-sm-light" placeholder="Let us know how we can help you" required></Input>
                        
                        
                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                            <Textarea name='message' className="block p-2.5 w-full text-sm text-gray-900 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></Textarea>
                        
                        <button type="submit" onClick={handleClick} className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
                    </form>
                </div>
            </section>
        </div>
    )
}
