import React from 'react'
import './AdminProductTable.css'
import { useState, useEffect } from 'react'


// import { Admin } from './Admin'

export const AdminProductTable = ({productItem}) => {
  console.log(productItem)

  return (
    <>
    {productItem=== undefined?<h3></h3>:
    <table>
      <tbody>

      {productItem}
      </tbody>
    </table>

    }
    </>
  )
}
