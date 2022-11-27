import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import CreateFood from '../components/modals/CreateFood'
import CreateType from '../components/modals/CreateType'

const Moderator = () => {
  const [typeVisible, setTypeVisible] = useState(false)
  const [foodVisible, setFoodVisible] = useState(false)

  return (
    <Container className="d-flex flex-column">
      <Button 
        variant="outline-dark" 
        className="mt-3 p-2"
        onClick={() => setTypeVisible(true)}
      >
        Добавить тип</Button>
      <Button 
        variant="outline-dark" 
        className="mt-3 p-2"
        onClick={() => setFoodVisible(true)}
      >
        Добавить еду</Button>
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
      <CreateFood show={foodVisible} onHide={() => setFoodVisible(false)}/>
    </Container>    
  )
}

export default Moderator