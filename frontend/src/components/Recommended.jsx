import React from 'react'
import Card from './Card'
import '../styles/Card.css'

const Recommended = () => {
  const products = [{ pic: 'https://cdn.shopify.com/s/files/1/0268/0972/9087/products/99c178bc-031e-4d9e-9370-0e4e902ac8e2_480x.jpg?v=1613611243', name: 'Arturia keyLab 61', price: '30000' }, { pic: 'https://cdn.shopify.com/s/files/1/0268/0972/9087/products/99c178bc-031e-4d9e-9370-0e4e902ac8e2_480x.jpg?v=1613611243', name: 'Arturia keyLab 61', price: '30000' }, { pic: 'https://cdn.shopify.com/s/files/1/0268/0972/9087/products/99c178bc-031e-4d9e-9370-0e4e902ac8e2_480x.jpg?v=1613611243', name: 'Arturia keyLab 61', price: '30000' }, { pic: 'https://cdn.shopify.com/s/files/1/0268/0972/9087/products/99c178bc-031e-4d9e-9370-0e4e902ac8e2_480x.jpg?v=1613611243', name: 'Arturia keyLab 61', price: '30000' }, { pic: 'https://cdn.shopify.com/s/files/1/0268/0972/9087/products/99c178bc-031e-4d9e-9370-0e4e902ac8e2_480x.jpg?v=1613611243', name: 'Arturia keyLab 61', price: '30000' }, { pic: 'https://cdn.shopify.com/s/files/1/0268/0972/9087/products/99c178bc-031e-4d9e-9370-0e4e902ac8e2_480x.jpg?v=1613611243', name: 'Arturia keyLab 61', price: '30000' }]

  return (
    <div className='productSection'>
      <h2>Productos en Oferta!</h2>
      <h4>Aprovecha nuestros productos recomendados!</h4>
      <div className='cardContainer'>
        {products.map((product,i) => {
          return (
            <Card key={i} product={product} />
          )
        })}
      </div>
    </div>
  )
}

export default Recommended
