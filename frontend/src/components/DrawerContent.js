import '../styles/DrawerContent.css'
import {  FaTrashAlt} from 'react-icons/fa'
import {  FaMinus, FaPlus} from 'react-icons/fa'
import { connect } from 'react-redux'
import {Alert,Input} from 'rsuite'
import shoppingCartActions from '../Redux/actions/shoppingCartActions'

const DrawerContent = ({shoppingCart,editProductCart,deleteProductCart}) => {
    const deleteProduct = id => {
        const filterProduct = shoppingCart.filter(product => product.idProduct !== id)
        deleteProductCart(id)
    }
    const manageQuantityForStock=(operation,product)=>{
        const inputProduct=document.querySelector(`#input${product.idProduct}`)
        if(operation==='subtract'){
            if((parseInt(inputProduct.value)-1)<1){
                Alert.warning("Debes tener almenos 1.",3000)
            }else{
                inputProduct.value=parseInt(inputProduct.value)-1
                editProductCart(parseInt(inputProduct.value),product)
            }
        }else if(operation==='add'){
            if((parseInt(inputProduct.value)+1)>product.product.stock){
            Alert.warning(`No podes exceder el stock(${product.product.stock}) del articulo.`,3000)
            }else{
                inputProduct.value=parseInt(inputProduct.value)+1
                editProductCart(parseInt(inputProduct.value),product)
            }
        }
    }
    const inputModifyQuantity=(value,e,product)=>{
        if((e.nativeEvent.data===null)){ 
            Alert.error(`No podes dejar vacio este campo.`,3000)
            e.target.value=product.quantity
        }else if(!(e.nativeEvent.data.charAt() > 48 || e.nativeEvent.data.charAt() < 57)){
            Alert.error(`Este campo es solo numerico.`,3000)
            e.target.value=product.quantity
        }else if(value>product.product.stock){
            Alert.warning(`No podes exceder el stock(${product.product.stock}) del articulo.`,3000)
            e.target.value=product.quantity
        }else if(value<1){
            Alert.error("Selecciona un numero distinto a 0 ó numeros negativos.",3000)
            e.target.value=product.quantity
        }else{
            editProductCart(parseInt(value),product)
        }
    }
    return (
        <>
            {shoppingCart.length !== 0 ? shoppingCart.map(product => 
                <div className="drawerProductContainer" >
                    <div className="descriptionProduct">
                        <p className="textProduct"><strong>Producto:</strong> {product.product.name}</p>
                        <p className="textProduct"><strong>Marca:</strong> {product.product.mark}</p>
                        <p className="textProduct"><strong>Precio:</strong> <span className="totalPrice">${product.product.price}</span></p>
                        <div className="manageProduct">
                            <div className="manageQuantityProduct">
                                <FaMinus onClick={(e) =>manageQuantityForStock("subtract",product)} className="bottonManage arrow minus"/>
                                <span><Input id={`input${product.idProduct}`} class="quantityValue" onChange={(value,e)=>inputModifyQuantity(value,e,product)} defaultValue={product.quantity}/></span>
                                <FaPlus onClick={(e) =>manageQuantityForStock("add",product)} className="bottonManage arrow plus"/>
                            </div>
                            <FaTrashAlt onClick={() => deleteProduct(product.idProduct)} className="bottonManage delete"/>
                        </div>
                    </div>
                    <div className="drawerProductImg" style={{backgroundImage: `url(${product.product.arrayPic[0]})`}}></div>
                </div>
            ) :(
                <h4>Aún no tenés productos en el carrito</h4>
            )
            }
       </> 
    )
}
const mapStateToProps = state =>{
    return{
        shoppingCart:state.shoppingR.shoppingCart,
        allProducts: state.product.allProducts,
        loggedUser: state.userR.loggedUser
    }
}
const mapDispatchToProps={
    editProductCart:shoppingCartActions.editProductCart,
    deleteProductCart:shoppingCartActions.deleteProductCart
}
export default connect(mapStateToProps,mapDispatchToProps)(DrawerContent)

//<FaRegWindowClose onClick={() => deleteProduct(product.idProduct)} className="removeDrawerProduct" />