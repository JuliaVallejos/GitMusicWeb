import React, { useState } from 'react'
import { Steps,Alert } from 'rsuite';
import {connect} from 'react-redux'
import ShippingAddress from './ShippingAddress'
import BillingAddress from './BillingAddress'
import Payment from './Payment'
import ListCart from './ListCart'
import '../styles/ListCard.css'
import '../styles/ShippingAddress.css'
import gif from '../assets/Graciasporsucompra.gif'
import gifCarrito from '../assets/cart.gif'
import shoppingCartActions from '../Redux/actions/shoppingCartActions'
import { NavLink } from 'react-router-dom';


const PaymentPanel = ({emailShopCart,loggedUser,userData,shoppingCart}) => {
    const [next,setNext] = useState(false)
    const [finish,setFinish] = useState(false)
    const [step, setStep] = useState(0);
    const onChange = nextStep => {
      setStep(nextStep < 0 ? 0 : nextStep > 5 ? 5 : nextStep);
    };

    const onNext = () => next? onChange(step + 1): Alert.warning('Complete los datos y guarde')
    const onPrevious = () => onChange(step - 1);

    const finishPurchase= async () =>{
      const data= await emailShopCart(loggedUser.email,{userData,shoppingCart})

           if(data.email){
           
                Alert.success('Compra confirmada,revise su casilla de email')
               setNext(true)
               onChange(step + 1)
           }else{
               Alert.error('Hubo un error, intente más tarde')
            
           }
  }

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
                    <ShippingAddress next={next} setNext={setNext}/>
                    <div className="buttonNav" style={{marginTop:'4vh'}}>
                      <button className="enviar navLink" onClick={onPrevious}>Volver</button>
                      <button onClick={onNext} className="enviar navLink ">Confirmar</button>
                    </div>
                  </div> 
              : step && step === 2 ?
                  <div className="stateTimeLine">
                    <BillingAddress next={next} setNext={setNext}/>
                    <div className="buttonNav" style={{marginTop:'4vh'}}>
                      <button className="enviar navLink" onClick={onPrevious}>Volver</button>
                      <button onClick={onNext} className="enviar navLink ">Confirmar</button>
                    </div>
                  </div>
                  :step && step === 3 ?
                  <div className="stateTimeLine" >
                    <Payment next={next} setNext={setNext} setFinish={setFinish} />
                    <div className="buttonNav" style={{marginTop:'4vh'}}>
                      <button className="enviar navLink" onClick={onPrevious}>Volver</button>
                      <button onClick={!finish?onNext:finishPurchase} className="enviar navLink ">{!finish? 'Confirmar':'Finalizar compra'}</button>
                    </div>
                  </div>
                :step && step === 4 ?
                  <div className="stateTimeLine" >
                    <img className="gif" src={gif} alt=""/>
                    <NavLink to="/" className="enviar navLink " style={{fontSize:'1.3vw',fontWeight:'bold'}}>Ver mas productos</NavLink>
                  </div>
                  : 
                  <div className="stateTimeLine">
                    {shoppingCart.length !== 0 ?
                    <div>
                    <ListCart setNext={setNext} />
                    <div className="buttonNav" style={{marginTop:'4vh'}}>
                    <NavLink to="/" className="enviar navLink " style={{fontSize:'1vw',fontWeight:'bold'}}>Salir</NavLink>
                      <button onClick={onNext} className="enviar navLink ">Confirmar</button>
                    </div>
                    </div>
                    : <div className="productNone">
                      <h2>Carrito vacío.</h2>
                      <img className="gif" src={gifCarrito} alt=""/>
                      <NavLink to="/" className="enviar navLink " style={{fontSize:'1.3vw',fontWeight:'bold'}}>Comenzar a Comprar</NavLink>
                    </div>  }

              </div>}
            </div>
        </div>
    </div>
    </>
  );
}
const mapStateToProps = state =>{
  return{
      loggedUser: state.userR.loggedUser,
      userData: state.userR.userData,
      shoppingCart:state.shoppingR.shoppingCart

  }
}
const mapDispatchToProps= {
      emailShopCart:shoppingCartActions.emailShopCart
}

export default connect(mapStateToProps,mapDispatchToProps)(PaymentPanel)