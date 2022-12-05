import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { getOrder } from '../http/foodAPI'

const Order = observer(() => {

const {id} = useParams()

const [method, setMethod] = useState()
const [comment, setComment] = useState()
const [status, setStatus] = useState()

useEffect(() => {
    
    getOrder(id).then(data => {
        console.log(data.foods)
        console.log(data.order)
        setMethod(data.order.pay_method)
        setStatus(data.order.status)
        setComment(data.order.wishes)
    })
    
    
  },[])

    return (
        <Container className='pt-4'>
            <h1>Заказ {id}</h1>
            <div>Метод оплаты: {method}</div>
            <div>Статус заказа: {status}</div>
            <div>Комментарий к заказу: {comment || 'Без комментария'}</div>
        </Container>
    )
})

export default Order