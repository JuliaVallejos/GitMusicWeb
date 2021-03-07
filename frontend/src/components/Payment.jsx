import React, { useState } from 'react'
import {  Alert } from 'rsuite';
import { NavLink } from 'react-router-dom'
import '../styles/ShippingAddress.css'
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

const Payment = () => {

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
        }

        // const fdDataCard = new FormData()
        // fdDataCard.append('numCard', dataCard.numCard)
        // fdDataCard.append('altura', dataCard.NombreTitular)
        // fdDataCard.append('barrio', dataCard.fechaExpiracion)
        // fdDataCard.append('pisoDpto', dataCard.codigo)
    }

    return (
        <div className="containerFormAdreessPayment">
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
                        <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="number" placeholder="Ej: 4912 1234 1234 1234" onChange={readInput} onFocus={(e)=>{setCardFields({...cardFields, focused: e.target.name})}} />
                    </div>
                    <div className="inputDiv">
                        <label>Nombre y Apellido</label>
                        <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="name" placeholder="Ej: Fernando Biaus" onChange={readInput} onFocus={(e)=>{setCardFields({...cardFields, focused: e.target.name})}}/>
                    </div>
                    <div className="inputDiv">
                    <label>Fecha de expiracion</label>
                        <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="expiry" placeholder="MM/AA" onChange={readInput} onFocus={(e)=>{setCardFields({...cardFields, focused: e.target.name})}}/>
                    </div>
                    <div className="inputDiv">
                    <label>Codigo de seguridad</label>
                        <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="cvc" placeholder="Ej: 123" onChange={readInput} onFocus={(e)=>{setCardFields({...cardFields, focused: e.target.name})}}/>
                    </div>
                    <div class="finalizar">
                        <NavLink exact to='/billingAddress' className="enviar">
                            Volver
                        </NavLink>
                        <button className="enviar" onClick={Validate}>Finalizar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment