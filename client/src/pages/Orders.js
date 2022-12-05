import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
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
      <h1 className='mb-2 mt-0'>Заказы</h1>
      {
        orders.map(order => 
          <h1 style={{cursor:'pointer'}} key={order.id} onClick={() => navigate(ORDER_ROUTE + '/' + order.id)}>{order.id}</h1>
        )
      }
    </Container>
  )
}

export default Orders