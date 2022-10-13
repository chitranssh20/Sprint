import React from 'react'

const Paginate = ({postPerpage, totalPosts, paginate }) => {
    const pageNumbers = [];
    for(let i  = 1; i<= Math.ceil(totalPosts / postPerpage); i++){
        pageNumbers.push(i);
    }

  return (
    <>
    <nav className='text-center' >
        <ul className='pagination  ' >
            {pageNumbers.map(number =>{
               return <li key={number} className = 'bg-dark page-item' >
                    <a href='!#' onClick = {(e)=>{
                        e.preventDefault()
                     paginate(number)}}    className=' page-link' >
                        {number}
                    </a>
                </li>
            })

            }
        </ul>


    </nav>
    </>
  )
}

export default Paginate