"use client"
import axios from "axios";
import "./style.css"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogin(){
    const router = useRouter();
  const [data,setData] = useState({
    adminemail :"",
    password:""

});
axios.defaults.withCredentials = true; 
const handleChange = (e:any)=>{
  setData(prev=>({...prev, [e.target.name]: e.target.value}));
}
const handleSubmit = async (e: any) =>{
  console.log("entered in handle submit")
  e.preventDefault()
  try{
    // console.log("entered into try")
    const val = await axios.post("http://localhost:9900/adminlogin",data).then(res =>{
      console.log("data is", res.data)
      if(res.data !=="invalid"){
        router.push("/admindash")
      }
      else{
        alert("Invalid Password")
      }
    })
    console.log(val)
  } catch(err){
    console.log(err)
  }
}
console.log(data);
    return(
        <>
        <div
        //  className="container"
        >
        <div className="login-box">
        <p>Login</p>
        <form>
            <div className="user-box">
            <input required name="adminemail" type="text" onChange={handleChange}/>
            <label>Email</label>
            </div>
            <div className="user-box">
            <input required name="password" type="password" onChange={handleChange}/>
            <label>Password</label>
            </div>
            <button onClick={handleSubmit}>
            <a>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
            </a>
            </button>
        </form>
        </div>
        
        </div>
        </>
    )
}