import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { getBasket } from '../http/foodAPI'

const Basket = observer(() => {

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

      console.log(data)

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
    <Container className='pt-5'>
      {name.map((item, index) =>
        <div key={item}>
          <div> name: {item}</div>
          <div> price: {price[index]} руб</div>
          <div> amount: {amount[index]}</div>
          <div> img: {img[index]}</div>
          <div> bfId: {basketFoodId[index]}</div>
          <hr/>             
        </div>        
      )}
      <div>Итоговая цена: {finalPrice} руб</div>
    </Container>
  )
})

export default Basket