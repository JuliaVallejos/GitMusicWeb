import React from 'react'
import {FaFacebookSquare} from 'react-icons/fa'
import { IoLogoWhatsapp} from 'react-icons/io'
import { AiFillInstagram} from 'react-icons/ai'
import '../styles/Footer.css'

const Footer = () => {
  return (
    <div className="footer">
      <div className="iconos">
        <div className="iconGrupo">
        <p>©GitMusic 2021 - Desarrollado por</p>
        <div className="imagSettings"></div>
        </div>

        {/* <div>
          <IoLogoWhatsapp  className="ico"/>
          <AiFillInstagram  className="ico"/>
          <FaFacebookSquare className="ico"/>
        </div> */}
        
      </div>
    </div>
  )
}

export default Footer
