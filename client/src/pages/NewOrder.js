import { observer } from 'mobx-react-lite'
import React, { useState, useContext, useEffect } from 'react'
import { Button, Card, Container, Dropdown, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getOneUser } from '../http/userAPI'
import { BASKET_ROUTE, ORDER_ROUTE, PROFILE_ROUTE } from '../utils/consts'
import { Context } from '..'
import { createOrder, getBasket, payOrder } from '../http/foodAPI'

const NewOrder = observer(() => {

    const {user} = useContext(Context)

    const [name, setName] = useState([])
    const [price, setPrice] = useState([])
    const [finalPrice, setFinalPrice] = useState(0)
    const [amount, setAmount] = useState(1)
    const [method, setMethod] = useState('По карте')
    const [userName, setUserName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [comment, setComment] = useState('')
    const [orderHours, setOrderHours] = useState([])
    const [curDeliveryTime, setCurDeliveryTime] = useState('Как можно раньше')
    const [cardNumber, setCardNumber] = useState('')
    const [cvc, setCvc] = useState('')
    const [cardPeriod, setCardPeriod] = useState('')
    const [cardName, setCardName] = useState('')
    const [error, setError] = useState(null)

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
      
     const hours = getHours()
     setOrderHours(hours)

    },[])

  const getHours = () => {
    const date = new Date()
    
    date.setHours(date.getHours() + 2)
    
    const curH = date.toLocaleTimeString().split(':')[0]

    let hours = ['Как можно раньше']

    for (let hour = curH; hour < 24; hour++) {
      hours.push('Доставить к ' + String(hour) + ':00')
    }

    return hours
  }

  const newOrder = async (comment, method, final_price, wish_time) => {
    if (wish_time === 'Как можно раньше') {
      const date = new Date() 
      date.setHours(date.getHours() + 1)
      const time = date.toLocaleTimeString().split(':')
      wish_time = time[0] + ':' + time[1]
    } else {
      wish_time = wish_time.split(' ')[2]
    }

    if (method === 'По карте') {
      if (!cardNumber || !cardPeriod || !cvc || !cardName) {
        setError('Заполните данные карты')
      } else {
        try {
          const {result} = await payOrder(cardNumber, cardPeriod, cvc, cardName, final_price)
          console.log(result)
          if (result === 'success') {
            const {order} = await createOrder(comment, method, final_price, wish_time)
            navigate(ORDER_ROUTE + '/' + order.id)
          }
        } catch (e) {
          setError(e.response.data.message)
        }
      }      

    } else {
      const {order} = await createOrder(comment, method, final_price, wish_time)
      navigate(ORDER_ROUTE + '/' + order.id)
    }  
   
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
            <div className='my-2 d-flex align-items-center'>
              <div className='pe-2'>Время:</div>
              <Dropdown>
                <Dropdown.Toggle>{curDeliveryTime}</Dropdown.Toggle>
                <Dropdown.Menu>                   
                  {orderHours.map(hour =>
                    <Dropdown.Item onClick={() => setCurDeliveryTime(hour)} key={hour}>{hour}</Dropdown.Item>
                  )}                 
                </Dropdown.Menu>
              </Dropdown>
            </div>
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
          {method === 'По карте' && 
            <div>
              <hr/>              
              <div className='d-flex justify-content-center'>
              <Form style={{width: 400}}> 
              { error && <div className="alert alert-danger text-center py-2" role="alert" style={{width: 400}}>{error}</div>}             
                <Form.Control
                  className="mt-2"
                  placeholder="Номер карты"
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value)}
                />
                <div className='d-flex'>
                  <Form.Control
                    className="mt-3"
                    placeholder="Срок действия"
                    value={cardPeriod}
                    onChange={e => setCardPeriod(e.target.value)}
                  />
                  <Form.Control
                    className="mt-3 ms-3"
                    placeholder="CVC"
                    value={cvc}
                    onChange={e => setCvc(e.target.value)}
                  />
                </div>
                
                <Form.Control
                  className="mt-3"
                  placeholder="Имя на карте"
                  value={cardName}
                  onChange={e => setCardName(e.target.value)}
                />
              </Form>
              </div>
            </div>
            
          }
        </Card>
        <div className='mt-4 pb-5 d-flex' style={{width: 725}}>
          <Button variant='outline-dark' onClick={() => navigate(BASKET_ROUTE)}>Назад в корзину</Button>
          <Button variant='outline-success' className='ms-auto' onClick={() => newOrder(comment, method, finalPrice, curDeliveryTime)}>Оформить заказ на: {finalPrice} руб</Button>
        </div>  
    </Container>
  )
})

export default NewOrder