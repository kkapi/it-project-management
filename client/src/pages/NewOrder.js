import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import { useNavigate } from 'react-router-dom'
import { BASKET_ROUTE, PROFILE_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { getBasket } from '../http/foodAPI'


const NewOrder = () => {

  const {user} = useContext(Context)

  const navigate = useNavigate()

  const [name, setName] = useState([])
  const [price, setPrice] = useState([])
  const [img, setImg] = useState([])
  const [finalPrice, setFinalPrice] = useState(0)
  const [amount, setAmount] = useState(1)
  const [basketFoodId, setBasketFoodId] = useState([])

  useEffect(() => {
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
      setImg(food_img)
      setAmount(food_amount)
      setBasketFoodId(basket_food_id)

      setFinalPrice(final_price)
    })
  },[])

  return (
    <Container className='pt-4'>
        <h1 className="mb-4 mt-0">Заказ на доставку</h1>
        <div className='d-flex'>
          <Card className='p-4 me-4' style={{width: 350}}>
            <h2>Данные</h2>
            <div className='mb-2 mt-1'>ФИО: {user.name}</div>
            <div className='mb-2'>Телефон: {user.phone}</div>
            <div className='mb-2'>Адрес: {user.address}</div>
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
          <h2>Способ оплаты</h2>
        </Card>
        <div className='mt-4 pb-5'>
          <Button className='me-4' variant='outline-dark' onClick={() => navigate(BASKET_ROUTE)}>Назад в корзину</Button>
          <Button variant='outline-success'>Оформить заказ на: {finalPrice} руб</Button>
        </div>  
    </Container>
  )
}

export default NewOrder