import React from 'react'
import '../styles/LandingPage.css'
import Recommended from './Recommended'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { AiFillGithub } from 'react-icons/ai'
import { FaMusic } from 'react-icons/fa'
import Navigator from "./NavigatorBar"
import productActions from '../Redux/actions/productActions'


const LandingPage = ({ getProducts, loggedUser }) => {

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
          <Navigator/>   
      <div className='hero'>
          <div className="logo">
            {/* <AiFillGithub className="github" />
            <FaMusic className="musicIcon" /> */}
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
