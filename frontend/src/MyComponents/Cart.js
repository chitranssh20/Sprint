import React from 'react'
import { useEffect } from 'react';
import './Cart.css'
import { CartFinalItems } from './CartFinalItems';



export const Cart = () => {



    let cartCross = document.getElementById('CartCrossSpanCross');
    
    const cartDisappear = () =>{
        // let cartSideBar = document.getElementById('CartSideBar');
        // cartSideBar.style.zIndex = "-10";
    }
    try {
        useEffect(() => {
        //  cartDisappear();
        }, [])
        
    } catch (error) {
        console.log(error);
    }
    
   let cart = JSON.parse(localStorage.getItem('cart'))
  return (
   <>
   {/* <div className='CartSideBar' id = 'CartSideBar' >
        <div className='CartCross' >
            <h3><span className='CartCrossSpan' >Cart</span> <span className='CartCrossSpan CartCrossSpanCross ' id='CartCrossSpanCross' onClick={cartDisappear} >X</span> </h3>
        </div>
        <div className = 'CartItemList'>
        <ul className='cartFinalList' >
            {
                cart.map(element => {
                    return     <CartFinalItems element = {element} />
            // </>
                })
            }
            </ul>    
        </div>
        </div> */}
        </>
        ) 
    }
