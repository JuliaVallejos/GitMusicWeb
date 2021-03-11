import React, { useState } from 'react'
import { connect } from 'react-redux'
import GoogleLogin from 'react-google-login'
import { FaEye } from "react-icons/fa";
import { Alert } from 'rsuite';
import userActions from "../Redux/actions/userActions"
import '../styles/signIn.css'


const Register = (props) => {
    const { signUp,googleSignUp } = props
    const [newUser, setNewUser] = useState({google: 'false'})
    const [errorObj, setErrorObj] = useState({})
    const [hidden, setHidden] = useState(true)

    const failedInputs = {
        firstName: null,
        lastName: null,
        email: null,
        password: null
    }

    const readInput = e => {
        var value = e.target.value
        const property = e.target.name
        if (property === 'fileUrlPic') value = e.target.files[0]
        setNewUser({
            ...newUser,
            [property]: value
        })
    }
    const Validate = async () => {

        if (newUser.firstName === '' || newUser.lastName === '' || newUser.email === '' || newUser.password === '' || newUser.country === '') {
            Alert.error('Todos los campos son requeridos')
            return false
        }
        //llenando el formData con la informacion de los input
        const fdNewUser = new FormData()
        fdNewUser.append('firstName', newUser.firstName)
        fdNewUser.append('lastName', newUser.lastName)
        fdNewUser.append('fileUrlPic', newUser.fileUrlPic)
        fdNewUser.append('email', newUser.email)
        fdNewUser.append('password', newUser.password)
        fdNewUser.append('google', newUser.google)

        const res = await signUp(fdNewUser)
        if (res && !res.success) {
            res.response.map(error => {
                failedInputs[error.label] = error.message
                return false
            })
            setErrorObj(failedInputs)
        }
    }
    const responseGoogle = async (response) => {
        if (response.error) {
            Alert.error('Intente nuevamente', 4000)
        } else {
            const respuesta = await googleSignUp({
                firstName: response.profileObj.givenName,
                lastName: response.profileObj.familyName,
                email: response.profileObj.email,
                pic: response.profileObj.imageUrl,
                password: `Aa${response.profileObj.googleId}`,
                google: 'true'
            })
        }
    }
    
    const enterKeyboard = e => {
        if (e.charCode === 13) {
            Validate(e)
        }
    }

    return (
        <div className="registroForm">
            <div className="formulario">
                <h2>Registrarse</h2>
                <h4>Creá una nueva cuenta hoy para tener los beneficios de una experiencia de compra personalizada.</h4>
                <div className="inputDiv">
                    <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="firstName" placeholder="Ingrese su nombre" onChange={readInput} />
                    <small>{errorObj.firstName}</small>
                </div>
                <div className="inputDiv">
                    <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="lastName" placeholder="Ingrese su apellido" onChange={readInput} />
                    <small>{errorObj.lastName}</small>
                </div>
                <div className="inputDiv">
                    <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="email" placeholder="Ingrese su dirección de correo electrónico" onChange={readInput} />
                    <small>{errorObj.email}</small>
                </div>
                <div className="inputDiv"> 
                <small>Url de foto de perfil</small>
                    <input name='fileUrlPic' type='file' placeholder='Url de foto de perfil' onChange={readInput} />
                </div>
                <div className="inputDiv">
                    <input onKeyPress={enterKeyboard} type={hidden ? "password" : " text"} name="password" placeholder="Ingrese su contraseña" onChange={readInput} />
                    < FaEye className="eye" onClick={() => setHidden(!hidden)} />
                    <small>{errorObj.password}</small>
                </div>
                <button className="enviar" onClick={Validate}>Registrarse</button>
                <GoogleLogin
                    clientId="225799266122-gmus3gf7k57dp86h5togfcjlni8os3fr.apps.googleusercontent.com"
                    buttonText="Registrarse con Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        loggedUser: state.userR.loggedUser
    }
}
const mapDispatchToProps = {
    signUp: userActions.signUp,
    googleSignUp: userActions.googleSignUp
}
export default connect(mapStateToProps, mapDispatchToProps)(Register)