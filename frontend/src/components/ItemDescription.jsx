import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Dropzone from "react-dropzone";
import { Alert, Message } from 'rsuite';
import DropFiles from './DropFiles'
import userActions from '../Redux/actions/userActions'
import '../styles/addProducts.css'
import Product from './Product';


const ItemDescription = ({addItemDescription,newItem,removeLine,lines}) => {
   
 

    return (
        <div className='addDescription'>
        <input type="text" name='description' placeholder="Descripción(una oración por línea)" onChange={addItemDescription}/>
     
        {lines >= 2 && <button  name={newItem} onClick={removeLine} className="removeLine">Borrar</button>}
        </div>
    )
}


export default ItemDescription

