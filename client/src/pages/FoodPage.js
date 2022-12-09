import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Container, Form, Image } from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import { Context } from '..'
import { addBasketFood, changeFoodInfo, fetchOneFood } from '../http/foodAPI'

const FoodPage = () => {
  const {user} = useContext(Context)
  
  const [food, setFood] = useState({info: []})
  const [redaction, setRedaction] = useState(false)
  
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [update, setUpdate] = useState(false)

  const {id} = useParams()

  useEffect(() => {
    console.log("bops")
    fetchOneFood(id).then(data => {
      console.log(data)
      setFood(data)
      console.log(food)
    })    
  },[update])

  const changeInfo = (id, name, description, price) => {
    console.log(id, name, description, price)
    changeFoodInfo(id, name, description, price)
    setName('')
    setDescription('')
    setPrice('')
    setUpdate(!update)
  }

  return (
    <Container className='d-flex justify-content-center align-items-start mt-5 pt-5' style={{height: window.innerHeight - 150}}>
      <>
      <div className='d-flex flex-column pb-4'>        
          <Image width={300} height={300} src={process.env.REACT_APP_API_URL + food.img} className="rounded"/>
          {redaction ?
            <div className='d-flex pt-4' style={{width: 300}}>
            <Form.Control              
                placeholder="Введите новую цену"
                value={price}
                onChange={(e) => setPrice(e.target.value)}            
              />
              <Button 
                variant="outline-dark" 
                style={{height: 38}} 
                className="ms-3"
                onClick={() => changeInfo(id, '', '', Number(price))}
              >
                Изменить
              </Button>
            </div>
          : 
          <Card
          className="mt-4 d-flex flex-column align-items-center justify-content-around"
          style={{width: 300, height: 100, fontSize: 32}}
          >
            <h3 className='pt-2'>Цена: {food.price} руб</h3>         
          </Card>
          }
            
          {!redaction && <Button variant={"outline-dark"} className="mt-4" onClick={() => addBasketFood(id)}>Добавить в корзину</Button>}
          {user.role === 'MODERATOR' && 
          <Button variant={"outline-dark"} className="mt-3" onClick={() => setRedaction(!redaction)}>{!redaction ? <span>Редакитровать информацию</span> : <span>Просмотреть информацию</span>}</Button>
          }
      </div>
      <div className='d-flex flex-column align-items-center' style={{width: 700}}>
        
        {redaction ? 
        <div className='d-flex'>
          <Form.Control              
              placeholder="Введите новое название"
              value={name}
              onChange={(e) => setName(e.target.value)}   
            />
            <Button 
              variant="outline-dark" 
              style={{height: 38}} 
              className="ms-3"
              onClick={() => changeInfo(id, name, '', '')}  
            >
              Изменить
            </Button>
        </div> : <h1>{food.name}</h1>}
        <h2 className="mt-1">Описание</h2>
        {redaction ? 
          <div className='d-flex'>
          <Form.Control              
              placeholder="Введите новое описание"
              value={description}
              onChange={(e) => setDescription(e.target.value)}            
            />
            <Button 
              variant="outline-dark" 
              style={{height: 38}} 
              className="ms-3"
              onClick={() => changeInfo(id, '', description, '')}
            >
              Изменить
            </Button>
        </div>
        : <Card className="mt-1 p-3" style={{width: 500}}>{food.description}</Card>}
        <h2 className='mt-2'>Свойства</h2>
        <div className="d-flex flex-column" style={{width: 500}}>
          {food.info.map(info =>
            <div key={info.id}>
              {info.title}: {info.description}
            </div>
          )}
        </div>
      </div>
      </>  
    </Container>    
  )
}

export default FoodPage