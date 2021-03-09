import React, { useState } from 'react'
import {  Alert } from 'rsuite';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import '../styles/ShippingAddress.css'
import userActions from '../Redux/actions/userActions'


const ShippingAddress = (props) => {

    const [next,setNext] = useState(false)
    const [address, setaddress] = useState({
        calle:'',
        altura:'',
        barrio:'',
        pisoDpto:'',
        encargadoDeRecibir:'',
        contactoReceptor:''
    })

    const readInput = e => {
        var value = e.target.value
        const property = e.target.name
        setaddress({
            ...address,
            [property]: value
        })
    }

    const enterKeyboard = e => {
        if (e.charCode === 13) {
            Validate(e)
        }
    }

    const Validate = async () => {

        if (address.calle === '' || address.altura === ''  || address.encargadoDeRecibir===''|| address.contactoReceptor === '') {
            Alert.error('Complete los campos requeridos(*)')
            return false
        }
       const data = await props.completeUserData("adress",address)
       console.log(data)
       if(data.saved){
           Alert.success('Datos guardados')
           setNext(true)
       }

    }

    return (
        <div>
            <div className="formAdreess">
                <div className="formularioAddress">
                    <h2 className="tittleShipping">Datos de envio</h2>
                    <div className="inputDiv">
                        <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="calle" placeholder="Calle*" onChange={readInput} />
                    </div>
                    <div className="inputDiv">
                        <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="altura" placeholder="Altura*" onChange={readInput} />
                    </div>
                    <div className="inputDiv">
                        <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="barrio" placeholder="Barrio" onChange={readInput} />
                    </div>
                    <div className="inputDiv">
                        <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="pisoDpto" placeholder="Piso/Dpto" onChange={readInput} />
                    </div>
                    <div className="inputDiv">
                        <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="encargadoDeRecibir" placeholder="¿Quien lo recibe?*" onChange={readInput} />
                    </div>
                    <div className="inputDiv">
                        <input onKeyPress={enterKeyboard} type="text" autoComplete="nope" name="contactoReceptor" placeholder="Teléfono de quien recibe*" onChange={readInput} />
                    </div>
                    <div className="botonShippin">
                        <button className="enviar" onClick={Validate}>Guardar datos</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapDispatchToProps={
    completeUserData:userActions.completeUserData
}
export default connect(null,mapDispatchToProps)(ShippingAddress)