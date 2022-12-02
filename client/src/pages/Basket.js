import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { getBasket } from '../http/foodAPI'

const Basket = observer(() => {

  let food = []

  let [info, setInfo] = useState([])

  useEffect(() => {
    getBasket().then(data => {
    
      console.log(data)
      const test = data.basket_foods
      console.log(test)
      test.map(item => {
        food.push(item.id)
        console.log(item.id)
      })

      setInfo(food)
      
      console.log('---------------')
      console.log(food)  
      console.log(info)  
      
      console.log('---------------')
    })
  },[])

  return (
    <Container className='mt-4'>
      <h1 className='mb-2 mt-0'>Корзина</h1>
      {info.map(item =>
        <div key={item}> food id: {item}</div>
      )}
    </Container>
  )
})

export default Basket