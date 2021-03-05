import '../styles/NavBar.css'
import { NavLink, Link } from 'react-router-dom'
import { AiFillGithub } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'
import { FaMusic } from 'react-icons/fa'


const NavBar = () => {
  return (
    <nav>
      <div className="navBar">
        <div className='navBarLogo'>
          <AiFillGithub className="navGithub" />
          <FaMusic className="navMusicIcon" />
        </div>

        <div className='links'>
          <NavLink to='/' className='navLinks'>
            Mi cuenta
          </NavLink>
          <NavLink to='/registerUser' className='navLinks'>
            <FaUserCircle className="iconUser" />
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
