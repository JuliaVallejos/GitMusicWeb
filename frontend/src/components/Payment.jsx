import React, { useState } from 'react'
import {  Alert } from 'rsuite';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import userActions from '../Redux/actions/userActions'
import '../styles/ShippingAddress.css'
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css';

const Payment = ({userData,shoppingCart,loggedUser,completeUserData,emailShopCart}) => {
    

    const [cardFields, setCardFields] = useState({
        cvc: '',
        expiry: '',
        name: '',
        number: '',
        focused:''
    })

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
       console.log(data)
       if(data.saved){
           Alert.success('Compra confirmada')
           const email= await emailShopCart(loggedUser.email,{userData,shoppingCart})
           if(email){
            Alert.success('Recibirá un mail con los datos de su compra')
           }
      
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
                        <input onKeyPress={enterKeyboard} type="number" autoComplete="nope" name="number" placeholder="Ej: 4912 1234 1234 1234" onChange={readInput} onFocus={(e)=>{setCardFields({...cardFields, focused: e.target.name})}} />
                    </div>
                    <div className="inputDiv">
                        <label>Nombre y Apellido</label>
                        <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="name" placeholder="Ej: Fernando Biaus" onChange={readInput} onFocus={(e)=>{setCardFields({...cardFields, focused: e.target.name})}}/>
                    </div>
                    <div className="inputDiv">
                    <label>Fecha de expiracion</label>
                        <input onKeyPress={enterKeyboard} type="number" autoComplete="nope" name="expiry" placeholder="MM/AA" onChange={readInput} onFocus={(e)=>{setCardFields({...cardFields, focused: e.target.name})}}/>
                    </div>
                    <div className="inputDiv">
                    <label>Codigo de seguridad</label>
                        <input onKeyPress={enterKeyboard} type="number" autoComplete="nope" name="cvc" placeholder="Ej: 123" onChange={readInput} onFocus={(e)=>{setCardFields({...cardFields, focused: e.target.name})}}/>
                    </div>
                    <div class="finalizar">
                        <button className="enviar" onClick={Validate}>Guardar Datos</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state =>{
    return{
        userData:state.userR.userData,
        shoppingCart:state.shoppingR.shoppingCart,
        loggedUser:state.userR.loggedUser
    }
}
const mapDispatchToProps={
    completeUserData:userActions.completeUserData,
    emailShopCart:userActions.emailShopCart
}
export default connect(mapStateToProps,mapDispatchToProps)(Payment)