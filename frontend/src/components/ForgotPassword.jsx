import {useState,useEffect} from 'react'
import { connect } from 'react-redux'
import {Alert} from 'rsuite';
import userActions from '../Redux/actions/userActions'
import '../styles/ForgotPassword.css'


const ForgotPassword = (props)=>{

  const [email, setEmail]= useState('')
    
    const readInput= e =>{
        var value = e.target.value

        setEmail(value)
    }
    const sendContact = async e =>{
        e.preventDefault()
        if(email===''){
            Alert.error('Escriba su email')
            return false
        }

        
        const data = await props.requestResetPass(email)
        
        if(data.data.success){
           props.history.push('/')
        }
        
      
    }


    return(
        <>
        <div className="containerForgotPass" >
            <div className='containerForm'>
            <h2>Recuperación de contraseña</h2>
            <form className='formularioPass'> 
                 <input  type='email' name="email"  placeholder="Escribe tu email" onChange={readInput}></input>
                <button className='btn_enviar' onClick={sendContact}>Enviar</button>
             
                <p>Se enviará un email para recuperar su contraseña</p>
            </form>
            </div>
        </div>
        </>
    )
}

const mapDispatchToProps ={
    requestResetPass: userActions.requestResetPass
}
export default connect (null,mapDispatchToProps)(ForgotPassword)