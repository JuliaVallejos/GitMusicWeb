import React from 'react'
import '../styles/NavBar.css'
import { NavLink, Link } from 'react-router-dom'
import { AiFillGithub } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'
import { FaMusic} from 'react-icons/fa'
import ViewCategoryDrawer from './ViewCategoryDrawer'
import { connect } from 'react-redux'
import userActions from '../Redux/actions/userActions'

const NavBar = ({loggedUser, signOut}) => {

  const byeBye = () =>{
    localStorage.clear()
    signOut()
  }
  return (
    <nav>
      <div className="navBar">
        <div className='navBarLogo'>
          <AiFillGithub className="navGithub" />
          <FaMusic className="navMusicIcon" />
          <ViewCategoryDrawer />
        </div>

        <div className='links'>
          <NavLink to='/' className='navLinks'>
            Mi cuenta
          </NavLink>
            {loggedUser && <p className='navLinks signOut' onClick={byeBye}>Cerrar sesión</p>}
          <NavLink to='/registerUser' className='navLinks'>
            {!loggedUser ? <FaUserCircle className="iconUser"/> :(
              
              <div className="userPic" style={{backgroundImage: `url(.${loggedUser.pic})`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
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
const mapDispatchToProps ={
    signOut: userActions.signOut
}
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
