import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Card, Container, Form } from 'react-bootstrap'
import { Context } from '..'

const Profile = observer(() => {

  const {user} = useContext(Context)
  console.log(user.user)

  return (
    <Container 
      className="d-flex justify-content-center align-items-center flex-column"
      style={{height: window.innerHeight - 80}}
    >
      <Card style={{width: 900, height: 550}} className="p-4 text-center">
        <h2 className='pb-3' >Профиль</h2>
        <Form className='d-flex justify-content-between px-5'>
          <Form>
            Почта: {user.user.email}
          </Form>
          <Form>
            Роль: {user.user.role === 'USER' && <span>Пользователь</span>}
          </Form>
          <Form>
            Статус: {!user.isBlocked ? <span className='text-success'>Активен</span> : <span className='text-danger'>Заблокирован</span>}
          </Form>
        </Form>        
        <hr/>
      </Card>
    </Container>
  )
})

export default Profile