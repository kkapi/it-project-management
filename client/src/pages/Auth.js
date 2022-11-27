import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { NavLink, useLocation } from 'react-router-dom'
import { Context } from '..'
import { login, registration } from '../http/userAPI'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { useNavigate } from "react-router-dom"


const Auth = observer(() => {
  
  const navigate = useNavigate()
  const {user} =useContext(Context)
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [notification, setNotification] = useState(null)

  const click = async () => {
    try {
      let data
      if (isLogin) {
          data = await login(email, password)
          user.setUser(user)
          user.setIsAuth(true)
          user.setRole(data.role)
          navigate(SHOP_ROUTE)
      } else {
          setError(null)
          setNotification('Сылка для активации аккаунта была отправлена на ' + email)
          data = await registration(email, password)   
      }           
      
    } catch (e) {
      setError(e.response.data.message)
    }      
  }  

  return (   

    <Container 
      className="d-flex justify-content-center align-items-center"
      style={{height: window.innerHeight - 54}}
    >
      <Card style={{width: 600}} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <Form className="d-flex flex-column">
          { error && <div class="alert alert-danger m-0 mt-3 text-center py-2" role="alert">{error}</div>}
          { notification && <div class="alert alert-info m-0 mt-3 text-center py-2" role="alert">{notification}</div>}
          <Form.Control
            className="mt-3"
            placeholder="Введите ваш email..."
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Введите ваш пароль..."
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
          <Form className="d-flex justify-content-between mt-3">
            {isLogin ? 
              <div>
                  Нет аккаунта? <NavLink to={REGISTRATION_ROUTE} onClick={() => setError(null)}>Зарегистрируйтесь!</NavLink>
              </div>
              :
              <div>
                  Есть аккаунт? <NavLink to={LOGIN_ROUTE} onClick={() => setError(null)}>Войдите!</NavLink>
              </div>
              }
            <Button
              className="mt-3"
              variant="outline-success"
              onClick={click}         
            >
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </Button>
          </Form>          
        </Form>
      </Card>
    </Container>
  )
})

export default Auth