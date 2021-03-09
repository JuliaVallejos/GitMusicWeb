import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Steps,Panel,Timeline,Icon } from 'rsuite';
import ShippingAddress from './ShippingAddress'
import BillingAddress from './BillingAddress'
import Payment from './Payment'
import CartList from './ListCart'
import '../styles/ListCard.css'
import '../styles/ShippingAddress.css'


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
          <Timeline className="custom-timeline">
               {step && step === 1 ?
                  <Timeline.Item className="stateTimeLine" >
                     <ShippingAddress/>
                     <div className="buttonNav" style={{marginTop:'4vh'}}>
                      <button className="enviar navLink" onClick={onPrevious}>Volver</button>
                      <button onClick={onNext} className="enviar navLink ">Confirmar</button>
                    </div>
                  </Timeline.Item> 
               : step && step === 2 ?
                  <Timeline.Item className="stateTimeLine">
                     <BillingAddress/>
                     <div className="buttonNav" style={{marginTop:'4vh'}}>
                      <button className="enviar navLink" onClick={onPrevious}>Volver</button>
                      <button onClick={onNext} className="enviar navLink ">Confirmar</button>
                    </div>
                  </Timeline.Item>
                  :step && step === 3 ?
                  <Timeline.Item className="stateTimeLine" >
                     <Payment/>
                     <div className="buttonNav" style={{marginTop:'4vh'}}>
                      <button className="enviar navLink" onClick={onPrevious}>Volver</button>
                      <button onClick={onNext} className="enviar navLink ">Confirmar</button>
                    </div>
                  </Timeline.Item>
                :step && step === 4 ?
                  <Timeline.Item className="stateTimeLine" >
                     <h4>listo</h4>
                  </Timeline.Item>
                  : 
                  <Timeline.Item className="stateTimeLine">
                  <CartList/>
                  <div className="buttonNav" style={{marginTop:'4vh'}}>
                    <button className="enviar navLink">Salir</button>
                    <button onClick={onNext} className="enviar navLink ">Confirmar</button>
                  </div>
               </Timeline.Item>}
            </Timeline>
        </div>
    </div>
    </>
  );
}

export default PaymentPanel