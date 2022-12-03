import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Container, Image } from 'react-bootstrap'
import { deleteBasketFood, getBasket } from '../http/foodAPI'

const Basket = observer(() => {

  const [name, setName] = useState([])
  const [price, setPrice] = useState([])
  const [img, setImg] = useState([])
  const [finalPrice, setFinalPrice] = useState(0)
  const [amount, setAmount] = useState(1)
  const [basketFoodId, setBasketFoodId] = useState([])
  const [update, setUpdate] = useState(false)
  
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
  },[update])

  const deleteFood = (bfId) => {
    deleteBasketFood(bfId)
    setTimeout(() => {  setUpdate(!update) }, 100);   
  }

  return (
    <Container className='pt-4'>
      <h1 className="mb-4 mt-0">Корзина</h1>
      {name.map((item, index) =>
        <div key={item}>
          <div className="d-flex align-items-center pt-2">
            <div style={{width: 90}}>
              <Image width={70} height={70} src={process.env.REACT_APP_API_URL + img[index]} className="rounded"/>
            </div>
            <h5 style={{width: 150}} className='ms-5'>{item}</h5>
            <h5 style={{width: 120}} className='ms-5'>{price[index]} руб</h5>
            <div style={{width: 180}}>
            <ButtonGroup className='ms-5'>
              <Button variant="outline-dark" className='border-end-0'>-</Button>
              <div className='d-flex align-items-center border-top border-bottom border-dark text-dark px-2'>{amount[index]}</div>
              <Button variant="outline-dark" className='border-start-0'>+</Button>
            </ButtonGroup>       
            </div>
            {/* <h5> {basketFoodId[index]}</h5> */}
            <Button variant={"outline-danger"} onClick={() => deleteFood(basketFoodId[index])} className='ms-5'>Убрать</Button>           
          </div>
          <hr/>
        </div>   
      )}
      <div className='d-flex align-items-center pt-3'>
        <h3 className='pt-1'>Итоговая цена: {finalPrice} руб</h3>
        <Button style={{height: 38}} variant={"outline-success"} className="ms-5">Оформить заказ</Button>
      </div>
      
    </Container>
  )
})

export default Basket