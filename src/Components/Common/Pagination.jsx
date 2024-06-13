import React from 'react'
import './Pagination.css'
const Pagination = ({totalPosts, Postsperpage, onclick, currentpage}) => {
    let pages = [];
    for(let i = 1; i <= Math.ceil(totalPosts / Postsperpage); i++){
        pages.push(i);
    }
  return (
    <>
    {pages.length > 1 && <ul className='pagination'>
        {pages.map(page => (<li key={page}><button className={parseInt(currentpage) === page ? 'pagination_button_active' : "pagination_button"} onClick={() => onclick(page)}>{page}</button></li>))}
    </ul>}
    </>
  )
}

export default Pagination