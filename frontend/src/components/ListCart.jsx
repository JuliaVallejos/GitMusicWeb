import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import '../styles/ListCard.css'


const ListCart = ({shoppingCart})=> {
console.log(shoppingCart)
    return (
        <div className="containerCart">
            <div className="containerImgInfo">
                {shoppingCart.map(productoCart =>{
                    return (
                            <div className="containerProduct">
                                <div className="productImg" style={{backgroundImage: `url(${productoCart.product.arrayPic[0]})`}}></div>
                                    <div className="containerInfo">
                                        <h6>{productoCart.product.name}</h6>
                                        <div className="containerPriceButton">
                                        <button><h6>-</h6></button>
                                        <h6>{productoCart.quantity}</h6>
                                        <button><h6>+</h6></button>
                                        <h6><h6>x</h6></h6>
                                        <h6>{productoCart.product.price}</h6>
                                        <h6>=</h6>
                                        <h6>{productoCart.product.price}</h6>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
        </div>
        <div className="buttonNav">
        <button className="enviar"><NavLink className="navLink" exact to='/' >Salir</NavLink></button>
        <button className="enviar"><NavLink className="navLink" exact to='/shippingAddress' >Confirmar compra</NavLink></button>
        </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        shoppingCart:state.shoppingR.shoppingCart
    }
}

export default connect (mapStateToProps,null) (ListCart)