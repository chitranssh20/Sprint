import React from 'react'
import { useEffect } from 'react';
import './Cart.css'
import { CartFinalItems } from './CartFinalItems';



export const Cart = () => {
    let cart = null
   try {
    cart = JSON.parse(localStorage.getItem('cart')) 
   } catch (error) {
        console.log(error)
   }
    
if(cart==null || cart==undefined){
    return <h3>No Items have been added</h3>
}
else{

    return (
        <>
            <table className='cartPage' >
                <thead className='cartTHead' >
                    <tr>
                        <td className= 'cartImgTd' >Image</td>
                        <td  >Name</td>
                        <td className='cartQtTd' >Quantity</td>
                    </tr>
                </thead>
                <tbody>
                    <CartFinalItems />
                </tbody>
            </table>
    </>


) 
}
}
