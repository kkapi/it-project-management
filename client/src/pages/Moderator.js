import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import CreateFood from '../components/modals/CreateFood'
import CreateType from '../components/modals/CreateType'
import DeleteType from '../components/modals/DeleteType'

const Moderator = () => {
  const [typeVisible, setTypeVisible] = useState(false)
  const [foodVisible, setFoodVisible] = useState(false)
  const [typeDeleteVisible, setTypeDeleteVisible] = useState(false)

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
        onClick={() => setTypeDeleteVisible(true)}
      >
        Удалить тип
      </Button>
      <Button 
        variant="outline-dark" 
        className="mt-3 p-2"
        onClick={() => setFoodVisible(true)}
      >
        Добавить еду
      </Button>
      
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
      <DeleteType show={typeDeleteVisible} onHide={() => setTypeDeleteVisible(false)}/>
      <CreateFood show={foodVisible} onHide={() => setFoodVisible(false)}/>      
    </Container>    
  )
}

export default Moderator