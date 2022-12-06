import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Card, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getUserOrders } from '../http/foodAPI'
import { ORDER_ROUTE } from '../utils/consts'

const Orders = () => {

  const [orders, setOrders] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    console.log('EFFECT')
    getOrders()
    
  },[])

  const getOrders = async () => {
    const orders = await getUserOrders()
    setOrders(orders)
    console.log(orders)
  }

  return (
    <Container className='mt-4'>
      <h1 className='pb-4 mt-0'>Заказы</h1>
      {
        orders.map(order =>
          <Card className='p-3 mb-4' style={{cursor:'pointer'}} key={order.id} onClick={() => navigate(ORDER_ROUTE + '/' + order.id)}>
            <div className='d-flex'>
              <h5 className='m-0 p-0 ms-5' style={{width: 100}}># {order.id}</h5>
              <h5 className='m-0 p-0 ms-5' style={{width: 250}}>Статус: {order.status}</h5>
              <h5 className='m-0 p-0 ms-5' style={{width: 550}}>Доставка: {order.address}</h5>
              <h5 className='m-0 p-0 ms-5' style={{width: 200}}>Сумма: {order.sum} р</h5>
            </div>            
          </Card>
          
        )
      }
    </Container>
  )
}

export default Orders