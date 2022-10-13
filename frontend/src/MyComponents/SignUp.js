import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import './SignUp.css'

export const SignUp = () => {

    const [signupEmail, setsignupEmail] = useState('')
    const [signupFname, setsignupFname] = useState('')
    const [signupPassword, setsignupPassword] = useState('')
    const [signupCPassword, setsignupCPassword] = useState('') 


    const signup = (e) =>{
        e.preventDefault()
        if(signupPassword===signupCPassword){
            let fd = new FormData()
            fd.append('email', signupEmail)
            fd.append('fname', signupFname)
            fd.append('password', signupPassword) 
            let url = 'http://127.0.0.1:8000/sprint/signup/' 
            let config = {Headers: {'Content-Type': 'multipart/form-data'}}
            axios.post(url, fd, config).then(function(res){
                if (res.data.status === 208){
                    let redirectLogin = window.confirm('Email Id is alreayd registered. Do you want to LogIn?')
                    if (redirectLogin){
                        window.location.href = 'login'
                    }
                }
                else if(res.data.status === 201) {
                        alert('You have signed up!')
                        setsignupCPassword('')
                        setsignupEmail('')
                        setsignupFname('')
                        setsignupPassword('')
                        window.location.href = '/'
                }
            }
        ).catch(err =>{
                console.log(err)
            })

            
        }
        else{
            alert('Password did not match')
        }
    }

  return (
    <>
    <form  className='signupForm' onSubmit={signup} encType= 'multipart/form-data' >
        <div className='signupFormOuterDiv'>
        <div className='signupFormDiv'>
        <label className='signupLabel' htmlFor='signUpEmail'>Enter Email:</label>
                <br></br>
                <input className='signupInput' id = 'signupEmail' value= {signupEmail} type='email' name = 'signupEmail' onChange={(e)=>{
                    setsignupEmail(e.target.value)
                }} ></input>
        </div>
        <div className='signupFormDiv'>
                <label className='signupLabel' htmlFor='signUpFname'>First Name:</label>
                <br></br>
                <input className='signupInput' id = 'signupFname' value = {signupFname} onChange = {(e)=>{
                    setsignupFname(e.target.value)
                }} type='text' name = 'signuFname' ></input>
        </div>
        <div className='signupFormDiv'>
        <label className='signupLabel' htmlFor='signUpPassword'>Password:</label>
                <br></br>
                <input className='signupInput' id = 'signupPassword' value = {signupPassword}  type='password' onChange={(e)=>{
                    setsignupPassword(e.target.value)
                }} name = 'signuPassword' ></input>

        </div>
        <div className='signupFormDiv'>
        <label className='signupLabel' htmlFor='signUpCpassword' >Confirm Password:</label>
                <br></br>
                <input className='signupInput' id = 'signupCPassword' value={signupCPassword} type='password' name = 'signupCPassword' onChange={(e)=>{
                    setsignupCPassword(e.target.value)
                }} ></input>

        </div>
        <div className='signupFormDiv'>
            <button className='signupButton'>Sign Up</button>
        </div>
        </div>
    </form>
    </>
  )
}
