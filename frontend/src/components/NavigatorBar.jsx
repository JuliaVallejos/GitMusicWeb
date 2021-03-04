import React, { useState } from 'react'
import {connect} from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import '../styles/NavigatorBar.css'

const NavigatorBar = ({categories}) => {
const [visible, setVisible] =useState(false)

    return (
        <nav>
            <div  className='containerNavigator' >
                   {categories.map(category => 
            <NavLink to={`/products/${category.category}`} className="dropDown">
                   <button className="dropBtn" onMouseOver={()=>setVisible(true)}
                        onMouseOut={()=>setVisible(false)}>{category.category}</button >
            </NavLink>
             )}
            {/* <NavLink to='/registerUser' className="dropDown">
                   <button className="dropBtn" onMouseOver={()=>setVisible(true)}
                        onMouseOut={()=>setVisible(false)}>Amplificadores</button >
            </NavLink>
            <NavLink to='/registerUser' className="dropDown">
                   <button className="dropBtn" onMouseOver={()=>setVisible(true)}
                        onMouseOut={()=>setVisible(false)}>Bajos</button >
            </NavLink>
            <NavLink to='/registerUser' className="dropDown">
                   <button className="dropBtn" onMouseOver={()=>setVisible(true)}
                        onMouseOut={()=>setVisible(false)}>Guitarras</button >
            </NavLink>
            <NavLink to='/registerUser' className="dropDown">
                   <button className="dropBtn" onMouseOver={()=>setVisible(true)}
                        onMouseOut={()=>setVisible(false)}>Pedaleras</button >
            </NavLink>
            <NavLink to='/registerUser' className="dropDown">
                   <button className="dropBtn" onMouseOver={()=>setVisible(true)}
                        onMouseOut={()=>setVisible(false)}>Percusión</button >
            </NavLink>
            <NavLink to='/registerUser' className="dropDown">
                   <button className="dropBtn" onMouseOver={()=>setVisible(true)}
                        onMouseOut={()=>setVisible(false)}>Teclados</button >
            </NavLink>
            <NavLink to='/registerUser' className="dropDown">
                   <button className="dropBtn" onMouseOver={()=>setVisible(true)}
                        onMouseOut={()=>setVisible(false)}>Sonidos</button >
            </NavLink>
            <NavLink  to='/registerUser' className="dropDown">
                   <button className="dropBtn" onMouseOver={()=>setVisible(true)}
                        onMouseOut={()=>setVisible(false)}>Cuerda Frotada</button >
            </NavLink>
            <NavLink to='/registerUser' className="dropDown">
                   <button className="endBtn" onMouseOver={()=>setVisible(true)}
                        onMouseOut={()=>setVisible(false)}>Vientos</button >
            </NavLink>
         */}
            </div>
                   {visible && (<div className="dropdown-content">Tenemos lo que buscas. Toda clase de instrumentos musicales y accesorios!</div>)}
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
