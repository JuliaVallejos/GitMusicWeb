import React from 'react'
import '../styles/NavBar.css'
import { NavLink, Link } from 'react-router-dom'
import { AiFillGithub } from 'react-icons/ai'
import { FaMusic } from 'react-icons/fa'

const NavBar = () => {
  return (
    <nav>
      <div className='navBarLogo'>
        <AiFillGithub className="navGithub" />
        <FaMusic className="navMusicIcon" />
      </div>

      <div className='links'>
        <NavLink to='/' className='navLinks'>
          Inicio
        </NavLink>
        <NavLink to='/signup' className='navLinks'>
          Registrate
        </NavLink>
        <NavLink to='/signin' className='navLinks'>
          Inicia sesión
        </NavLink>
      </div>
    </nav>
  )
}

export default NavBar
