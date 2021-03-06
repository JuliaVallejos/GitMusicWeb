import React, { useState } from 'react'
import {connect} from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import '../styles/NavigatorBar.css'

const NavigatorBar = ({categories}) => {
const [visible, setVisible] =useState(false)

    return (
        <nav>
            <div  className='containerNavigator' >
                   {categories && categories.map(category => 
            <NavLink to={`/products/${category.category}`} className="dropDown">
                   <button className="dropBtn" onMouseOver={()=>setVisible(true)}
                        onMouseOut={()=>setVisible(false)}>{category.category}</button >
            </NavLink>
             )}
            
            </div>
                   {visible && (<div className="dropdown-content">Click para saber más!</div>)}
        </nav>
    )
}

const mapStateToProps = state =>{
       return{
           categories:state.product.categories
       }
   }
   export default connect(mapStateToProps)(NavigatorBar)
  //Accesorios, Amplificadores, Bajos, Guitarras, Pedales y pedaleras, Percusión, Teclados, Sonidos, Cuerda Frotada, Vientos
