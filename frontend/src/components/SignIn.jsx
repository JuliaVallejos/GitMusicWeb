import React, { useState } from 'react'
import { connect } from 'react-redux'
import GoogleLogin from 'react-google-login'
import { FaEye } from "react-icons/fa";
import { Link} from 'react-router-dom'
import { Alert, Message } from 'rsuite';
import userActions from '../Redux/actions/userActions'
import '../styles/signIn.css'
import { useHistory } from "react-router-dom";
import { Button } from 'rsuite'

const SignIn = (props) => {
    let history = useHistory();
    const {  signIn } = props
    const [user, setUser] = useState({})
    const [errores, setErrores] = useState('')
    const [hidden, setHidden] = useState(true)



    const readInput = e => {
        const value = e.target.value
        const property = e.target.name
        setUser({
            ...user,
            [property]: value
        })
    }
    const enterKeyboard = e => {
        if (e.charCode === 13) {
            Validate(e)
        }
    }
    const Validate = async e => {
        setErrores('')
        if (!user.email || !user.password) {
            setErrores('Todos los campos son requeridos')
        } else {
            const response = await signIn(user)
            if (response && !response.success) {
                setErrores(response.message)
        }

        }
    }
     
    const responseGoogle = async response => {
        if (response.error) {
        } else {
            const res = await props.signIn({
                email: response.profileObj.email,
                password: `Aa${response.profileObj.googleId}`,
                google: 'true'
            }
            )
            if (res && !res.success) {
                Alert.error('Intente nuevamente')
            }
        }
    }

    return (
        <>
<<<<<<< HEAD
=======
     
>>>>>>> f1eb8a268e9e2f57946f4d5d9f56b557eafec706
        <div className="registro">
            <div className="formularioSignIn">
                <h2>Acceder</h2>
                <div className="text">
                    <h4>Iniciá sesión con tu cuenta</h4>
                </div>

                {errores !== '' && <Message type='info' description={errores} style={{ marginBottom: '2vh' }} />}
                <div className="inputDiv">
                    <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="email" placeholder="Ingrese su dirección de correo electrónico" onChange={readInput} />
                </div>
                <div className="inputDiv">
                    <input onKeyPress={enterKeyboard} type={hidden ? "password" : " text"} name="password" placeholder="Ingrese su contraseña" onChange={readInput} />
                    < FaEye className="eye" onClick={() => setHidden(!hidden)} />
                </div>
                <button className="enviar" onClick={Validate}>Acceder</button>
                <Link to='/forgotpassword' className='navBarLinks' style={{ margin: '2vh' }}>
                    <h6>¿Olvidaste tu contraseña?</h6>
                </Link>
                <GoogleLogin
                     clientId="225799266122-gmus3gf7k57dp86h5togfcjlni8os3fr.apps.googleusercontent.com" 
                    buttonText="Iniciar sesión con Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}                            
                    cookiePolicy={'single_host_origin'}
                />

            </div>
        </div>
        </>
    )
}
const mapStateToProps = state => {
    return {
        loggedUser: state.userR.loggedUser
    }
}
const mapDispatchToProps = {
    signIn: userActions.logIn
}
export default connect(mapStateToProps,mapDispatchToProps)(SignIn)

