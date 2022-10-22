import { type } from '@testing-library/user-event/dist/type'
import React from 'react'
import { useState } from 'react'
import './AutoSuggestion.css'
import uuid from 'react-uuid'
import { Navigate, useNavigate } from 'react-router-dom'
export const AutoSuggestion = ({queries}) => {
    
 let navigate = useNavigate();
  let suggestion = []

  try {
    if(queries.length>0 && queries.length<=5){
      for(let i = 0; i<5; i++){
        suggestion.push(queries[i]);
      }
    }
    else{
      for(let i = 0; i<5; i++){
        suggestion.push(queries[i]);
      }
    }
    
  } catch (error) {
    
  }
  return (
    
    <>
      {
   suggestion.map((query)=>{
      if(query!=undefined){

        return <li key={uuid()} onClick = {(e)=>{navigate(`product/${query.prodId}`)}}  className='suggestedList' >{query.name}  </li>
      }
    
          })}
    </>
    )
}
