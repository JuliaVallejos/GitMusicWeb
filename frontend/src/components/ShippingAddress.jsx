import React, { useState,useEffect} from 'react'
import {Alert } from 'rsuite';
import {connect} from 'react-redux'
import '../styles/ShippingAddress.css'
import userActions from '../Redux/actions/userActions'


const ShippingAddress = ({setNext,completeUserData,userData}) => {
    const addressRedux= userData.find(data => data.property==='address').newData
    
    
    const [address, setaddress] = useState(addressRedux)
    useEffect(() => {
        setNext(false)
    }, [])

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
       const data = await completeUserData("address",address)
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
                        <input onKeyPress={enterKeyboard} type="text" value={address.calle} autoComplete="nope" name="calle" placeholder="Calle*" onChange={readInput} />
                    </div>
                    <div className="inputDiv">
                        <input onKeyPress={enterKeyboard} type="text" value={address.altura} autoComplete="nope" name="altura" placeholder="Altura*" onChange={readInput} />
                    </div>
                    <div className="inputDiv">
                        <input onKeyPress={enterKeyboard} type="text" value={address.barrio} autoComplete="nope" name="barrio" placeholder="Barrio" onChange={readInput} />
                    </div>
                    <div className="inputDiv">
                        <input onKeyPress={enterKeyboard} type="text" value={address.pisoDpto} autoComplete="nope" name="pisoDpto" placeholder="Piso/Dpto" onChange={readInput} />
                    </div>
                    <div className="inputDiv">
                        <input onKeyPress={enterKeyboard} type="text" value={address.encargadoDeRecibir} autoComplete="nope" name="encargadoDeRecibir" placeholder="¿Quien lo recibe?*" onChange={readInput} />
                    </div>
                    <div className="inputDiv">
                        <input onKeyPress={enterKeyboard} type="text" value={address.contactoReceptor} autoComplete="nope" name="contactoReceptor" placeholder="Teléfono de quien recibe*" onChange={readInput} />
                    </div>
                    <div className="botonShippin">
                        <button className="enviar" onClick={Validate}>Guardar datos</button>
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
    completeUserData:userActions.completeUserData
}
export default connect(mapStateToProps,mapDispatchToProps)(ShippingAddress)