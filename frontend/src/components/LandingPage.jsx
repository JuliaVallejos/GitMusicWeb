import React from 'react'
import '../styles/LandingPage.css'
import Recommended from './Recommended'
import {useEffect} from 'react'
import {connect} from 'react-redux'
import { AiFillGithub } from 'react-icons/ai'
import { FaMusic } from 'react-icons/fa'
import productActions from '../Redux/actions/productActions'

const LandingPage = ({allProducts}) => {
  useEffect(() => {
    allProducts()
  }, [])
  return (
    <>
      <div className='hero'>
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

const mapDispatchToProps = {
  allProducts: productActions.allProducts
}
export default connect(null,mapDispatchToProps)(LandingPage)
