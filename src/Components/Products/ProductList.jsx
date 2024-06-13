import React, {useEffect, useState } from 'react'
import './ProductList.css'
import ProductCard from './ProductCard'
import ProductLoading from './ProductLoading'
import { useSearchParams } from 'react-router-dom'
import Pagination from '../Common/Pagination'
import useData from '../../hooks/useData'
const ProductList = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [sortedProducts, setsortedProducts] = useState([]);
  const [search, setSearch] = useSearchParams();
  const category = search.get("category");
  const searchQuery = search.get("search");
  const n = [1, 2, 3, 4, 5, 6, 7, 8];
  const {data, error, isLoading} =  useData("/products", {
    params: {
      category,
      perPage : 10,
      page,
      search : searchQuery,
    }
  }, [searchQuery, category, page]);
  const handlePageChange = (page) => {
    const currentParams = Object.fromEntries([...search])

    setSearch({...currentParams, page : parseInt(currentParams.page) + 1});
  };
  useEffect(() => {
    const handleScroll = () => {
      const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
      if(scrollTop + clientHeight >= scrollHeight - 1 && !isLoading && data && page < data.totalPages){
        setPage(prev => prev + 1);

      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data, isLoading])
  useEffect(() => {
    setPage(1);
  }, [searchQuery,category])
  useEffect(() => {
      if(data && data.products){
        const products = [...data.products];
        if(sortBy === "price desc"){
          setsortedProducts(products.sort((a, b) => b.price - a.price));
        }else if(sortBy === "price asc"){
          setsortedProducts(products.sort((a, b) => a.price - b.price));
        } else if(sortBy === "rating"){
          setsortedProducts(products.sort((a, b) => b.reviews.rate - a.reviews.rate));
        }else{
          setsortedProducts(products);
        }
      }
  }, [sortBy, data])
  return (
    <section className="product_list_section">
        <header className="align_center products_list_header">
            <h2>Products</h2>
            <select name="sort" id="" className='products_sorting' onChange={e => setSortBy(e.target.value)}>
                <option value="">Relevance</option>
                <option value="price desc">Price High to Low</option>
                <option value="price asc">Price Low to High</option>
                <option value="rating">Rating</option>
            </select>
        </header>
        <div className="product_list">
          {error && <em className='form_error'>{error}</em>}
           {
            data?.products &&sortedProducts.map(product => <ProductCard key={product._id} product={product}/>)
           }
          {isLoading && n.map((i) => <ProductLoading key={i}/>)}
        </div>
        {/* {data && <Pagination totalPosts={data.totalProducts} Postsperpage={8} onclick={handlePageChange} currentpage={page}/>} */}
        
    </section>
  )
}

export default ProductList