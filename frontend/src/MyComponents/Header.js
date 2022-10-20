import React, { useState, useEffect } from 'react'
import SprintLogo from './SprintLogo.png' 
import User from './User.png'
import CartLogo  from './Cart.png' 
import {Cart} from './Cart.js'
import './Header.css'
import axios from 'axios'
import Cookies from 'js-cookie'
import navigate, { useNavigate } from 'react-router-dom'
import {LogIn} from './LogIn.js'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken' 
// axios.defaults.withCredentials = true


export const Header = () => {
  
  let navigate = useNavigate();

const [search, setsearch] = useState('')
const submitSearch = () =>{
  alert(search);
  setsearch(''); 

}
        const cook = Cookies.get()
        // console.log(cook)

const logout = () =>{
    let url = 'http://127.0.0.1:8000/sprint/logout/'
    // let config = {Headers: {'X-CSRFToken': '91Kb2GroYjUMl7eYFPFWyHUZqFRsjECN' },  withCredentials: true}
    let email = localStorage.getItem('email')
    let password = localStorage.getItem('password')
    
    // console.log(email);
    let fd = new FormData();
    fd.append('email', email);
    fd.append('password', password);
    axios.post(url, fd ).then(function(res){
      // console.log(res)con
    }).catch(err => console.log(err))
    sessionStorage.clear();
    localStorage.setItem('email', null);
    localStorage.setItem('password', null);
    localStorage.setItem('login', null);
    
}



const cartAppear = () =>{
  // let cartSideBar = document.getElementById('CartSideBar');
  // cartSideBar.style.zIndex = "10";
  navigate('/cart')
}
const loggingIn = () =>{
  navigate('/login');
}
const home = () =>{
  navigate('/')
}
  return ( 
    <>
    <nav className='nav' > 
        <ul>
          <li><img src= {SprintLogo} alt= 'logo' onClick={home}  /> </li>
          <li><input type='search' value= {search} onChange={(e)=>{
            setsearch(e.target.value) 
          }}  />
            <button type= 'submit' onClick={submitSearch}>Search</button>
          </li>
            <li onClick={logout} >Log Out</li>
          <li>
            <img src= {User} onClick= {loggingIn}  alt= 'user' />
            <img src= {CartLogo} alt = 'cart'  onClick={cartAppear} />
          </li>
        </ul>

    </nav>
    </>
  )
}
