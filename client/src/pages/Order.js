import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Container, Image } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { getOrder } from '../http/foodAPI'

const Order = observer(() => {

const {id} = useParams()

const [method, setMethod] = useState()
const [comment, setComment] = useState()
const [status, setStatus] = useState()
const [date, setDate] = useState()
const [foods, setFoods] = useState([])

useEffect(() => {
    
   getOneOrder()

  },[])

    const getOneOrder = async () => {
        const data = await getOrder(id)
        setMethod(data.order.pay_method)
        setStatus(data.order.status)
        setComment(data.order.wishes)
        setDate(data.order.createdAt)
        console.log(data)
        setFoods(data.foods)
    }

    return (
        <Container className='pt-4'>
            <h1>Заказ {id}</h1>
            <div>Метод оплаты: {method}</div>
            <div>Статус заказа: {status}</div>
            <div>Комментарий к заказу: {comment || 'Без комментария'}</div>
            <div>Дата и время: {date}</div>
            <div>
                {
                    foods.map(food =>
                        <div key={food.id}>
                            <div className="d-flex align-items-center pt-2 pb-2">
                                <div style={{width: 90}}>
                                <Image width={70} height={70} src={process.env.REACT_APP_API_URL + food.food.img} className="rounded"/>
                                </div>
                                <h5 style={{width: 160}} className='ms-5'>{food.food.name}</h5>
                                <h5 className='ms-5' style={{width: 110}}>
                                
                                <div>{food.amount} шт</div>
                                     
                                </h5> 
                                <h5 style={{width: 120}} className='ms-5'>{food.food.price} руб</h5>
                                           
                                           
                            </div>
                            <hr/>
                        </div>   
                    )
                }
                <h2>Сумма: </h2>
            </div>
        </Container>
    )
})

export default Order