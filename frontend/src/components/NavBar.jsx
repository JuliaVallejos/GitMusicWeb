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
        <div className="contactTel">
          <Link target='_blank' to={{pathname:'https://api.whatsapp.com/send?phone=+5493584403782'}} >
              <p className="contactP">¡Contactanos! (+54) 9 3584 40-3782 </p>
              <div className="imgWhatsappHeader"></div>
          </Link>
        </div>
          <InputGroup className="searchInput">
            <Input onChange={(value)=>setSearch(value)} value={search} placeholder='Búsqueda por nombre'/>
            <Link onClick={()=>setSearch('')}  style={{display:'flex',justifyContent:'center',alignItems:'center',textDecoration:'none',color:'rgb(255, 123, 0)'}} to={search!==''?`/products/searchProducts/${search}`:'#'}>
                <Icon icon="search" style={{padding:'1vw'}} />
            </Link>
        </InputGroup>
        <div className='linksHeader'>
          <NavLink onClick={openNav} exact to='/' className='navLinks' style={{ textDecoration: 'none' }}>
            Inicio
          </NavLink>
         {(loggedUser&& loggedUser.rol==='admin')&& <NavLink onClick={openNav} exact to='/addProducts' className='navLinks'style={{ textDecoration: 'none' }}>
            Agregar Productos
          </NavLink>}
          <NavLink onClick={openNav} to={loggedUser ? '/userdetails' : '/registerUser'} className='navLinks' style={{ textDecoration: 'none' }}>
          {loggedUser ? 'Mi cuenta' : 'Iniciar sesión'}
          </NavLink>
          {loggedUser && <p className='navLinks signOut' onClick={byeBye}>Cerrar sesión</p>}
          </div>
        </div>
      </div>
      
      <div className="navBar">
    
        <div className='navBarLogo'>
          <ViewCategoryDrawer />
          <Link to='/'>
          <AiFillGithub style={{color:"white"}} className="navGithub" />
          <FaMusic className="navMusicIcon" />
          </Link>
        </div>
        <div className='links'>
          <NavLink to={loggedUser ? '/userdetails' : '/registerUser'} className='navUser'>
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
