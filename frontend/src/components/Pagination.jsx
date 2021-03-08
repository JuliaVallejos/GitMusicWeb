import React, { useState, useEffect } from 'react'
import '../styles/ListCard.css'

const Pagination =({postPerPage,totalPost, paginate})=> {

    const pageNumbers = [];

    for(let i = 1 ;i <= Math.ceil(totalPost / postPerPage); i++){
        pageNumbers.push(i);
    }

    return(
        <nav className="navPagination">
            <ul className="pagination">
                {pageNumbers.map (number => {
                    return(
                        <li key={number} >
                        <a onClick={()=> paginate(number)} href='#' className='enviarPagination'>{number}</a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )

}

export default Pagination