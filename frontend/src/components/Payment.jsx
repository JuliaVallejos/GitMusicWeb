import React, { useState, useEffect } from 'react'
import { Steps, Alert } from 'rsuite';
import { NavLink, Link } from 'react-router-dom'
import '../styles/ShippingAddress.css'


const Payment = () => {

    const [dataCard, setdataCard] = useState([])

    const readInput = e => {
        var value = e.target.value
        const property = e.target.name
        setdataCard({
            ...dataCard,
            [property]: value
        })
    }

    console.log(dataCard)

    const enterKeyboard = e => {
        if (e.charCode === 13) {
            Validate(e)
        }
    }

    const Validate = async () => {

        if (dataCard.numCard === '' || dataCard.NombreTitular === '' || dataCard.fechaExpiracion === '' || dataCard.codigo === '') {
            Alert.error('Todos los campos son requeridos')
            return false
        }

        const fdDataCard = new FormData()
        fdDataCard.append('numCard', dataCard.numCard)
        fdDataCard.append('altura', dataCard.NombreTitular)
        fdDataCard.append('barrio', dataCard.fechaExpiracion)
        fdDataCard.append('pisoDpto', dataCard.codigo)
    }

    return (
        <div className="containerFormAdreessPayment">
            <div className="formAdreess">
                <div className="formularioAddress">
                    <h2 className="tittle">Pago con Tarjeta</h2>
                    <div className="imagCard"></div>
                    <div className="inputDiv">
                        <label>Numero</label>
                        <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="numCard" placeholder="Ej: 4912 1234 1234 1234" onChange={readInput} />
                    </div>
                    <div className="inputDiv">
                        <label>Nombre y Apellido</label>
                        <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="NombreTitular" placeholder="Ej: Fernando Biaus" onChange={readInput} />
                    </div>
                    <div className="inputDiv">
                    <label>Fecha de expiracion</label>
                        <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="fechaExpiracion" placeholder="MM/AA" onChange={readInput} />
                    </div>
                    <div className="inputDiv">
                    <label>Codigo de seguridad</label>
                        <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="codigo" placeholder="Ej: 123" onChange={readInput} />
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