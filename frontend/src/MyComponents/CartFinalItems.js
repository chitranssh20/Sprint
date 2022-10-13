import React from 'react'
import './CartFinalItems.css'

export const CartFinalItems = ({element}) => {
  return (
    <li className='cartFinalListItem' >
    <div className='cartFinalListItemDetails'>
        <h4 className='cartFinalListItemDetailName' >Name: {element.name}</h4>
        <h4 className='cartFinalListItemDetailPrice' >Price: {element.price}</h4>
        
    </div>

</li>
  )
}
