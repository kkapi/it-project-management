import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Card, Container, Image } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { getOrder } from '../http/foodAPI'

const Order = observer(() => {

const {id} = useParams()

const [method, setMethod] = useState()
const [comment, setComment] = useState()
const [status, setStatus] = useState()
const [date, setDate] = useState()
const [price, setPrice] = useState()
const [foods, setFoods] = useState([])
const [name, setName] = useState()
const [phone, setPhone] = useState()
const [address, setAddress] = useState()

useEffect(() => {
    
   getOneOrder()

  },[])

    const getOneOrder = async () => {
        const data = await getOrder(id)
        console.log(data)
        setMethod(data.order.pay_method)
        setStatus(data.order.status)
        setComment(data.order.wishes)        
        const dateTest = new Date(data.order.createdAt.replace(' ', 'T'))
        console.log()
        setDate(dateTest.toLocaleString())
        setFoods(data.foods)
        setPrice(data.price)

        setName(data.order.name)
        setPhone(data.order.phone)
        setAddress(data.order.address)
    }

    return (
        <Container className='pt-4'>
            <h1>Заказ #{id}</h1>
            <div className='d-flex'>
                <Card className='p-3 my-4' style={{width: 500}}>
                    <div>Метод оплаты: {method}</div>
                    <div>Статус заказа: {status}</div>
                    <div>Комментарий к заказу: {comment || 'Без комментария'}</div>
                    <div>Дата и время: {date}</div>
                </Card>
                <Card className='p-3 my-4 ms-4' style={{width: 500}}>
                    <div>ФИО: {name}</div>
                    <div>Телефон: {phone}</div>
                    <div>Адрес доставки: {address}</div>
                </Card>
            </div>            
            
            <h2 className='pb-2'>Состав</h2>
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
                <h2 className='pb-4 pt-2'>Сумма: {price} руб</h2>
            </div>
        </Container>
    )
})

export default Order