import React, { useState,useEffect} from 'react'
import {  Alert } from 'rsuite';
import {connect} from 'react-redux'
import userActions from '../Redux/actions/userActions'
import '../styles/ShippingAddress.css'
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css';

const Payment = ({setNext,setFinish,completeUserData}) => {
    
    const [cardFields, setCardFields] = useState({
        cvc: '',
        expiry: '',
        name: '',
        number: '',
        focused:''
    })
    useEffect(() => {
        setNext(false)
        setFinish(false)
    }, [])
    const readInput = e => {
        var value = e.target.value
        const property = e.target.name
  
        setCardFields({
            ...cardFields,
            [property]: value
        })
    }

    const enterKeyboard = e => {
        if (e.charCode === 13) {
            Validate(e)
        }
    }

    const Validate = async () => {

        if (cardFields.number === '' || cardFields.name === '' || cardFields.cvc === '' || cardFields.expiry === '') {
            Alert.error('Todos los campos son requeridos')
            return false
        }
        const data = await completeUserData("cardFields",cardFields)
       if(data.saved){
        Alert.success('Datos guardados')
        setFinish(true)
       
       }
       
    }


    return (
        <div>
            <div className="formAdreess">
                <div className="formularioAddress">
                    <h2 className="tittle">Pago con Tarjeta</h2>
                    {/* <div className="imagCard"></div> */}
                    <div className="App-cards">
                    <Cards
                        cvc={cardFields.cvc}
                        expiry={cardFields.expiry}
                        name={cardFields.name}
                        number={cardFields.number}
                        focused={cardFields.focused}
                         />
        </div>
                    <div className="inputDiv">
                        <label>Numero</label>
                        <input onKeyPress={enterKeyboard} value={cardFields.number} type='tel' maxLength="16" pattern="\d*" autoComplete="nope" name="number" placeholder="Ej: 4912 1234 1234 1234" onChange={readInput} onFocus={(e)=>{setCardFields({...cardFields, focused: e.target.name})}} />
                    </div>
                    <div className="inputDiv">
                        <label>Nombre y Apellido</label>
                        <input onKeyPress={enterKeyboard} value={cardFields.name} type="text" autoComplete="nope" name="name" placeholder="Ej: Fernando Biaus" onChange={readInput} onFocus={(e)=>{setCardFields({...cardFields, focused: e.target.name})}}/>
                    </div>
                    <div className="inputDiv">
                    <label>Fecha de expiracion</label>
                        <input onKeyPress={enterKeyboard}  value={cardFields.expiry} type='tel' maxLength="4"autoComplete="nope" name="expiry" placeholder="MM/AA" onChange={readInput} onFocus={(e)=>{setCardFields({...cardFields, focused: e.target.name})}}/>
                    </div>
                    <div className="inputDiv">
                    <label>Codigo de seguridad</label>
                        <input onKeyPress={enterKeyboard}  value={cardFields.cvc} type='tel' maxLength="3" autoComplete="nope" name="cvc" placeholder="Ej: 123" onChange={readInput} onFocus={(e)=>{setCardFields({...cardFields, focused: e.target.name})}}/>
                    </div>
                    <div className="finalizar">
                        <button className="enviar" onClick={Validate}>Guardar Datos</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state =>{
    return{
        userData: state.userR.userData
    }
  }
const mapDispatchToProps={
    completeUserData:userActions.completeUserData,
}
export default connect(mapStateToProps,mapDispatchToProps)(Payment)