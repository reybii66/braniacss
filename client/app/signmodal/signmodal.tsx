"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Navbar } from "@/components/navbar";
import "./style.css"
export default function ModSign() {
  const router = useRouter();
  const [data,setData] = useState({
    email :"",
    password:""

});
axios.defaults.withCredentials = true; 
const handleChange = (e:any)=>{
  setData(prev=>({...prev, [e.target.name]: e.target.value}));
  console.log(data)
}
const handleClick = async (e: any) =>{
  console.log("entered in handle submit")
  e.preventDefault()
  try{
    // console.log("entered into try")
    const val = await axios.post("http://localhost:9900/studentlogin",data).then(res =>{
      
      if(res.data ==="Success"){
        console.log("data is", res.data)
        router.push("/dashboard")
      }
      else{
        alert("Invalid Password")
      }
    })
    console.log(val)
    // alert(val)
    // console.log(val)
  } catch(err){
    console.log(err)
  }
}
console.log(data);
  return (
    
    <>
    <span>< Navbar/></span>
      
   
   

<div 
id="magicpattern"
className="min-h-screen bg-white dark:bg-slate-700 py-6 flex flex-col justify-center sm:py-12">
	<div className="relative py-3 sm:max-w-xl sm:mx-auto">
    
		<div
			className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
		</div>
		<div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
       
			<div className="max-w-md mx-auto">
				<div>
					<h1 className="text-2xl font-semibold dark:text-gray-950 text-center">Student Login </h1>
                    
                    
				</div>
				<div className="divide-y divide-gray-200">
					<div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
						<div className="relative">
							<input autoComplete="on" id="email" name="email" type="text" onChange={handleChange} className="dark:bg-white peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
							<label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
						</div>
						<div className="relative">
							<input autoComplete="on" id="password" name="password" type="password" onChange={handleChange} className="dark:bg-white peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
							<label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
						</div>
						<div className="relative items-center">
							<button className="bg-blue-500 text-white rounded-md px-2 py-1 items-center"
                            onClick={handleClick}
                            >Submit</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
    </>
  );
}
