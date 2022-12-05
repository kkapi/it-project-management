import { observer } from 'mobx-react-lite'
import React, { useState, useContext, useEffect } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getOneUser } from '../http/userAPI'
import { BASKET_ROUTE, ORDER_ROUTE, PROFILE_ROUTE } from '../utils/consts'
import { Context } from '..'
import { createOrder, getBasket } from '../http/foodAPI'

const NewOrder = observer(() => {

    const {user} = useContext(Context)

    const [name, setName] = useState([])
    const [price, setPrice] = useState([])
    const [finalPrice, setFinalPrice] = useState(0)
    const [amount, setAmount] = useState(1)
    const [method, setMethod] = useState('Наличными')
    const [userName, setUserName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [comment, setComment] = useState('')


    const navigate = useNavigate()
    
    useEffect(() => {
      getOneUser(user.id).then(data => {        
        setUserName(data.name)
        setAddress(data.address)
        setPhone(data.phone)       
      })

      getBasket().then(data => {
        let final_price = 0;
  
        let food_name = []
        let food_price = []
        let food_img = []
        let food_amount = []
        let basket_food_id = []
  
        const info = data.basket_foods
  
        info.map(item => {
          food_name.push(item.food.name)
          food_price.push(Number(item.food.price) * Number(item.amount))
          food_img.push(item.food.img)
          food_amount.push(item.amount)
          basket_food_id.push(item.id)
  
          final_price += (Number(item.food.price) * Number(item.amount));
        })
  
        setName(food_name)
        setPrice(food_price)
        setAmount(food_amount)
  
        setFinalPrice(final_price)
      })
    },[])

  const newOrder = async (comment, method, final_price) => {
    const {order} = await createOrder(comment, method, final_price)
    console.log(order.id)
    navigate(ORDER_ROUTE + '/' + order.id)
  }

  return (
    <Container className='pt-4'>
        <h1 className="mb-4 mt-0">Заказ на доставку</h1>
        <div className='d-flex'>
          <Card className='p-4 me-4' style={{width: 350}}>
            <h2>Данные</h2>
            <div className='mb-2 mt-1'>ФИО: {userName}</div>
            <div className='mb-2'>Телефон: {phone}</div>
            <div className='mb-2'>Адрес: {address}</div>
            <Button className='my-2' variant='outline-dark' onClick={() => navigate(PROFILE_ROUTE + '/' + user.id)}>Изменить данные</Button>
            <div className='mb-2'>Время: Побыстрее</div>
           </Card>
           <Card className='p-4 d-flex flex-column' style={{width: 350}}>
             <h2>Состав</h2>
             {name.map((item, index) =>
              <div key={item}>
                <div className="d-flex">                 
                  <div style={{width: 100}} className='me-4 mb-2'>{item}</div>
                  <div style={{width: 50}} className='me-4 mb-2'>{amount[index]} шт</div>
                  <div style={{}} className='me-4 mb-2'>{price[index]} руб</div>
                </div>
              </div>   
            )}
            <h5 className='mt-auto pt-2'>Итоговая цена: {finalPrice} руб</h5>
          </Card>
        </div>
        <Card className='p-4 mt-4' style={{width: 725}}>
          <h2>Комментарий к заказу</h2>
          <Form>          
            <Form.Control
              className="mt-3 mb-3"
              placeholder="Комментарий к заказу..."
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
          </Form>
        </Card>
        <Card className='p-4 mt-4' style={{width: 725}}>
          <h2>Способ оплаты</h2>
          <Form.Group>
            <Form.Check label="По карте" type="radio" checked={method === 'По карте'} onChange={() => setMethod('По карте')}/>
            <Form.Check label="Картой курьеру" type="radio" checked={method === 'Картой курьеру'} onChange={() => setMethod('Картой курьеру')}/>
            <Form.Check label="Наличными" type="radio" checked={method === 'Наличными'} onChange={() => setMethod('Наличными')}/>
          </Form.Group>
        </Card>
        <div className='mt-4 pb-5 d-flex' style={{width: 725}}>
          <Button variant='outline-dark' onClick={() => navigate(BASKET_ROUTE)}>Назад в корзину</Button>
          <Button variant='outline-success' className='ms-auto' onClick={() => newOrder(comment, method, finalPrice)}>Оформить заказ на: {finalPrice} руб</Button>
        </div>  
    </Container>
  )
})

export default NewOrder