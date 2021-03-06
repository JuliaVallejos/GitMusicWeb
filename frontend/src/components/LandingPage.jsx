import React from 'react'
import '../styles/LandingPage.css'
import Recommended from './Recommended'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { AiFillGithub } from 'react-icons/ai'
import { FaMusic } from 'react-icons/fa'
import Navigator from "./NavigatorBar"
import productActions from '../Redux/actions/productActions'
import { NavLink, Link } from 'react-router-dom'

const LandingPage = ({ getProducts,loggedUser }) => {
  useEffect(() => {
    getProducts()
  }, [])
  return (
    <>
      <div className='hero'>
      <Navigator />
      <div className='links'>
        <NavLink exact to='/' className='navLinks'>
          Home
          </NavLink>
        <NavLink exact to='/addProducts' className='navLinks'>
          Agregar Productos
          </NavLink>
        <NavLink to={loggedUser ? '/userdetails' : '/registerUser'} className='navLinks'>
          Mi cuenta
          </NavLink>
        <NavLink to='/singleproduct' className='navLinks'>
          Product
          </NavLink>
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
