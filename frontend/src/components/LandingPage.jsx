import React from 'react'
import '../styles/LandingPage.css'
import Recommended from './Recommended'
import { AiFillGithub } from 'react-icons/ai'
import { FaMusic } from 'react-icons/fa'
const LandingPage = () => {
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

export default LandingPage
