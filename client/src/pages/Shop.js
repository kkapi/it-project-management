import React from 'react'
import { Col, Container } from 'react-bootstrap'
import FoodList from '../components/FoodList';
import TypeBar from '../components/TypeBar';

const Shop = () => {
  return (
    <Container>
      <Col md={12}>
        <TypeBar/>
        <FoodList/>
      </Col>
    </Container>
  )
}

export default Shop