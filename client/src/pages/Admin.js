import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ADMIN_ORDERS_ROUTE, ADMIN_USERS_ROUTE } from '../utils/consts'

const Admin = () => {

  const navigate = useNavigate()

  return (
    <Container className="d-flex flex-column">
      <Button 
        variant="outline-dark" 
        className="mt-3 p-2"
        onClick={() => navigate(ADMIN_USERS_ROUTE)}
      >
        Пользователи
      </Button>
      <Button 
        variant="outline-dark" 
        className="mt-3 p-2"
        onClick={() => navigate(ADMIN_ORDERS_ROUTE)}
      >
        Заказы
      </Button>
    </Container>
  )
}

export default Admin