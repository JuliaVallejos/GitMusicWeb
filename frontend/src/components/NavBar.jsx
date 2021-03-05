import '../styles/NavBar.css'
import { NavLink, Link } from 'react-router-dom'
import { AiFillGithub } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'
import { FaMusic} from 'react-icons/fa'
import ViewCategoryDrawer from './ViewCategoryDrawer'
import { connect } from 'react-redux'
import userActions from '../Redux/actions/userActions'

<<<<<<< HEAD

const NavBar = () => {
=======
const NavBar = ({loggedUser, signOut}) => {

  const byeBye = () =>{
    localStorage.clear()
    signOut()
  }
>>>>>>> 395ed32c7e35599fc63bee42cad2255d34e16e1e
  return (
    <nav>
      <div className="navBar">
        <div className='navBarLogo'>
          <AiFillGithub className="navGithub" />
          <FaMusic className="navMusicIcon" />
          <ViewCategoryDrawer />
        </div>

        <div className='links'>
        <NavLink exact to='/' className='navLinks'>
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
          </NavLink>
            {loggedUser && <p className='navLinks signOut' onClick={byeBye}>Cerrar sesión</p>}
          <NavLink to='/registerUser' className='navLinks'>
<<<<<<< HEAD
            <FaUserCircle className="iconUser" />
=======
            {!loggedUser ? <FaUserCircle className="iconUser"/> :(
              
              <div className="userPic" style={{backgroundImage: `url(.${loggedUser.pic})`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
              </div>
            )}
>>>>>>> 395ed32c7e35599fc63bee42cad2255d34e16e1e
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
