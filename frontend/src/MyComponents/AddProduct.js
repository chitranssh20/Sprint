import React from 'react'
import './AddProduct.css'
import { useState } from 'react'
import axios from 'axios'

export const AddProduct = () => {
    
    const [name, setname] = useState('')
    const [prodImg, setprodImg] = useState(null)
    const [desc, setdesc] = useState('')
    const [price, setprice] = useState('')
    const [category, setcategory] = useState('')
   
   
   
    const addProductSubmit = (e) =>{
        e.preventDefault();
        if (name.length>59){
            return alert('Product Name cannot be longer than 60 characters')
        }
        else if(desc.length > 399){
            return alert('Product description can not be longer than 400 words')
        }
        else if(price>10000){
            return alert('Product Price can not be higher than 10 thousand.')
        }
        else if(category.length>50){
            return alert('Product Category can not be longer than 50 characters.')
        }
        else{
            // alert('Everything is all right');
        }
        if (prodImg !== null){
            // let nullProdImage =  window.confirm('You did not upload an Image. Do you want to continue anyway?');
            if (true){
                let url = 'http://127.0.0.1:8000/sprint/addProduct/'
                let fd = new FormData()
                fd.append('name', name)
                fd.append('prodImg', prodImg)
                fd.append('desc', desc)
                fd.append('price', price)
                fd.append('category', category)

                let config = {Headers: {
                    'Content-Type': 'multipart/form-data'
                }}
                console.log(5+5)

                axios.post(url,fd, config).then(res=>{

                    if(res.status ===200){
                        alert('Product has been added')
                    }
                }).catch(err =>console.log(err))
            }
        }
        else{
            alert('You forgot to add Image')
        }
    }
    


  return (
    <>
    <form encType='multipart/form-data' onSubmit={addProductSubmit} className='addProductForm' method='post' >
        <div className='addProductFormField'>                   
        <label htmlFor='name' className='addProductFormLabel' >  Product Name: </label>
        <input type= 'text' id='name' className='addProductFormInput' name = 'name' value={name} onChange= {(e)=>{setname(e.target.value)}} ></input>
        </div>

        <div className='addProductFormField'>            
        <label htmlFor='prodImg' className='addProductFormLabel'>Product Image: </label>
        <input type= 'file' id='prodImg' className='addProductFormInput addProductFormFileInput ' onChange= {(e)=>{setprodImg(e.target.files[0])}} name = 'prodImg' ></input>
        </div>

        <div className='addProductFormField'>
        <label htmlFor='desc' className='addProductFormLabel'>Product Desc: </label>
        <input type= 'text' id='desc' className='addProductFormInput ' value={desc} onChange= {(e)=>{setdesc(e.target.value)}} name = 'desc' ></input>
        </div>

        <div className='addProductFormField'>
        <label htmlFor='price' className='addProductFormLabel'>Product Price: </label>
        <input type= 'number' id='price' className='addProductFormInput' value={price} onChange= {(e)=>{setprice(e.target.value)}} name = 'price' ></input>
        </div>
        
        <div className='addProductFormField'>
        <label htmlFor='category' className='addProductFormLabel'>Product Category: </label>
        <input type= 'text' id='category' className='addProductFormInput' value={category} onChange= {(e)=>{setcategory((e.target.value).toUpperCase())}} name = 'category' ></input>
        </div>

        <div className='addProductFormField'>
            <button type='submit' className='addProductFormSubmit' >ADD</button>
        </div>


    </form>
    </>
  )
}
