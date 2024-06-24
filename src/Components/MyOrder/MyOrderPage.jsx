import React from 'react'
import './MyOrderPage.css'
import Table from '../Common/Table'
import useData from '../../hooks/useData'
import Loading from '../Common/Loading'
const MyOrderPage = () => {
  const {data : orders, isLoading, errors} = useData('/order', null, ['myorders'], 1 * 60 * 1000)
  const getProductString = (order) => {
    const productString = order.products.map(p => `${p.product.title} (${p.quantity})`)
    return productString.join(", ")
  }
  return (
    <section className="align_center my_order_page">
      {isLoading && <Loading />}
      {errors && <em className='form_error'>{errors}</em>}
        {orders && <Table headings={["Orders", "Products", "Total", "Status"]}>
            <tbody>
              {orders.map((order, index) => 
              <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td>{getProductString(order)}</td>
                    <td>${order.total}</td>
                    <td>{order.status}</td>
              </tr>)}
            </tbody>
        </Table>}
    </section>
  )
}

export default MyOrderPage