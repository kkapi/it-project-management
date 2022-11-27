import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import { fetchOneFood } from '../http/foodAPI'

const FoodPage = () => {
  const [food, setFood] = useState({info: []})
  const {id} = useParams()

  useEffect(() => {
    fetchOneFood(id).then(data => setFood(data))
  }, [])

  return (
    <Container className='mt-3'>
      <Col md={4}>
        <Image width={300} height={300} src={process.env.REACT_APP_API_URL + food.img} className="rounded"/>
      </Col>
      <Col md={4}>
        <h2>{food.name}</h2>
      </Col>
      <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{width: 300, height: 100, fontSize: 32}}
          >
            <h3>{food.price} руб</h3>
            <Button variant={"outline-dark"}>Добавить в корзину</Button>
          </Card>
      </Col>
      <h3 className='mt-3'>Информация</h3>
      <Row className="d-flex flex-column m-3">
        {food.info.map(info =>
          <Row key={info.id}>
            {info.title}: {info.description}
          </Row>
        )}
      </Row>
    </Container>
  )
}

export default FoodPage