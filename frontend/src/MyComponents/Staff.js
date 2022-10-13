import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import uuid from 'react-uuid'
import './Staff.css'
import { Navigate, useNavigate } from 'react-router-dom'
export const Staff = () => {
    // Get all the staff Memebers 
    const navigate = useNavigate();
    try {
        let Isstaff = sessionStorage.getItem('staff')
        console.log(Isstaff)
        if(!Isstaff || Isstaff=='false' || Isstaff===null){
            // navigate('/login');
            window.location.href = '/login'
    }
    else{
        console.log('yoyo');
        console.log('here is staff', Isstaff)
    }
    
} catch (error) {
    console.log(error)
}
 
    const [staff, setstaff] = useState([])
    useEffect(() => {
        const getStaff  = () =>{
            
            let url = 'http://127.0.0.1:8000/sprint/getStaff/'
            axios.get(url).then(function(res){
                setstaff(res.data.message)
            }
            ).catch(err => console.log(err))
        }
        getStaff()
    }, [])
    
    // console.log(staff)
    // Remove Staff Member 

    const removeStaff = (e) =>{
        console.log(e.email)
        let fd = new FormData()
        fd.append('email', e.email)
        let url = 'http://127.0.0.1:8000/sprint/removeStaff/'
        axios.delete(url, {data: fd})
    }



    return (
        <>
        {
        <table>
            <thead>
                <tr>
                    <td></td>
                    <td><button className='staffButton' >  + Staff</button> </td>
                    <td></td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>Name</td>
                    <td>Actions</td>
                </tr>
            </thead>
            <tbody>
       { staff.map((el, index)=>{
            return (

                <tr key={uuid()} >
                    <td>{el.email} </td>
                    <td>{el.fname}   {el.lname} </td>
                    <td>  <button className = 'staffButton' onClick={()=>{
                        // console.log({el})
                        removeStaff(el)
                    } } >Remove</button> </td>
                </tr>
                )
            })}
            </tbody>
            </table>
            }
            </>
  )
}
