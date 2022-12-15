import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Container, Dropdown, Image } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { getOrder, repeatOrder, setNewStatus } from '../http/foodAPI'
import { Context } from "..";
import { NEW_ORDER_ROUTE } from '../utils/consts'

const Order = observer(() => {

const {id} = useParams()

const {user} = useContext(Context)

const navigate = useNavigate()

const [method, setMethod] = useState()
const [comment, setComment] = useState()
const [status, setStatus] = useState()
const [date, setDate] = useState()
const [price, setPrice] = useState()
const [foods, setFoods] = useState([])
const [name, setName] = useState()
const [phone, setPhone] = useState()
const [address, setAddress] = useState()
const [bId, setBId] = useState()

const statuses = [
    'Принят',
    'Готовится',
    'Доставка',
    'Завершен',
    'Отменен'
]

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
        setDate(dateTest.toLocaleString())
        setFoods(data.foods)
        setPrice(data.price)
        setBId(data.order.basketId)

        setName(data.order.name)
        setPhone(data.order.phone)
        setAddress(data.order.address)
    }

    const newStatus = (status) => {
        setNewStatus(id, status)
        setStatus(status)
    }

    const repOrder = async (userId, basketId) => {
        console.log('userId: ' + userId)
        console.log('basketId: ' + basketId)
        const data = await repeatOrder(userId, basketId)
        navigate(NEW_ORDER_ROUTE)
    }

    return (
        <Container className='pt-4'>
            <h1>Заказ #{id}</h1>
            {user.role === 'ADMIN' && 
                <div>
                    <h2 className='py-2'>Изменение статуса</h2>
                    <Dropdown>
                        <Dropdown.Toggle>{status}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {statuses.map(status =>
                                <Dropdown.Item onClick={() => newStatus(status)} key={status}>{status}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            }
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
                                <h5 className='ms-5' style={{width: 110}}>{food.amount} шт</h5> 
                                <h5 style={{width: 120}} className='ms-5'>{Number(food.food.price) * Number(food.amount)} руб</h5>           
                            </div>
                            <hr/>
                        </div>   
                    )
                }
                <div className='d-flex'>
                    <h2 className='pb-4 pt-2 pe-5'>Сумма: {price} руб</h2>
                    <Button
                        style={{width: 150, height: 50}} className='mt-1'
                        onClick={() => repOrder(user.id, bId)}
                    >Повторить заказ</Button>
                </div>
                
            </div>
        </Container>
    )
})

export default Order