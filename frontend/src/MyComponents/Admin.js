import React from 'react'
import { useState, useEffect } from 'react'
import './Admin.css'
import axios from 'axios'
import { UpgradeProduct } from './UpgradeProduct'
import {Redirect} from 'react-router-dom'


export const Admin = () => {


   
    const [product, setproduct] = useState([])

  useEffect(() => {
    let url= 'http://127.0.0.1:8000/sprint/getProduct/'

    axios.get(url).then(function(res){
      // console.log(product)
      setproduct([res.data])
      
      let tempPost = []
      res.data.products.forEach(element => {
          const getPost = {
            prodId: element.prodId ,
            name: element.name,
            prodImg: element.prodImg, 
            desc: element.desc, 
            ratings: element.ratings,
            soldMonth: element.soldMonth,
            soldTD: element.soldTD,
            soldToday: element.soldToday,
            soldWeek: element.soldWeek,
            viewMonth: element.viewMonth, 
            viewTD: element.viewTD,
            viewToday: element.viewToday,
            viewWeek: element.viewWeek

          }
          tempPost.push(getPost)

          setproduct(tempPost)
      });
        
    })
    .catch(err => console.log(err))
}, [])

// delete product 
const deleteProduct = (e) =>{
  let url = `http://127.0.0.1:8000/sprint/deleteProduct/${e}`;
  // let config= {headers: {'Content-Type': 'multipart/form-data'}}
  console.log(url)
  axios.delete(url).then(res =>{
    if (res.status == 200){
      alert('Product has been successfully deleted. Please reload the site')
    }
  })
  .catch(err => {
    console.log(err)
  })
}

// updating a product 
let updateProductId 
const updateProduct = (e) => {
    updateProductId = e;
    // console.log(updateProductId)
    window.location.href = '/upgradeProduct/'+e
}

// getting the product 
  let gotProduct = [
    <thead>
      <tr>
        <td className='adminFirstTD' ></td>
        <td className='adminFirstTD' ></td>
        <td className='adminFirstTD' > <button className='adminProductButtons' >Add Product</button> </td>
        <td className='adminFirstTD' ></td>
      </tr>
      <tr>
        <td>Product Name</td>
        <td>Product Rating</td>
        <td>Delete Product</td>
        <td>Update Product</td>
      </tr>
    </thead>

  ]

  for(let i = 0; i<product.length; i++){
          gotProduct.push(
    <tbody>

    <tr>
      <td> {product[i].name} </td>
          <td > {product[i].ratings } </td>
          <td  > <button className='adminProductButtons' onClick={
            () => deleteProduct(product[i].prodId)} >Delete Product</button> </td>
          <td ><button className='adminProductButtons' onClick={
            () => updateProduct(product[i].prodId)}  >Update Product</button> </td>
    </tr>
    </tbody>
    
    )
  }


  // console.log('here it is ' +product.length)
  return (
    <>
    <table>
      {gotProduct}
    </table>
    </>
  )
}
