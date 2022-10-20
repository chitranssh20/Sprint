import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import './LogIn.css'
import { Redux } from './Redux'
import { Navigate, useNavigate } from 'react-router-dom'
// axios.defaults.xsrfHeaderName = 'X-CSRFToken'
// axios.defaults.xsrfCookieName = 'csrftoken' 
// axios.defaults.withCredentials = true

export const LogIn = () => {
    let navigate = useNavigate();
    
    const [loginEmail, setloginEmail] = useState('')
    const [loginPassword, setloginPassword] = useState('')
    const [user, setuser] = useState([])

    const login = (e) => {
            localStorage.setItem('email', loginEmail);    
            localStorage.setItem('password', loginPassword);    
            e.preventDefault()
            let fd = new FormData()
            fd.append('email', loginEmail)
            fd.append('password', loginPassword) 

            let config = {Headers: {'Content-Type': 'multipart/form-data'}}
            let url = 'http://127.0.0.1:8000/sprint/login/'
            axios.post(url, fd, config).then(function(res){
                // console.log(res.status)
                if(res.data.status === 404){
                    let redirectSignup = window.confirm('Email not found, Do you want to sign up?') 
                    if(redirectSignup){
                        window.location.href = 'signup'
                        
                    }
                }
                else if(res.data.status === 202){
                    alert('User succesffully logged In' )
                    // console.log(res.data);
                    setuser(res.data) 
                    sessionStorage.setItem('staff', res.data.staff)
                    sessionStorage.setItem('superuser', res.data.superuser)
                    sessionStorage.setItem('fname', res.data.fname)
                    localStorage.setItem('login', 'successful');
                    navigate('/');
                }
                else if(res.data.status === 406){
                    alert('You have entered wrong credentials')
                }
                else if(res.data.status === 400){
                    alert('Please use Post method')
                }
                
            }).catch(err =>
                console.log(err))
            }
            console.log(user)
            return (
                <>
 <form  className='loginForm' onSubmit={login} encType= 'multipart/form-data' >
        <div className='loginFormOuterDiv'>

        <div className='loginFormDiv'>
        <label className='loginLabel' htmlFor='loginEmail'>Enter Email:</label>
                <br></br>
                <input className='loginInput' id = 'loginEmail' value= {loginEmail} type='email' name = 'loginEmail' onChange={(e)=>{
                    setloginEmail(e.target.value)
                }} ></input>
        </div>

       
        <div className='loginFormDiv'>
        <label className='loginLabel' htmlFor='loginPassword'>Password:</label>
                <br></br>
                <input className='loginInput' id = 'loginPassword' value = {loginPassword}  type='password' onChange={(e)=>{
                    setloginPassword(e.target.value)
                }} name = 'loginassword' ></input>

        </div>
        
        <div className='loginFormDiv'>
            <button className='loginButton'>Log In</button>
        </div>
        </div>
    </form>
    <Redux user = {user} />
  </>
  )
}
