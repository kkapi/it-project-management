import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react'
import { Col, Container } from 'react-bootstrap'
import { Context } from '..';
import FoodList from '../components/FoodList';
import Pages from '../components/Pages';
import TypeBar from '../components/TypeBar';
import { fetchFood, fetchTypes } from '../http/foodAPI';

const Shop = observer(() => {
  const {food} = useContext(Context)

  useEffect(() => {
    fetchTypes().then(data => {
      food.setTypes(data)
    })

    fetchFood(null, 1, 12).then(data => {
      food.setFoods(data.rows)
      food.setTotalCount(data.count)      
    }) 
  },[])

  useEffect(() => {
    fetchFood(food.selectedType.id, food.page, 12).then(data => {
      food.setFoods(data.rows)
      food.setTotalCount(data.count)     
    })
  }, [food.page, food.selectedType])

  return (
    <Container>
      <Col md={12}>
        <TypeBar/>
        <FoodList/>
        <Pages/>
      </Col>
    </Container>
  )
})

export default Shop