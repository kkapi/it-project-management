import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Row } from 'react-bootstrap'
import { Context } from '..'
import FoodItem from './FoodItem'

const FoodList = observer(() => {
    const {food} = useContext(Context)
  return (
    <Row className="d-flex">
        {food.foods.map(food =>
            <FoodItem key={food.id} food={food}/>
        )}
    </Row>
  )
})

export default FoodList