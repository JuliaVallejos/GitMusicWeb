import React, { useState, useEffect } from 'react'
// import { connect } from 'react-redux'
import GoogleLogin from 'react-google-login'
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { Alert, Message } from 'rsuite';
import '../styles/signIn.css'




const Register = () => {

    // const { history, signIn, loggedUser } = props
    const [user, setUser] = useState({})
    const [errores, setErrores] = useState('')
    const [hidden, setHidden] = useState(true)

    const countries = ["Argentina","Bolivia","Peru","Venezuela","Uruguay","Chile","Paraguay","Brasil","Mexico","Ecuador","Colombia"]
    // useEffect(() => {
    //     if (loggedUser !== null)
    //         setTimeout(() => {
    //             history.push('/')
    //         }, 3000)
    // }, [loggedUser])

    const readInput = e => {
        const value = e.target.value
        const property = e.target.name
        setUser({
            ...user,
            [property]: value
        })
    }

    console.log(user)

    const enterKeyboard = e => {
        //El numero 13 seria la tecla enter, si fue presionada envio la validacion
        //como si fuera el boton sign in
        if (e.charCode === 13) {
            Validate(e)
        }
    }
    const Validate = async e => {
        setErrores('')
        if (!user.email || !user.password) {
            setErrores('Todos los campos son requeridos')
        } else {
            console.log("hay errores")
            // const response = await signIn(user)
            // if (response && !response.success) {
            //     setErrores(response.message)
            }
            // if (loggedUser !== null)
            //     setTimeout(() => {
            //         props.history.push('/')
            //     }, 3000)
        // }
    }
    // const responseGoogle = async response => {
    //     if (response.error) {
    //     } else {
    //         const res = await props.signIn({
    //             email: response.profileObj.email,
    //             password: `Aa${response.profileObj.googleId}`,
    //             google: 'true'
    //         }
    //         )
    //         if (res && !res.success) {
    //             Alert.error('Intente nuevamente')
    //         }
    //     }
    // }
    return (
        <div className="registroForm">
            <div className="formulario">
                <h2>Registrarse</h2>
                <p>Creá una nueva cuenta hoy para tener los beneficios de una experiencia de compra personalizada.</p>
                {errores !== '' && <Message type='info' description={errores} style={{ marginBottom: '2vh' }} />}
                <div className="inputDiv">
                    <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="firstname" placeholder="Ingrese su nombre" onChange={readInput} />
                </div>
                <div className="inputDiv">
                    <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="lastname" placeholder="Ingrese su apellido" onChange={readInput} />
                </div>
                <div className="inputDiv">
                    <select name="country" type='text' placeholder='Seleccione su país' onChange={readInput} >
                        <option value=''>Selecciona un país</option>
                        {countries.map((country, i) => {
                            return <option key={"selectCountry" + i} value={country} className="inputDiv">{country}</option>
                        })}
                    </select>
                </div>
                <div className="inputDiv">
                    <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="email" placeholder="Ingrese su dirección de correo electrónico" onChange={readInput} />
                </div>
                <div className="inputDiv">
                    <input onKeyPress={enterKeyboard} type={hidden ? "password" : " text"} name="password" placeholder="Ingrese su contraseña" onChange={readInput} />
                    < FaEye className="eye" onClick={() => setHidden(!hidden)} />
                </div>
                <button className="enviar" onClick={Validate}>Registrarse</button>
                <p>Ya tenés una cuenta en Git Musical ? Accede con tu usuario..</p>
                <GoogleLogin
                     clientId="225799266122-gmus3gf7k57dp86h5togfcjlni8os3fr.apps.googleusercontent.com" 
                    buttonText="Iniciar sesión con Google"
                    // onSuccess={responseGoogle}
                    // onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        </div>
    )
}
// const mapStateToProps = state => {
//     return {
//         loggedUser: state.userR.loggedUser
//     }
// }
// const mapDispatchToProps = {
//     signIn: userActions.signIn
// }
export default Register

// client secret google rPSbotRqanmaxXrIsITQ5cwK