import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react'
import { Col, Container } from 'react-bootstrap'
import { Context } from '..';
import FoodList from '../components/FoodList';
import TypeBar from '../components/TypeBar';
import { fetchFood, fetchTypes } from '../http/foodAPI';

const Shop = observer(() => {
  const {food} = useContext(Context)

  useEffect(() => {
    fetchTypes().then(data => food.setTypes(data))
    fetchFood().then(data => food.setFoods(data.rows))
    
  },[])

  return (
    <Container>
      <Col md={12}>
        <TypeBar/>
        <FoodList/>
      </Col>
    </Container>
  )
})

export default Shop