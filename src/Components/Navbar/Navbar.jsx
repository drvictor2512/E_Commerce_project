import React, { useContext, useState, useEffect } from 'react'
import './Navbar.css'
import star from '../../assets/glowing-star.png'
import id_button from '../../assets/id-button.png'
import rocket from '../../assets/rocket.png'
import memo from '../../assets/memo.png'
import order from '../../assets/package.png'
import lock from '../../assets/locked.png'
import Linkswithicon from './Linkswithicon'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import UserContext from '../../contexts/UserContext'
import CartContext from '../../contexts/CartContext'
import { getsuggestionsAPI } from '../../services/productServices'
const Navbar = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);
  const user = useContext(UserContext);
  const {cart} = useContext(CartContext);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if(search.trim() !== ""){
      navigate(`/products?search=${search.trim()}`);
    }
    setSuggestions([]);
  }
  useEffect(() => {
    const delaySuggestion = setTimeout(() => {
      if(search.trim() !== ""){
        getsuggestionsAPI(search).then(res => setSuggestions(res.data)).catch(err => console.log(err))
      }else{
        setSuggestions([]);
      }
    }, 300)
    return () => clearTimeout(delaySuggestion);
}, [search])
  const handleKeyDown = (e) => {
    if(selectedItem < suggestions.length){
      if(e.key === "ArrowDown"){
        setSelectedItem(prev => prev === suggestions.length - 1 ? 0 :  prev + 1);
      }
      else if(e.key === "ArrowUp"){
        setSelectedItem(prev => prev === 0 ? suggestions.length - 1 : prev - 1);
      }
      else if(e.key === "Enter"){
        const suggestion = setSearch(suggestions[selectedItem].title);
        navigate(`/products?search=${suggestion.title}`);
        setSearch("");
        setSuggestions([]);
      }
    }else{
      setSelectedItem(-1);
    }
  }
  return (
    <nav className='navbar align_center'>
        <div className='align_center'>
            <h1 className="navbar_heading">Tech-Shopping</h1>
            <form className='navbar_form align_center' onSubmit={handleSubmit}>
                <input type="text"  className='navbar_search' placeholder='Search products' value={search} onChange={e => setSearch(e.target.value)} onKeyDown={handleKeyDown}/>
                <button type='submit' className='search_button'>Search</button>
                {suggestions.length > 0 && <ul className="search_result">
                  {suggestions.map((suggestion, index) => (
                    <li className={selectedItem === index ? "search_suggestion_link active" : "search_suggestion_link"} key={suggestion._id}>
                      <Link to={`/products?search=${suggestion.title}`} onClick={() => {
                        setSearch(suggestion.title);
                        setSuggestions([]);
                      
                      }}>{suggestion.title}</Link>
                  </li>))}
                  
                </ul>}
            </form>
        </div>
        <div className='navbar_links align_center'>
           <Linkswithicon title="Home" link="/" emoji={rocket}/>
           <Linkswithicon title="Products" link="/products" emoji={star}/>
          {!user && <><Linkswithicon title="Login" link="/login" emoji={id_button}/>
           <Linkswithicon title="Signup" link="/signup" emoji={memo}/> </>}
           {user && <><Linkswithicon title="My orders" link="/myorders" emoji={order}/>
           <Linkswithicon title="Logout" link="/logout" emoji={lock}/>
           <NavLink to="/cart" className='align_center'>
                Cart <p className='align_center cart_counts'>{cart.length}</p>
           </NavLink> </>}
        </div>
    </nav>
  )
}

export default Navbar