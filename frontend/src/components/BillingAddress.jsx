import React, { useState, useEffect } from 'react'
import { Steps, Alert } from 'rsuite';
import { NavLink, Link } from 'react-router-dom'
import '../styles/ShippingAddress.css'


const BillingAddress = () => {
    const [billingAddress, setBillingAddress] = useState([])

    const readInput = e => {
        var value = e.target.value
        const property = e.target.name
        setBillingAddress({
            ...billingAddress,
            [property]: value
        })
    }

    const enterKeyboard = e => {
        if (e.charCode === 13) {
            Validate(e)
        }
    }

    const Validate = async () => {

        // if (billingAddress.nombre === '' || billingAddress.cuitCuilDni === '' || billingAddress.contacto === '') {
        //     Alert.error('Todos los campos son requeridos')
        //     return false
        // }

        const billingAddress = new FormData()
        billingAddress.append('nombre', billingAddress.nombre)
        billingAddress.append('cuitCuilDni', billingAddress.cuitCuilDni)
        billingAddress.append('bills', billingAddress.bills)
        billingAddress.append('contacto', billingAddress.contacto)
    }

    return (
        <div className="containerFormAdreess">
            <div className="formAdreess">
            
                <div className="formularioAddress">
                    <h2 className="tittle">Datos de facturacion</h2>
                    <div className="inputDiv">
                        <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="nombre" placeholder="Nombre/Apellido" onChange={readInput} />
                    </div>
                    <div className="inputDiv">
                        <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="cuitCuilDni" placeholder="CUIT/CUIL/DNI" onChange={readInput} />
                    </div>
                    <div className="inputDiv">
                        <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="contacto" placeholder="Telefono" onChange={readInput} />
                    </div>
                    <div className="inputDiv">
                        <select name="bills" onChange={readInput} onKeyPress={enterKeyboard}>
                            <option selected disabled >Tipo de factura</option>
                            <option  name="facturaA">Factura A</option>
                            <option name="facturaB">Factura B</option>
                        </select>
                    </div>
                    <div className="botonShippin">
                        <NavLink exact to='/shippingAddress' className="enviar">
                            Volver
                        </NavLink>
                        <button className="enviar" onClick={Validate}>Guardar Datos</button>
                        <NavLink exact to='/payment' className="enviar" onClick={Validate}>
                            Siguiente
                        </NavLink>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default BillingAddress