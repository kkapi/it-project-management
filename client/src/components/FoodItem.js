import React from 'react'
import { Card, Col, Image } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
import { FOOD_ROUTE } from '../utils/consts'

const FoodItem = ({food}) => {
    const navigate = useNavigate()
  return (
    <Col md={2} className="mt-3" onClick={() => navigate(FOOD_ROUTE + '/' + food.id)}>
        <Card style={{width: 180, cursor: 'pointer'}} border={"light"}>
            <div className='p-2 d-flex flex-column align-items-center'>
                <Image width={150} height={150} src={food.img} className="rounded"/>            
                <div>{food.name}</div>
                <div className="align-self-start">{food.price} руб</div>
            </div>            
        </Card>
    </Col>
  )
}

export default FoodItem