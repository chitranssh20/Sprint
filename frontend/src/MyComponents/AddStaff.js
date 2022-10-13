import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import './AddStaff.css'

export const AddStaff = () => {
    const [staffEmail, setstaffEmail] = useState('')
    const [staffFname, setstaffFname] = useState('')
    const [staffLname, setstaffLname] = useState('')
    const [staffPassword, setstaffPassword] = useState('')
    const [staffCPassword, setstaffCPassword] = useState('')

    const addStaff = (e) => {
        e.preventDefault(); 
        if (staffPassword=== staffCPassword ){

            
            let url = 'http://127.0.0.1:8000/sprint/addStaff/' 
            
            let fd = new FormData()
            fd.append('email', staffEmail)
            fd.append('fname', staffFname)
            fd.append('lname', staffLname)
            fd.append('password', staffPassword)
            
            let config = {Headers: { 'Content=Type':'multipart/form=data' }}
            axios.post(url, fd, config).then(
                function(res){

                    if(res.data.status === 200){

                        alert(staffFname+'has been added ')
                        setstaffCPassword('')
                        setstaffPassword('')
                        setstaffEmail('')
                        setstaffFname('')
                        setstaffLname('')
                    }
                    else if(res.data.status != 200){
                        alert('Email is already registered')
                    }
                }
            ).catch(err => console.log(err))
        }
        else{
            alert('Passwords do not match')
        }
        }
        return (
    <form encType='multipart/form-data' onSubmit={addStaff} className='addProductForm' method='post' >
        <div className='addProductFormField'>                   
        <label htmlFor='staffEmail' className='addProductFormLabel' >  Email Address: </label>
        <input type= 'email' id='staffEmail' className='addProductFormInput' name = 'staffEmail' value={staffEmail} onChange= {(e)=>{setstaffEmail(e.target.value)}} ></input>
        </div>


        <div className='addProductFormField'>
        <label htmlFor='staffFname' className='addProductFormLabel'>First Name: </label>
        <input type= 'text' id='staffFname' className='addProductFormInput ' value={staffFname} onChange= {(e)=>{setstaffFname(e.target.value)}} name = 'staffFname' ></input>
        </div>
      

        <div className='addProductFormField'>
        <label htmlFor='staffLname' className='addProductFormLabel'>Last Name: </label>
        <input type= 'text' id='staffLname' className='addProductFormInput' value={staffLname} onChange= {(e)=>{setstaffLname(e.target.value)}} name = 'staffLname' ></input>
        </div>

        <div className='addProductFormField'>
        <label htmlFor='staffPassword' className='addProductFormLabel'>Password: </label>
        <input type= 'password' id='staffPassword' className='addProductFormInput ' value={staffPassword} onChange= {(e)=>{setstaffPassword(e.target.value)}} name = 'staffPassword' ></input>
        </div>

        <div className='addProductFormField'>
        <label htmlFor='staffCPassword' className='addProductFormLabel'>Confirm Passowrd: </label>
        <input type= 'password' id='staffCPassword' className='addProductFormInput ' value={staffCPassword} onChange= {(e)=>{setstaffCPassword(e.target.value)}} name = 'staffCPassword' ></input>
        </div>

        <button type='submit' className='addStaffButton'  >ADD Staff</button>
        </form>
  )
}
