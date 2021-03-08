import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Pagination from "./Pagination"
import ListCart from "./ListCart"
import { connect } from 'react-redux';
import '../styles/ListCard.css'

const ListCartAndPaginate = ({shoppingCart})=> {

const [currentPage, setCurrentPage] = useState(1)
const [postPerPage] = useState(3)

const indexOfLastPost = currentPage * postPerPage;
const indexOfFirstPost = indexOfLastPost - postPerPage;
const currentPost = shoppingCart.slice(indexOfFirstPost, indexOfLastPost);
const paginate = pageNumber => setCurrentPage(pageNumber)

    return(
        <div className="containerCartAndPagination">
            {shoppingCart.length ==! 0 ? 
            <div className="CartAndPagination">
                <ListCart currentPost={currentPost}/>
                <div className="buttonNav">
                    <button className="enviar"><NavLink className="navLink" exact to='/' >Salir</NavLink></button>
                    <Pagination postPerPage={postPerPage} totalPost={shoppingCart.length} paginate={paginate}/>
                    <button className="enviar"><NavLink className="navLink" exact to='/shippingAddress' >Confirmar</NavLink></button>
                </div>
            </div>
            : (
                <div>
                <div className="ProductNone"><h4>Aún no tenés productos en el carrito</h4></div>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        shoppingCart:state.shoppingR.shoppingCart
    }
}

export default connect (mapStateToProps,null) (ListCartAndPaginate)