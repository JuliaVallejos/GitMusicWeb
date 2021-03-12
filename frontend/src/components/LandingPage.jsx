import React from 'react'
import '../styles/LandingPage.css'
import Recommended from './Recommended'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import Navigator from "./NavigatorBar"
import productActions from '../Redux/actions/productActions'


const LandingPage = ({ getProducts}) => {

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
    getProducts()
  }, [])

  return (
    <>
          <Navigator/>   
      <div className='hero'>
          <div className="logo">
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
