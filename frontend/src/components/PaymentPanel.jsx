import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Steps,Panel,Timeline,Icon } from 'rsuite';
import ShippingAddress from './ShippingAddress'
import BillingAddress from './BillingAddress'
import Payment from './Payment'
import CartList from './ListCart'
import '../styles/ListCard.css'
import '../styles/ShippingAddress.css'
import gif from '../assets/Graciasporsucompra.gif'


const PaymentPanel = () => {

    const [step, setStep] = useState(0);
    const onChange = nextStep => {
      setStep(nextStep < 0 ? 0 : nextStep > 5 ? 5 : nextStep);
    };

    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);

   return (
       <>
    <div className="containerCartAndPagination">
        <Steps className="steps" current={step}>
            <Steps.Item />
            <Steps.Item />
            <Steps.Item />
            <Steps.Item />
            <Steps.Item />
        </Steps>
        <div>
          <div className="custom-timeline">
              {step && step === 1 ?
                <div className="stateTimeLine" >
                    <ShippingAddress/>
                    <div className="buttonNav" style={{marginTop:'4vh'}}>
                      <button className="enviar navLink" onClick={onPrevious}>Volver</button>
                      <button onClick={onNext} className="enviar navLink ">Confirmar</button>
                    </div>
                  </div> 
              : step && step === 2 ?
                  <div className="stateTimeLine">
                    <BillingAddress/>
                    <div className="buttonNav" style={{marginTop:'4vh'}}>
                      <button className="enviar navLink" onClick={onPrevious}>Volver</button>
                      <button onClick={onNext} className="enviar navLink ">Confirmar</button>
                    </div>
                  </div>
                  :step && step === 3 ?
                  <div className="stateTimeLine" >
                    <Payment/>
                    <div className="buttonNav" style={{marginTop:'4vh'}}>
                      <button className="enviar navLink" onClick={onPrevious}>Volver</button>
                      <button onClick={onNext} className="enviar navLink ">Confirmar</button>
                    </div>
                  </div>
                :step && step === 4 ?
                  <div className="stateTimeLine" >
                    <img className="gif" src={gif} alt=""/>
                    <NavLink to="/" className="enviar navLink ">Inicio</NavLink>
                  </div>
                  : 
                  <div className="stateTimeLine">
                  <CartList/>
                  <div className="buttonNav" style={{marginTop:'4vh'}}>
                    <button className="enviar navLink">Salir</button>
                    <button onClick={onNext} className="enviar navLink ">Confirmar</button>
                  </div>
              </div>}
            </div>
        </div>
    </div>
    </>
  );
}

export default PaymentPanel