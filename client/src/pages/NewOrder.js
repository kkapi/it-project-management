import React, { useContext } from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import { useNavigate } from 'react-router-dom'
import { PROFILE_ROUTE } from '../utils/consts'


const NewOrder = observer(() => {

  const {user} = useContext(Context)

  const navigate = useNavigate()

  return (
    <Container className='pt-4'>
        <h1 className="mb-4 mt-0">Заказ на доставку</h1>
        <div className='d-flex'>
          <Card className='p-4 me-4' style={{width: 350}}>
            <h2>Данные</h2>
            <div className='mb-2 mt-1'>ФИО: {user.name}</div>
            <div className='mb-2'>Телефон: {user.phone}</div>
            <div className='mb-2'>Адрес: {user.address}</div>
            <Button className='my-2' variant='outline-dark' onClick={() => navigate(PROFILE_ROUTE + '/' + user.id)}>Изменить данные</Button>
            <div className='mb-2'>Время: Побыстрее</div>
          </Card>
          <Card className='p-4' style={{width: 350}}>
            <h2>Состав</h2>
          </Card>
        </div>
        <Card className='p-4 mt-4' style={{width: 725}}>
          <h2>Способ оплаты</h2>
        </Card>
        <div className='mt-4'>
          <Button className='me-4' variant='outline-dark'>Назад в корзину</Button>
          <Button variant='outline-success'>Оформить заказ на: руб</Button>
        </div>
        
        
    </Container>
  )
})

export default NewOrder