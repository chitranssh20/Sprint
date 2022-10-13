import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import './ProductDetail.css'
import axios from 'axios'

export const ProductDetail = () => {
    const { prodId } = useParams();
    const [product, setproduct] = useState([])

    useEffect(() => {

        try {
            let url = `http://127.0.0.1:8000/sprint/productDetail/${prodId}`;

            axios.get(url).then(res => {
                setproduct(res.data.product)
            }).catch(err => console.log(err))


        } catch (error) {
            console.log(error);
        }


    }, [])
    

    let url = 'http://127.0.0.1:8000'
    return (
        <>
        <div className='prodDetail'>
            <div  className='productImg' >

        <img src = {url + product.prodImg}  alt = {product.name}  width= "400px" height="450px"  />
            </div>
        <div className='prodInfo' >

        <h3 className='prodDTName' >{product.name}</h3>
        <h5 className='prodDTDesc' >{product.desc}</h5>
        <h4 className='prodDTRatings' >Ratings:  {product.ratings}  out of 5 </h4>
        <h4 className='prodDTPrice' >Price: <span className='prodDTPriceSpan' >₹ {product.price}</span> </h4>
        <h5 className='prodDTCategory' >Category: {product.category} </h5>
        <button className='prodDTAddCart' >ADD TO CART</button>
        </div>
        </div>

             
        </>
    )
}
