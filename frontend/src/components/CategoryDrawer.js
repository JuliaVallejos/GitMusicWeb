import React from 'react'
import '../styles/DrawerContent.css'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const CategoryDrawer = () => {
    const [categories, setCategories] = useState([
        {category: 'Accesorios', pic: '../assets/puasdrawer.jpg'}, {category: 'Amplificadores', pic: '../assets/amplificadordrawer.jpg'}, {category: 'Bajos', pic: '../assets/bajodrawer.jpg'}, {category: 'Guitarras', pic: '../assets/guitarratest.jpg'}, {category: 'Pedales y pedaleras', pic: '../assets/pedaldrawer.jpg'}, {category: 'Percusión', pic: '../assets/bateriadrower.jpg' }, {category: 'Teclados',pic: '../assets/tecladodrower.jpg'}, {category: 'Sonidos', pic: '../assets/sonidodrawer.jpg'}, {category: 'Cuerda Frotada', pic: '../assets/cuerdafrotadadrawer.jpg'}, {category: 'Vientos', pic: '../assets/saxodrawer.jpg'}
    ])
    return (
        <div>
            {categories.map(category => 
                <NavLink to ={`/products/${category.category}`} style={{textDecoration: 'none'}} className="navLinksCategory">
                    <img src={`${category.pic}`} className="drawerCategoryImg"></img>
                    <p className="textLinksCategory">{category.category}</p>
                </NavLink>
                )}
        </div>
    )
}

export default CategoryDrawer;