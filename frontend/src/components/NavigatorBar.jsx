import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import '../styles/NavigatorBar.css'

const NavigatorBar = () => {
       const [visible, setVisible] = useState(false)

       const categories = [
              { label: "Accesorios", pic: "" }, { label: "Amplificadores", pic: "" }, { label: "Bajos", pic:"" }, { label: "Guitarras", pic: "" }, { label: "Pedales", pic: "" }, { label: "Percusión", pic:"" }, { label: "Teclados", pic: "" }, { label: "Sonidos", pic: "" }, { label: "Cuerdas", pic: ""}, { label: "Vientos", pic: "" }]

       return (
              <nav>
                     <div className='containerNavigator' >
                            {categories.map(category => {
                                   return (
                                          <NavLink key={`navBar${category.label}`} to='/registerUser' className="dropDown">
                                                 <button className="dropBtn" onMouseOver={() => setVisible(true)}
                                                        onMouseOut={() => setVisible(false)}>{category.label}</button >
                                          </NavLink>
                                   )
                            })}
                     </div>
                     {visible && (<div className="dropdown-content">Haciendo click vas a encontrar toda clase de instrumentos musicales</div>)}
              </nav>
       )
}

export default NavigatorBar


