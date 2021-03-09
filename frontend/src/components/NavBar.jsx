import '../styles/NavBar.css'
import { NavLink } from 'react-router-dom'
import { AiFillGithub } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'
import { FaMusic } from 'react-icons/fa'
import ViewCategoryDrawer from './ViewCategoryDrawer'
import { connect } from 'react-redux'
import userActions from '../Redux/actions/userActions'
import { useEffect, useState } from 'react'
import { FiMenu } from 'react-icons/fi';

const NavBar = ({ loggedUser, signOut }) => {
  const [nav, setNav] = useState(true)

  const openNav = () => {
    setNav(!nav)
  }

  const byeBye = () => {
    signOut()
  }
  return (
    <nav className="navHeader">
      <FiMenu className="burger" onClick={openNav} />
      <div className={nav ? "navMenu" : "navMenu activeNav"}>
        <div className="header">
          <NavLink onClick={openNav} exact to='/' className='navLinks'>
            Home
          </NavLink>
          <NavLink onClick={openNav} exact to='/addProducts' className='navLinks'>
            Agregar Productos
          </NavLink>
          <NavLink onClick={openNav} to={loggedUser ? '/userdetails' : '/registerUser'} className='navLinks'>
            Mi cuenta
          </NavLink>
          {loggedUser && <p className='navLinks signOut' onClick={byeBye}>Cerrar sesión</p>}

        </div>
      </div>
      <div className="navBar">
        <div className='navBarLogo'>
          <ViewCategoryDrawer />
          <AiFillGithub className="navGithub" />
          <FaMusic className="navMusicIcon" />
        </div>
        {/* <NavLink to='/singleproduct' className='navLinks'>
            Product
          </NavLink> */}
        <div className='links'>
          <NavLink to={loggedUser ? 'userdetails' : '/registerUser'} className='navLinks'>
            {!loggedUser ? <FaUserCircle className="iconUser" /> :
              (<div className="userPic" style={{ backgroundImage: `url(.${loggedUser.pic})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
              </div>
              )}
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
const mapStateToProps = state => {
  return {
    loggedUser: state.userR.loggedUser

  }
}
const mapDispatchToProps = {
  signOut: userActions.signOut
}
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
