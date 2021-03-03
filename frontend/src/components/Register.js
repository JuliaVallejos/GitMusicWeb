import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import GoogleLogin from 'react-google-login'
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { Alert, Message } from 'rsuite';
import userActions from "../Redux/actions/userActions"
import '../styles/signIn.css'


const Register = (props) => {

    const { history, signUp, loggedUser,googleSignUp } = props
    const [newUser, setNewUser] = useState({})
    const [errores, setErrores] = useState('')
    const [errorObj, setErrorObj] = useState({})
    const [hidden, setHidden] = useState(true)

    const failedInputs = {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        urlPic: null,
        country: null,
        phone: null
    }

    const countries = ["Argentina", "Bolivia", "Peru", "Venezuela", "Uruguay", "Chile", "Paraguay", "Brasil", "Mexico", "Ecuador", "Colombia"]

    // useEffect(() => {
    //     if (loggedUser !== null)
    //         setTimeout(() => {
    //             history.push('/')
    //         }, 3000)
    // }, [loggedUser])
    
    const readInput = e => {
        const value = e.target.value
        const property = e.target.name
        setNewUser({
            ...newUser,
            [property]: value
        })
    }
    const Validate = async e => {
        setErrores('')
        if (newUser.firstName === '' || newUser.lastName === '' || newUser.email === '' || newUser.password === '' || newUser.country === '') {
            Alert.error('Todos los campos son requeridos')
            return false
        }
        const res = await signUp(newUser)
     

        if (res && !res.success) {
            setErrores(res.response)
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
                // googlePic: response.profileObj.imageUrl,
                password: `Aa${response.profileObj.googleId}`,
                country: 'Argentina',
                google: 'true'

            })
            if (respuesta && !respuesta.success) {
                setErrores(respuesta.errores)
            }
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
                <p>Creá una nueva cuenta hoy para tener los beneficios de una experiencia de compra personalizada.</p>
                {errores !== '' && <Message type='info' description={errores} style={{ marginBottom: '2vh' }} />}
                <div className="inputDiv">
                    <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="firstName" placeholder="Ingrese su nombre" onChange={readInput} />
                    <small>{errorObj.firstName}</small>
                </div>
                <div className="inputDiv">
                    <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="lastName" placeholder="Ingrese su apellido" onChange={readInput} />
                    <small>{errorObj.lastName}</small>
                </div>
                <div className="inputDiv">
                    <small>{errorObj.country}</small>
                    <select name="country" type='text' placeholder='Seleccione su país' onChange={readInput} >
                        <option value=''>Selecciona un país</option>
                        {countries.map((country, i) => {
                            return <option key={"selectCountry" + i} value={country} className="inputDiv">{country}</option>
                        })}
                    </select>
                </div>
                <div className="inputDiv">
                    <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="email" placeholder="Ingrese su dirección de correo electrónico" onChange={readInput} />
                    <small>{errorObj.email}</small>
                </div>
                <div className="inputDiv">
                    <input onKeyPress={enterKeyboard} type={hidden ? "password" : " text"} name="password" placeholder="Ingrese su contraseña" onChange={readInput} />
                    < FaEye className="eye" onClick={() => setHidden(!hidden)} />
                    <small>{errorObj.password}</small>
                </div>
                <button className="enviar" onClick={Validate}>Registrarse</button>
                <p>Ya tenés una cuenta en Git Musical ? Accede con tu usuario..</p>
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