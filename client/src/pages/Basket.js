import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, ButtonGroup, Container, Image } from 'react-bootstrap'
import { useNavigate, useRouteError } from 'react-router-dom'
import { changeAmount, deleteBasketFood, getBasket } from '../http/foodAPI'
import { NEW_ORDER_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { Context } from "..";

const Basket = observer(() => {

  const [name, setName] = useState([])
  const [price, setPrice] = useState([])
  const [img, setImg] = useState([])
  const [finalPrice, setFinalPrice] = useState(0)
  const [amount, setAmount] = useState(1)
  const [basketFoodId, setBasketFoodId] = useState([])
  const [update, setUpdate] = useState(false)

  const navigate = useNavigate()

  const {user} = useContext(Context)
  
  useEffect(() => {
    console.log(user.name, user.address, user.phone)
    getBasket().then(data => {

      console.log(data)
      
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
  },[update])

  const deleteFood = (bfId) => {
    deleteBasketFood(bfId)
    setTimeout(() => { setUpdate(!update) }, 100);   
  }

  const reduceAmount = (bfId, amount) => {
    if (amount >= 2) {
      changeAmount(bfId, amount - 1)      
      setTimeout(() => { setUpdate(!update) }, 100);
    } else {
      deleteBasketFood(bfId)
      setTimeout(() => { setUpdate(!update) }, 100);
    }    
  }

  const addAmount = (bfId, amount) => {
    changeAmount(bfId, amount + 1)      
    setTimeout(() => {  setUpdate(!update) }, 100);
  }

  const orderRegistration = () => {
    console.log(user.name, user.address, user.phone)
    if (!user.name || !user.address || !user.phone) {
      alert("Укажите все личные данные в профиле")
    } else {
      console.log("Оформление заказа!")
      navigate(NEW_ORDER_ROUTE)
    }
  }

  return (
    <Container className='pt-4'>
      <h1 className="mb-4 mt-0">Корзина</h1>
      {name.map((item, index) =>
        <div key={index}>
          <div className="d-flex align-items-center pt-2 pb-2">
            <div style={{width: 90}}>
              <Image width={70} height={70} src={process.env.REACT_APP_API_URL + img[index]} className="rounded"/>
            </div>
            <h5 style={{width: 150}} className='ms-5'>{item}</h5>
            <h5 style={{width: 120}} className='ms-5'>{price[index]} руб</h5>
            <div style={{width: 180}}>
            <ButtonGroup className='ms-5'>
              <Button variant="outline-dark" className='border-end-0' onClick={() => reduceAmount(basketFoodId[index], amount[index])}>-</Button>
              <div className='d-flex align-items-center border-top border-bottom border-dark text-dark px-2'>{amount[index]}</div>
              <Button variant="outline-dark" className='border-start-0' onClick={() => addAmount(basketFoodId[index], amount[index])}>+</Button>
            </ButtonGroup>       
            </div>            
            <Button variant={"outline-danger"} onClick={() => deleteFood(basketFoodId[index])} className='ms-5'>Убрать</Button>           
          </div>
          <hr/>
        </div>   
      )}
      {finalPrice < 1000 && <p className='fs-5 pt-3'>Минимальная сумма на доставку - 1000 руб</p>}
      <div className='d-flex align-items-center pt-3 pb-4'>
        <h3>Итоговая цена: {finalPrice} руб</h3>
        {finalPrice >= 1000 ?
          <Button style={{height: 38}} variant={"outline-success"} className="ms-5" onClick={() => orderRegistration()}>Перейти к оформлению</Button>
         :
          <Button style={{height: 38}} variant={"outline-success"} className="ms-5" onClick={() => navigate(SHOP_ROUTE)}>Добавить товары на {1000-finalPrice} руб</Button>          
        } 
      </div>
      
    </Container>
  )
})

export default Basket