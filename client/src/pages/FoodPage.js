import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import { Context } from '..'
import { fetchOneFood } from '../http/foodAPI'

const FoodPage = () => {
  const {user} = useContext(Context)
  
  const [food, setFood] = useState({info: []})
  
  const {id} = useParams()

  useEffect(() => {
    fetchOneFood(id).then(data => {
      setFood(data)
    })    
  },[])

  return (
    <Container className='d-flex justify-content-center align-items-start mt-5 pt-5' style={{height: window.innerHeight - 150}}>
      <>
      <Form className='d-flex flex-column'>        
          <Image width={300} height={300} src={process.env.REACT_APP_API_URL + food.img} className="rounded"/>
          <Card
            className="mt-4 d-flex flex-column align-items-center justify-content-around"
            style={{width: 300, height: 100, fontSize: 32}}
          >
            <h3 className='pt-2'>Цена: {food.price} руб</h3>
            {user.role === "USER" && <Button variant={"outline-dark"} className="mb-3">Добавить в корзину</Button>}
          </Card>  
      </Form>
      <Form className='d-flex flex-column align-items-center' style={{width: 700}}>
        <h1>{food.name}</h1>
        <h2 className="mt-1">Описание</h2>
        <Card className="mt-1 p-3" style={{width: 500}}>{food.description}</Card>
        <h2 className='mt-2'>Свойства</h2>
        <Row className="d-flex flex-column" style={{width: 500}}>
          {food.info.map(info =>
            <Form key={info.id}>
              {info.title}: {info.description}
            </Form>
          )}
        </Row>
      </Form>
      </>  
    </Container>    
  )
}

export default FoodPage