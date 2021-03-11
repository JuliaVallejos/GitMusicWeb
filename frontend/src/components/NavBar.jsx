import '../styles/NavBar.css'
import { NavLink,Link } from 'react-router-dom'
import { AiFillGithub } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'
import { FaMusic } from 'react-icons/fa'
import ViewCategoryDrawer from './ViewCategoryDrawer'
import { connect } from 'react-redux'
import userActions from '../Redux/actions/userActions'
import { useState } from 'react'
import { FiMenu } from 'react-icons/fi';
import {Input,InputGroup,Icon,Alert} from 'rsuite'

const NavBar = ({ loggedUser, signOut }) => {
  const [search,setSearch] = useState('')
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
          <div className='contactTel'>¡Contactanos! (+54) 9 3584 40-3782 <Icon  icon="whatsapp" /></div>
        <InputGroup className="searchInput">
            <Input onChange={(value)=>setSearch(value)} placeholder='Búsqueda por nombre'/>
            <InputGroup.Addon onClick={()=>setSearch('')}  >
              <Link to={search!==''?`/products/searchProducts/${search}`:'#'}>
                <Icon  icon="search" />
              </Link>
            </InputGroup.Addon>
        </InputGroup>
        <div className='linksHeader'>
          <NavLink onClick={openNav} exact to='/' className='navLinks'>
            Inicio
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
      </div>
      <InputGroup className="searchInputResponsive">
            <Input onChange={(value)=>setSearch(value)} placeholder='Búsqueda por nombre'/>
            <InputGroup.Addon onClick={()=>setSearch('')}  >
              <Link to={search!==''?`/products/searchProducts/${search}`:'#'}>
                <Icon  icon="search" />
              </Link>
            </InputGroup.Addon>
        </InputGroup>
      <div className="navBar">
    
        <div className='navBarLogo'>
          <ViewCategoryDrawer />
          <Link to='/'>
          <AiFillGithub style={{color:"white"}} className="navGithub" />
          <FaMusic className="navMusicIcon" />
          </Link>
        </div>
        <div className='links'>
          <NavLink style={{textDecoration:'none'}} to={loggedUser ? 'userdetails' : '/registerUser'} className='navLinks'>
            {!loggedUser ? <FaUserCircle className="iconUser" /> :
              (
              <div style={{cursor:'pointer'}} className="userLoggedNav">
                <div className="userPic" style={{ backgroundImage: `url(${loggedUser.pic})`, backgroundPosition: 'center', backgroundSize: 'cover' ,borderRadius:'50px'}}>
                </div>
                <span style={{color:'white',textDecoration:'none'}}>{loggedUser.firstName} {loggedUser.lastName}</span>
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
