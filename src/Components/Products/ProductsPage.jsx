import React from 'react'
import './ProductsPage.css'
import SidePage from './SidePage'
import ProductList from './ProductList'
const ProductsPage = () => {
  return (
    <section className="product_page">
      <SidePage />
      <section className="product_list_section">
          <ProductList />
      </section>
    </section>
  )
}

export default ProductsPage