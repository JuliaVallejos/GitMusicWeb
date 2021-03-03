import React from 'react'
import '../styles/DrawerContent.css'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const CategoryDrawer = () => {
    const [categories, setCategories] = useState([
        {category: 'Accesorios',access: '#', pic: '../assets/puasdrawer.jpg'}, {category: 'Amplificadores',access: '#', pic: '../assets/amplificadordrawer.jpg'}, {category: 'Bajos',access: '#', pic: '../assets/bajodrawer.jpg'}, {category: 'Guitarras',access: '#', pic: '../assets/guitarratest.jpg'}, {category: 'Pedales y pedaleras.',access: '#', pic: '../assets/pedaldrawer.jpg'}, {category: 'Percusión',access: '#', pic: '../assets/bateriadrower.jpg' }, {category: 'Teclados',access: '#', pic: '../assets/tecladodrower.jpg'}, {category: 'Sonidos',access: '#', pic: '../assets/sonidodrawer.jpg'}, {category: 'Cuerda Frotada',access: '#', pic: '../assets/cuerdafrotadadrawer.jpg'}, {category: 'Vientos',access: '#', pic: '../assets/saxodrawer.jpg'}
    ])
    return (
        <div>
            {categories.map(category => 
                <NavLink to ={`${category.access}`} style={{textDecoration: 'none'}} className="navLinksCategory">
                    <img src={`${category.pic}`} className="drawerCategoryImg"></img>
                    <p className="textLinksCategory">{category.category}</p>
                </NavLink>
                )}
        </div>
    )
}

export default CategoryDrawer;