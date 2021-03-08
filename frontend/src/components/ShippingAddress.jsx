import React, { useState } from 'react'
import {  Alert } from 'rsuite';
import { NavLink } from 'react-router-dom'
import '../styles/ShippingAddress.css'


const ShippingAddress = () => {

    const [address, setaddress] = useState([])

    const readInput = e => {
        var value = e.target.value
        const property = e.target.name
        setaddress({
            ...address,
            [property]: value
        })
    }

    console.log(address)

    const enterKeyboard = e => {
        if (e.charCode === 13) {
            Validate(e)
        }
    }

    const Validate = async () => {

        if (address.calle === '' || address.altura === '' || address.barrio === '' || address.pisoDpto === '' || address.encargadoDeRecibir === '' || address.contacto === '') {
            Alert.error('Todos los campos son requeridos')
            return false
        }

        const fdAddress = new FormData()
        fdAddress.append('calle', address.calle)
        fdAddress.append('altura', address.altura)
        fdAddress.append('barrio', address.barrio)
        fdAddress.append('pisoDpto', address.pisoDpto)
        fdAddress.append('encargadoDeRecibir', address.encargadoDeRecibir)
        fdAddress.append('contacto', address.contacto)
    }

    return (
        <div className="containerFormAdreess">
            <div className="formAdreess">
                <div className="formularioAddress">
                    <h2 className="tittleShipping">Datos de envio</h2>
                    <div className="inputDiv">
                        <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="calle" placeholder="Calle" onChange={readInput} />
                    </div>
                    <div className="inputDiv">
                        <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="altura" placeholder="Altura" onChange={readInput} />
                    </div>
                    <div className="inputDiv">
                        <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="barrio" placeholder="Barrio" onChange={readInput} />
                    </div>
                    <div className="inputDiv">
                        <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="pisoDpto" placeholder="Piso/Dpto" onChange={readInput} />
                    </div>
                    <div className="inputDiv">
                        <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="encargadoDeRecibir" placeholder="Quien lo recibe?" onChange={readInput} />
                    </div>
                    <div className="inputDiv">
                        <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="contacto" placeholder="Telefono" onChange={readInput} />
                    </div>
                    <div className="botonShippin">
                        <NavLink exact to='/cartList' className="enviar">Volver</NavLink>
                        <button className="enviar" onClick={Validate}>Guardar datos</button>
                        <NavLink exact to='/billingAddress' className="enviar">Siguiente</NavLink>
                    </div>
                    </div>


            </div>
        </div>
    )
}

export default ShippingAddress