import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import '../styles/NavigatorBar.css'

const NavigatorBar = () => {
const [visible, setVisible] =useState(false)

    return (
        <nav>
            <div  className='containerNavigator' >
            <NavLink to='/registerUser' className="dropDown">
                   <button className="dropBtn" onMouseOver={()=>setVisible(true)}
                        onMouseOut={()=>setVisible(false)}>Accesorios</button >
            </NavLink>
            <NavLink to='/registerUser' className="dropDown">
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
        
            </div>
                   {visible && (<div className="dropdown-content">Tenemos lo que buscas. Toda clase de instrumentos musicales y accesorios!</div>)}
        </nav>
    )
}

export default NavigatorBar

  //Accesorios, Amplificadores, Bajos, Guitarras, Pedales y pedaleras, Percusión, Teclados, Sonidos, Cuerda Frotada, Vientos
