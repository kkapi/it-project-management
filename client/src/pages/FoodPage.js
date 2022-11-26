import React from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'

const FoodPage = () => {
  const food = {id: 1, name: 'Кола', price: 99, img: 'https://avatars.dzeninfra.ru/get-zen_doc/1678002/pub_5f8db3bc3f59f84e2cff47af_5f8db40af46e1b4b59c469c1/scale_1200'}
  const description = [
    {id:1, title: 'Объем', description: '0,5 л'},
    {id:2, title: 'Калорийность', description: '100'},
    {id:3, title: 'ывапыв', description: 'фыва'},
    {id:4, title: 'ывап', description: 'фыва'},
    {id:5, title: 'ывап', description: 'фыва'},  
  ]

  return (
    <Container className='mt-3'>
      <Col md={4}>
        <Image width={300} height={300} src={food.img} className="rounded"/>
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
        {description.map(info =>
          <Row key={info.id}>
            {info.title}: {info.description}
          </Row>
        )}
      </Row>
    </Container>
  )
}

export default FoodPage