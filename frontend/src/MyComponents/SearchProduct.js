import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios'
import PostItem from './PostItem'
import Paginate from './Paginate'
import './Product.css'

export const SearchProduct = () => {
    const [postPerpage, setpostPerpage] = useState(6)
const {query} = useParams();
const [searchQuery, setsearchQuery] = useState([])

console.log('here is the query  ',query)
useEffect(() => {
    const searchProducts = () =>{

        try {
            axios.get(`http://localhost:8000/sprint/peek/?search=${query}`).then(function(res){
    
                setsearchQuery(res.data)
                console.log(res.data)
                // window.location.reload();        
            }
            ).catch(err => console.log(err));
        } catch (error) {
            console.log(error)
        }
        console.log('here are the products')
    }
    searchProducts()
}, [])



searchQuery.map((prod)=>{
    prod.prodImg = prod.prodImg.slice(11)
    prod.prodImg = ''+prod.prodImg
    console.log('img', prod.prodImg)
})
console.log(searchQuery)
const [currentPage, setcurrentPage] = useState(1)
const paginate = (pageNumber) =>{
    setcurrentPage(pageNumber)
}
const [picUrl, setpicUrl] = useState(1)

  return (
    <>
   <div className='products'  >

<PostItem picUrl= {picUrl}   post = {searchQuery} />
</div>
<Paginate postPerpage={postPerpage} totalPosts= {searchQuery.length} paginate = {paginate} />
    </>
  )
}
