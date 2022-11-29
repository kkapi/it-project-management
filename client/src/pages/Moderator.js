import React, { useContext, useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Context } from '..'
import AlertFood from '../components/modals/AlertFood'
import AlertType from '../components/modals/AlertType'
import CreateFood from '../components/modals/CreateFood'
import CreateType from '../components/modals/CreateType'
import DeleteFood from '../components/modals/DeleteFood'
import DeleteType from '../components/modals/DeleteType'
import { fetchTypes, getAllFood } from '../http/foodAPI'

const Moderator = () => {
  const [typeVisible, setTypeVisible] = useState(false)
  const [foodVisible, setFoodVisible] = useState(false)
  const [typeDeleteVisible, setTypeDeleteVisible] = useState(false)
  const [foodDeleteVisible, setFoodDeleteVisible] = useState(false)
  const [alertTypeVisible, setAlertTypeVisible] = useState(false)
  const [alertFoodVisible, setAlertFoodVisible] = useState(false)

  const {food} = useContext(Context)

  useEffect(() => {    
    fetchTypes().then(data => food.setTypes(data))
    getAllFood().then(data => {
      food.setAllFood(data)     
    })
    console.log("biba!!!")
  },[foodVisible, typeVisible, typeDeleteVisible, foodDeleteVisible])

  return (
    <Container className="d-flex flex-column">
      <Button 
        variant="outline-dark" 
        className="mt-3 p-2"
        onClick={() => setTypeVisible(true)}
      >
        Добавить тип
      </Button>
      <Button 
        variant="outline-dark" 
        className="mt-3 p-2"
        onClick={() => { food.types.length !== 0 ? setTypeDeleteVisible(true) : setAlertTypeVisible(true) }}
      >
        Удалить типы
      </Button>
      <Button 
        variant="outline-dark" 
        className="mt-3 p-2"
        onClick={() => { food.types.length !== 0 ? setFoodVisible(true) : setAlertTypeVisible(true) }}
      >
        Добавить карточку с едой
      </Button>
      <Button 
        variant="outline-dark" 
        className="mt-3 p-2"
        onClick={() => { food.allFood.length !== 0 ? setFoodDeleteVisible(true) : setAlertFoodVisible(true) }}
      >
        Удалить карточки с едой
      </Button>
      
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
      <DeleteType show={typeDeleteVisible} onHide={() => setTypeDeleteVisible(false)}/>
      <CreateFood show={foodVisible} onHide={() => setFoodVisible(false)}/>
      <DeleteFood show={foodDeleteVisible} onHide={() => setFoodDeleteVisible(false)}/>
      <AlertType show={alertTypeVisible} onHide={() => setAlertTypeVisible(false)}/>
      <AlertFood show={alertFoodVisible} onHide={() => setAlertFoodVisible(false)}/>
    </Container>    
  )
}

export default Moderator