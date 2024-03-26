"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button} from "@nextui-org/react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import { string } from "zod";

export default function AdminDash(){
    const [data,setData] = useState([])
    // useEffect(()=>{
    //   console.log("entered in setdata")
    //     const fetchAllData = async ()=>{
    //         try{
    //             const res = await axios.get("http://localhost:9900/showUserDetails")
    //             setData(res.data)
    //             console.log(data) 
    //         }catch(e){
    //             console.log(e);
    //         }
    
    //     }
    //     fetchAllData()  
    // },[])
    const handleDelete = async (id:any)=>{
        try{
            await axios.delete("http://localhost:9900/deleteuser/"+id)
            window.location.reload()
        } catch(err){
            console.log(err)
        }
    }
    return(
        <>
        <Breadcrumb pageName= "AdminDash"/>   
        <h1>This is admin dash</h1>
        
        </>
    )
}