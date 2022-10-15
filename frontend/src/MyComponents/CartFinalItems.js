import React from 'react'
import './CartFinalItems.css'
import uuid from 'react-uuid'


export const CartFinalItems = () => {
  


  let cart = JSON.parse(localStorage.getItem('cart'));
  
  const subqty = (id) =>{
 
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.forEach(element => {
      if(element.id == id){
        if(element.qty>0){
          let qtyId = document.getElementById(`qtId`+id )
          let qtyNum = qtyId.innerHTML;
          let itemValue = Number.parseInt(qtyNum);
          itemValue = itemValue - 1;
          qtyId.innerHTML = itemValue;
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
    let qtyId = document.getElementById(`qtId`+id )
    let qtyNum = qtyId.innerHTML;
    let itemValue = Number.parseInt(qtyNum);
    itemValue = itemValue + 1;
    qtyId.innerHTML = itemValue;
  
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.forEach(element => {
      if(element.id == id){
        element.qty = element.qty + 1;
      }
    });
    localStorage.setItem('cart', JSON.stringify(cart))
  }
    
    
    let url = 'http://127.0.0.1:8000'
    return (
      <>
      {
        cart.map((item)=>{
          if (item.qty>0){
            return <tr key= {uuid()}>
            <td><img src = {url + item.image} width= '100px' height= '150px' /> </td>
            <td>{item.name}</td>
            <td><button className='qtbutton' onClick={(e)=>{
              subqty(item.id);
            }}>-</button><span id = {'qtId'+ item.id} > {item.qty}</span><button className='qtbutton' onClick={(e)=>{
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
