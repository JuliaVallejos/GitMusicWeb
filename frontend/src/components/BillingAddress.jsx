import React, { useState } from 'react'
import {  Alert } from 'rsuite';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import userActions from '../Redux/actions/userActions'
import '../styles/ShippingAddress.css'


const BillingAddress = (props) => {
    const [next,setNext] = useState(false)
    const [billingAddress, setBillingAddress] = useState({
        nombre:'',
        tipoFactura:'',
        cuitCuilDni:'',
        contacto:''
    })

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

     if (billingAddress.nombre === '' || billingAddress.cuitCuilDni === '' ||  billingAddress.tipoFactura === '' ||billingAddress.contacto === '') {
             Alert.error('Todos los campos son requeridos')
            return false
         }
        const data = await props.completeUserData("billingAdress",billingAddress)
       console.log(data)
       if(data.saved){
        Alert.success('Datos guardados')
        setNext(true)
       }
        
    }

    return (
        <div className="containerFormAdreess">
            <div className="formAdreess">
            
                <div className="formularioAddress">
                    <h2 className="tittle">Datos de facturacion</h2>
                    <div className="inputDiv">
                        <input onKeyPress={enterKeyboard} value={billingAddress.nombre} type="text" autoComplete="nope" name="nombre" placeholder="Nombre/Apellido" onChange={readInput} />
                    </div>
                    <div className="inputDiv">
                        <input onKeyPress={enterKeyboard} value={billingAddress.cuitCuilDni} type="number" autoComplete="nope" name="cuitCuilDni" placeholder="CUIT/CUIL/DNI" onChange={readInput} />
                    </div>
                    <div className="inputDiv">
                        <input onKeyPress={enterKeyboard} value={billingAddress.contacto} type="number" autoComplete="nope" name="contacto" placeholder="Telefono" onChange={readInput} />
                    </div>
                    <div className="inputDiv">
                        <select name="tipoFactura" onChange={readInput} onKeyPress={enterKeyboard}>
                            <option value='' selected disabled >Tipo de factura</option>
                            <option value='facturaA'>Factura A</option>
                            <option value="facturaB">Factura B</option>
                        </select>
                    </div>
                    <div className="botonShippin">
                        <Link to='/shippingAddress' className="enviar">
                            Volver
                        </Link>
                        <button className="enviar" onClick={Validate}>Guardar Datos</button>
                        <Link  onClick={()=>!next&&Alert.error('Complete los datos y guarde')} to={next&&'/payment'} className="enviar">
                            Siguiente
                        </Link>
                    </div>
                </div>



            </div>
        </div>
    )
}
const mapDispatchToProps={
    completeUserData:userActions.completeUserData
}
export default connect(null,mapDispatchToProps)(BillingAddress)
