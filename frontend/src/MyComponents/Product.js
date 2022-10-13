import React, {useState, useEffect} from 'react'
import PostItem from './PostItem'
import Paginate from './Paginate'
import axios from 'axios'
import './Product.css'

export const Product = () => {
    const [post, setpost] = useState([])
    // let postPerPage = 2
    const [loading, setloading] = useState(false)
    const [currentPage, setcurrentPage] = useState(1)
    const [postPerpage, setpostPerpage] = useState(6)
    useEffect(() => {
        setloading(true)
        axios.get('http://127.0.0.1:8000/sprint/getProduct/').then(res => {
            setpost(res.data.products)
            console.log(post)
        })
        .catch(err => console.log(err));
         setloading(false)   
    }, [])

    console.log(post)
    const indexOfLastPost = currentPage * postPerpage
    const indexofFirstPost = indexOfLastPost - postPerpage
    const currentPosts = post.slice(indexofFirstPost, indexOfLastPost);

    const paginate = (pageNumber) =>{
        setcurrentPage(pageNumber)
    }

  return (
    <>
    <div className='products'  >

    <PostItem loading  = {loading} post = {currentPosts} />
    </div>
    <Paginate postPerpage={postPerpage} totalPosts= {post.length} paginate = {paginate} />

    </>
  )
}
