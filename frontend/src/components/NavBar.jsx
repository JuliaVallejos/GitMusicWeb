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
    signOut()
  }
  return (
    <nav>
      <div className="navBar">
        <div className='navBarLogo'>
          <ViewCategoryDrawer />
          <AiFillGithub className="navGithub" />
          <FaMusic className="navMusicIcon"  />
        </div>

        <div className='links'>
        {/* <NavLink exact to='/' className='navLinks'>
            Home
          </NavLink>
           <NavLink exact to='/addProducts' className='navLinks'>
            Agregar Productos
          </NavLink>
          <NavLink to={loggedUser?'/userdetails':'/registerUser'} className='navLinks'>
            Mi cuenta
          </NavLink>
          <NavLink to='/singleproduct' className='navLinks'>
            Product
          </NavLink> */}
            {loggedUser && <p className='navLinks signOut' onClick={byeBye}>Cerrar sesión</p>}
          <NavLink to={loggedUser ? 'userdetails' : '/registerUser'} className='navLinks'>
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
