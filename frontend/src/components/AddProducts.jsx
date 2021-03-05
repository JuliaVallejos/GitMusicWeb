import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import GoogleLogin from 'react-google-login'
import { FaEye } from "react-icons/fa";
import { Link, NavLink} from 'react-router-dom'
import { Alert, Message } from 'rsuite';
import userActions from '../Redux/actions/userActions'
import '../styles/addProducts.css'


const AddProducts = (props) => {

    const { history, signIn, loggedUser,categories } = props
    const[lines,setLines]= useState(1)
    const [arrayDescription,setArrayDescription] = useState(['one'])
    const [product, setProduct] = useState({
        name:'',
        mark:'',
        price:'',
        warranty:'',
        stock:'',
        category:'',
        outstanding:'',
        arrayDescription:[]

    })
    const [errores, setErrores] = useState('')




    const readInput = e => {
        const value = e.target.value
        const property = e.target.name
        setProduct({
            ...product,
            [property]: value
        })
    }
   
    const Validate = async e => {
        alert('Mandar')
       /*  setErrores('')
        if (!user.email || !user.password) {
            setErrores('Todos los campos son requeridos')
        } else {
            const response = await signIn(user)
            if (response && !response.success) {
                setErrores(response.message)
        }

        } */
    }
 

    return (
        <div className="containerAddProducts">
            <div className="formulario">
                <h2>Cargue sus productos</h2>

                {errores !== '' && <Message type='info' description={errores} style={{ marginBottom: '2vh' }} />}
                <div className="inputDiv">
                    <input type="text" name="name" placeholder="Nombre del producto" onChange={readInput} />
                </div>
                <div className="inputDiv">
                    <input type="text" name="mark" placeholder="Marca" onChange={readInput} />
                </div>
                <div className="inputDiv">
                    <input type="number" name="price" placeholder="Precio" onChange={readInput} />
                </div>
                <div className="inputDiv">
                    <input type="number" name="warranty" placeholder="Garantía(cantidad de meses)" onChange={readInput} />
                </div>
                <div className="inputDiv">
                    <input type="number" name="stock" placeholder="Cantidad en stock" onChange={readInput} />
                </div>
               <select label='category' name='category'>
                <option value='' name='category' selected disabled='true'>Selecciona categoría</option>
                   {categories.map(category =>{
                      
                       return( 
                           <option value={category.category} name='category'>{category.category}</option>
                       )
                   })}
               </select>
               <label className='outstanding' name='outstanding'>¿Es producto destacado?
                   <div className='radios'>
                       <div className="inputRadio"><input name='outstanding' type='radio' value={true}/>Si</div>
                        <div className="inputRadio"><input name='outstanding' type='radio' value={false}/>No</div>
                   </div>
                
                    
                </label>
                <div className="inputDiv">
                {Array({lines}).fill(1).map(() =>
            arrayDescription.map(item =>{
                return (
                    <input type="text" name="description" placeholder="Descripción(una oración por línea)" onChange={readInput} />
                )
            })
              
            )}
                  
                    <button onClick={()=>setLines(lines+1)}>+</button>
                </div>
            
                <button className="enviar" onClick={Validate}>Aceptar</button>
                
                

            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        loggedUser: state.userR.loggedUser,
        categories:state.product.categories
    }
}
const mapDispatchToProps = {
    signIn: userActions.logIn
}
export default connect(mapStateToProps,mapDispatchToProps)(AddProducts)

