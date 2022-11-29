import React, { useContext } from 'react'
import { Button, Card, Col, Image } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
import { Context } from '..'
import { FOOD_ROUTE } from '../utils/consts'

const FoodItem = ({food}) => {

  const navigate = useNavigate()

  const {user} = useContext(Context)

  return (    
    <Col md={2} className="mt-3" >
        <Card style={{width: 180}} border={"light"}>
            <div className='p-2 d-flex flex-column align-items-center'>
                <Image width={150} height={150} 
                  src={process.env.REACT_APP_API_URL + food.img} 
                  className="rounded" 
                  onClick={() => navigate(FOOD_ROUTE + '/' + food.id)}
                  style={{cursor: 'pointer'}}
                />
                <div style={{width: 150}} className="d-flex justify-content-between align-items-center">
                  <div>
                    <div>{food.name}</div>
                    <div>{food.price} руб</div>
                  </div>
                  {user.role === 'USER' && <Button style={{height: 30, width: 30}} className="d-flex justify-content-center align-items-center" title="Добавить в корзину">+</Button>}
                </div>
            </div>         
        </Card>
    </Col>
  )
}

export default FoodItem