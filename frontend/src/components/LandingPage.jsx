import React from 'react'
import '../styles/LandingPage.css'
import Recommended from './Recommended'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { AiFillGithub } from 'react-icons/ai'
import { FaMusic } from 'react-icons/fa'
import Navigator from "./NavigatorBar"
import productActions from '../Redux/actions/productActions'
import { NavLink, Link } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi';

const LandingPage = ({ getProducts, loggedUser }) => {
  const [nav, setNav] = useState(true)

  const openNav = () => {
    setNav(!nav)
  }
  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
          <Navigator/>
        <FiMenu className="burger" onClick={openNav}/>
      <div className='hero'>
        <div className={nav ? "navMenu" : "navMenu activeNav"}>
          <div className='links'>
            <NavLink onClick={openNav} exact to='/' className='navLinks'>
              Home
          </NavLink>
            <NavLink onClick={openNav} exact to='/addProducts' className='navLinks'>
              Agregar Productos
          </NavLink>
            <NavLink onClick={openNav} to={loggedUser ? '/userdetails' : '/registerUser'} className='navLinks'>
              Mi cuenta
          </NavLink>
            <NavLink onClick={openNav} to='/singleproduct' className='navLinks'>
              Product
          </NavLink>
          </div>
        </div> 

          <div className="logo">
            <AiFillGithub className="github" />
            <FaMusic className="musicIcon" />
          </div>
          <h1>GitMusic</h1>
      </div>
      <Recommended />

    </>
  )
}
const mapStateToProps = state => {
  return {
    loggedUser: state.userR.loggedUser

  }
}
const mapDispatchToProps = {
  getProducts: productActions.getProducts
}
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)
