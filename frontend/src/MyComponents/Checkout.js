import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';


const Checkout = () => {
  let navigate = useNavigate();
  const check = () =>{
    let user = localStorage.getItem('email');
    if(user == null){
    navigate('/login');
    }
    else{
    }
  
  }
  

      return <h2>I do not have a merchant ID as of now so no checkout! 😊</h2>
  }

export default Checkout