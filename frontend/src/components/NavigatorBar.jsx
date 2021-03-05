import React, { useState } from 'react'
import {connect} from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import '../styles/NavigatorBar.css'

<<<<<<< HEAD
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


=======
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
>>>>>>> 395ed32c7e35599fc63bee42cad2255d34e16e1e
