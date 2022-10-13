import React from 'react'
import { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import './UpgradeProduct.css'

import axios from 'axios'


export const UpgradeProduct = () => {
    
    const [upgradename, setupgradename] = useState('')
    const [upgradeprodImg, setupgradeprodImg] = useState(null)
    const [upgradedesc, setupgradedesc] = useState('')
    const [upgradeprice, setupgradeprice] = useState('')
    const [upgradecategory, setupgradecategory] = useState('')


    const {id} = useParams();
    console.log(id)
    let url = `http://127.0.0.1:8000/sprint/getUpdateProduct/${id}`
    // console.log(url)
    
    
    let response = {}
    useEffect(() => {
        try {
            const getUpdateProduct = () =>{
                axios.get(url).then(res => {
                    // console.log(res.data)
                    // console.log(res)
                    console.log(res.data.Product)
                    setupgradename(res.data.Product.name)
                    setupgradecategory(res.data.Product.category)
                    setupgradedesc(res.data.Product.desc)
                    setupgradeprice(res.data.Product.price)
                    setupgradeprodImg(res.data.Product.prodImg)
                    response = res.data.Product.prodImg 
                    console.log(response)

                }).catch(err => console.log(err))
            } 
            getUpdateProduct()
            
        } catch (error) {
            console.log(error)
        }
        
        }, [])
        console.log(upgradeprodImg)
        



    const upgradeProductSubmit = (e) =>{
        e.preventDefault();
        let fd = new FormData() ;
        fd.append('prodId', id);
        fd.append('name', upgradename)
        fd.append('desc', upgradedesc)
        fd.append('category', upgradecategory)
        fd.append('price', upgradeprice)
        fd.append('prodImg', upgradeprodImg) 

        let url = 'http://127.0.0.1:8000/sprint/updateProduct/'

        let config = {headers: { 'Content-Type': 'multipart/form-data' }}
        axios.put(url, fd, config).then(function(res){
            if (res.status==200){
                alert('Product has been updated'); 
            }
            else if(res.status!=200){
                alert('Please make sure to reupload the imaage')
            }
        }).catch(function(err){
            console.log(err);
            alert('Please make sure to reupload the image');
        })


    }

  return (
    <>
        <form encType='multipart/form-data' onSubmit={upgradeProductSubmit} className='addProductForm' method='post' >
        <div className='addProductFormField'>                   
        <label htmlFor='name' className='addProductFormLabel' >  Product Name: </label>
        <input type= 'text' id='name' className='addProductFormInput' name = 'name' value={upgradename} onChange= {(e)=>{setupgradename(e.target.value)}} ></input>
        </div>

        <div className='addProductFormField'>            
        <label htmlFor='prodImg' className='addProductFormLabel'>Product Image: </label>
        <input type= 'file' id='prodImg' className='addProductFormInput addProductFormFileInput ' onChange= {(e)=>{setupgradeprodImg(e.target.files[0])}} name = 'prodImg' ></input>
        </div>

        <div className='addProductFormField'>
        <label htmlFor='desc' className='addProductFormLabel'>Product Desc: </label>
        <input type= 'text' id='desc' className='addProductFormInput ' value={upgradedesc} onChange= {(e)=>{setupgradedesc(e.target.value)}} name = 'desc' ></input>
        </div>

        <div className='addProductFormField'>
        <label htmlFor='price' className='addProductFormLabel'>Product Price: </label>
        <input type= 'number' id='price' className='addProductFormInput' value={upgradeprice} onChange= {(e)=>{setupgradeprice(e.target.value)}} name = 'price' ></input>
        </div>
        
        <div className='addProductFormField'>
        <label htmlFor='category' className='addProductFormLabel'>Product Category: </label>
        <input type= 'text' id='category' className='addProductFormInput' value={upgradecategory} onChange= {(e)=>{setupgradecategory((e.target.value).toUpperCase())}} name = 'category' ></input>
        </div>

        <div className='addProductFormField'>
            <button type='submit' className='addProductFormSubmit' >Update</button>
        </div>


    </form>
    </>
  )
}
