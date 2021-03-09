import React, {useState } from 'react'
import '../styles/DrawerContent.css'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'

const CategoryDrawer = ({categories}) => {
    return (
        <div>
            {categories.length !== 0 ? categories.map((category,i) => 
                <NavLink key={i}to ={`/products/${category.category}`} style={{textDecoration: 'none'}} className="navLinksCategory">
                    <img src={category.pic} className="drawerCategoryImg" alt=""/>
                    <p className="textLinksCategory">{category.category}</p>
                </NavLink>
                ):<h1>Loading...</h1>}
        </div>
    )
}
const mapStateToProps = state =>{
    return{
        categories:state.product.categories
    }
}
export default connect(mapStateToProps)(CategoryDrawer)