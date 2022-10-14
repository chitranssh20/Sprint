import React from 'react'
import './CartFinalItems.css'
import uuid from 'react-uuid'
import { useEffect } from 'react'

export const CartFinalItems = () => {
  


  let cart = JSON.parse(localStorage.getItem('cart'));
  
  useEffect(()=>{
    let newCart ;
    for(let i = 0; i< cart.length; i++){
      if(i.qty<=0){
         newCart = cart.splice(i, 1)
      }
    }
    // localStorage.setItem('cart', JSON.stringify(newCart))
    console.log(newCart)
  }, cart)

  const subqty = (id) =>{
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.forEach(element => {
      if(element.id == id){
        if(element.qty>=0){

          element.qty = element.qty - 1;
        }
        else{
          window.alert('Element qty cannot be in negative');
        }

      }
    });
   localStorage.setItem('cart', JSON.stringify(cart))
  }
  
  const addqty = (id) =>{
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.forEach(element => {
      if(element.id == id){
        element.qty = element.qty + 1;
      }
    });
    localStorage.setItem('cart', JSON.stringify(cart))
  }
    
    
    
    return (
      <>
      {
        cart.map((item)=>{
          if (item.qty>0){

            return <tr key= {uuid()}>
            <td>Img</td>
            <td>{item.name}</td>
            <td><button className='qtbutton' onClick={(e)=>{
              subqty(item.id);
            }}>-</button>{item.qty}<button className='qtbutton' onClick={(e)=>{
              e.preventDefault();
              addqty(item.id);
            }} >+</button>  </td>
          </tr>
      }
        })
      }
    </>
  )
}
