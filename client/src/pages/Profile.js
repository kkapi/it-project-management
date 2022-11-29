import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { Context } from '..'

const Profile = observer(() => {

  const {user} = useContext(Context)
  let mama = 'mama'

  return (
    <Container 
      className="d-flex justify-content-center align-items-center flex-column"
      style={{height: window.innerHeight - 80}}
    >
      <Card style={{width: 900, height: 550}} className="p-3 text-center">
        <h2 className='pb-3' >Профиль</h2>
        <Form className='d-flex justify-content-around mb-3'>
          <Form>
            Почта: {<span className='fw-bold'>{user.user.email}</span>}
          </Form>
          <Form>
            Роль: {user.user.role === 'USER' && <span className='fw-bold'>Пользователь</span>}
                  {user.user.role === 'ADMIN' && <span className='fw-bold'>Администратор</span>}
                  {user.user.role === 'MODERATOR' && <span className='fw-bold'>Модератор</span>}
          </Form>
          <Form>
            Статус: {!user.isBlocked ? <span className='text-success fw-bold'>Активен</span> : <span className='text-danger fw-bold'>Заблокирован</span>}
          </Form>
        </Form>        
        <hr/>
        <div className='d-flex justify-content-center' style={{width: 800}}>
        <Form className='d-flex flex-column align-items-start pb-4'>
          <Form style={{width: 550, height: 38}} className=' d-flex align-items-center mt-4'>
            <span style={{width: 300}}>ФИО</span>            
              <Form.Control
                className="mx-3"
                placeholder="ФИО"              
              />
              <Button variant="outline-dark" style={{height: 38}} className="ms-2">Изменить</Button>    
          </Form>
          <Form style={{width: 550, height: 38}} className='d-flex align-items-center mt-4'>
            <span style={{width: 300}}>Номер телефона</span>            
              <Form.Control
                className="mx-3"
                placeholder="8-800-555-35-35"              
              />
              <Button variant="outline-dark" style={{height: 38}} className="ms-2">Изменить</Button>    
          </Form>
          <Form style={{width: 550, height: 38}} className=' d-flex align-items-center mt-4'>
            <span style={{width: 300}}>Адрес</span>            
              <Form.Control
                className="mx-3"
                placeholder="ул. Пушкина, д. Колотушкина"              
              />
              <Button variant="outline-dark" style={{height: 38}} className="ms-2">Изменить</Button>    
          </Form>        
        </Form>
        </div>        
        <hr/>
        <Form style={{width: 300}} className="align-self-center pt-3 pe-4">
          <Form.Control
              style={{width: 270}}
              className=""
              placeholder="Введите новый пароль"              
          />
          <Form className='d-flex align-items-center mt-4' style={{width: 393}}>
            <Form.Control
              className=""
              placeholder="Подтвердите пароль"              
            /> 
            <Button variant="outline-dark" style={{height: 38}} className="ms-4">Изменить</Button>
          </Form>          
        </Form>     
      </Card>
    </Container>
  )
})

export default Profile