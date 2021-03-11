import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import userActions from '../Redux/actions/userActions'
import '../styles/userDetails.css'


const UserDetails = (props) => {
  const [email, setEmail] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [image, setImage] = useState('')
  const [fileUrl, setFileUrl] = useState(null)

  useEffect(()=>{
    setEmail(props.loggedUser.email)
    setFirstname(props.loggedUser.firstName)
    setLastname(props.loggedUser.lastName)
    setFileUrl(props.loggedUser.pic)
  },[props.loggedUser.email, props.loggedUser.firstName, props.loggedUser.lastName])

  const processImage = () => {
    const imagen= document.getElementById('pic').files[0]
    const foto = URL.createObjectURL(imagen)
    setFileUrl(foto)
  }

  const prueba = (e) => {
    processImage()
    setImage(e.target.value)
  }

  const send = async(e) => {
    e.preventDefault()
    const emailValue = document.getElementById('email').value
    const firstnameValue= document.getElementById('firstName').value
    const lastnameValue= document.getElementById('lastName').value
    const imageValue= document.getElementById('pic').files[0]

    const formData = new FormData()
    formData.append('email', emailValue.trim())
    formData.append('firstName', firstnameValue.trim())
    formData.append('lastName', lastnameValue.trim())
    formData.append('pic', imageValue)
    formData.append('id', props.loggedUser.userId)

    var filesExtension = ['.jpg', '.png', '.jpeg']

    if(emailValue==='' || firstnameValue=== '' || lastnameValue === ''||  imageValue=== ''){
      alert ('Verifique que todos los campos esten llenos')
    }else if(imageValue && filesExtension.some(file=>imageValue.name.includes(file))){
      const response=await props.modifyUser(formData)
    }else{
     props.modifyUser(formData)
      alert ('formato de imagen no permitido')
    }
}

  return (
    <div className='containerSettingsUser'>
      <div className='formDetailsUser' >
            <h4>Ajustes de usuario</h4>
        <div className="label-input">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" value={email}  onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className="label-input">
          <label htmlFor="firstname">Nombre</label>
          <input type="text" name="firstName" id="firstName"  value={firstname} onChange={(e)=>setFirstname(e.target.value)} />
        </div>
        <div className="label-input">
          <label htmlFor="lastname">Apellido</label>
          <input type="text" name="lastName" id="lastName"  value={lastname} onChange={(e)=>setLastname(e.target.value)} />
        </div>
        <div className="label-input" >
            <label htmlFor="email">Foto de perfil</label>
            <input type="file" name="pic" id="pic" value={image} onChange={prueba}/>
        </div>
        <div>
          <div className="enviar" onClick={(e)=>send(e)}><span>Confirmar cambios</span></div>
        </div>
      </div>
      <div className="userImage" style={{backgroundPosition:'center',backgroundImage: `url(${fileUrl})`,borderRadius:'.25vw'}}></div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    loggedUser: state.userR.loggedUser
  }
}

  const mapDispatchToProps = {
    modifyUser: userActions.modifyUser
  }

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails)