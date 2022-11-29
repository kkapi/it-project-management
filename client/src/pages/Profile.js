import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { Context } from '..'
import { check, getOneUser, changePassword } from '../http/userAPI'

const Profile = observer(() => {

  const {user} = useContext(Context)

  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [notification, setNotification] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState('') 

  useEffect(() => {
    check().then(data => user.setUser(data)) 
    getOneUser().then(data => user.setInfo(data))
  },[])

  const validatePassword = (password) => {
    return String(password)
      .match(
        /^(?=.*[0-9])(?=.*[#$&*_-])[a-zA-Z0-9А-Яа-я#$&*_-]{5,25}$/
    )
  }

  let name = user.name || "Добавьте ФИО"
  let phone = user.phone || "Добавьте телефон"
  let address = user.address || "Добавьте адрес"

  const changePass = async () => {
    try {            
        if (!password && !confirmPassword) {
          // setNotification(null)
          // setError("Введите и подтвердите пароль")
          alert("Введите и подтвердите пароль")
        } else if (!password) {
          // setNotification(null)
          // setError("Введите пароль")
          alert("Введите пароль")
        } else if (!validatePassword(password)) {
          // setNotification(null)
          // setError('Пароль должен содержать от 5 до 20 символов, иметь хотя бы одну цифру, иметь хотя бы один специальный символ [#$&*_-]')
          alert("Пароль должен содержать от 5 до 20 символов, иметь хотя бы одну цифру, иметь хотя бы один специальный символ [#$&*_-]")
        } else if (!confirmPassword) {
          // setNotification(null)
          // setError("Подтвердите пароль")
          alert("Подтвердите пароль")
        } else if (password !== confirmPassword) {
          // setNotification(null)
          // setError("Пароли не совпадают")
          alert("Пароли не совпадают")
        } else if (password === confirmPassword) {
          // setError(null)               
          // setNotification('Пароль был успешно изменен')
          const data = changePassword(password)
          alert(data)
          setPassword('')
          setConfirmPassword('')              
        }                
    } catch (e) {
        // setNotification(null)
        // setError(e.response.data.message)
        console.log(e.response.data.message)
    }
}

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
                placeholder={name}              
              />
              <Button variant="outline-dark" style={{height: 38}} className="ms-2">Изменить</Button>    
          </Form>
          <Form style={{width: 550, height: 38}} className='d-flex align-items-center mt-4'>
            <span style={{width: 300}}>Номер телефона</span>            
              <Form.Control
                className="mx-3"
                placeholder={phone}             
              />
              <Button variant="outline-dark" style={{height: 38}} className="ms-2">Изменить</Button>    
          </Form>
          <Form style={{width: 550, height: 38}} className=' d-flex align-items-center mt-4'>
            <span style={{width: 300}}>Адрес</span>            
              <Form.Control
                className="mx-3"
                placeholder={address}             
              />
              <Button variant="outline-dark" style={{height: 38}} className="ms-2">Изменить</Button>    
          </Form>        
        </Form>
        </div>        
        <hr/>
        <Form style={{width: 300}} className="align-self-center pt-3 pe-4">
              { error && <div className="alert alert-danger m-0 mt-3 text-center py-2" role="alert">{error}</div>}
            { notification && <div className="alert alert-success m-0 mt-3 text-center py-2" role="alert">{notification}</div>}
          <Form.Control
              style={{width: 270}}              
              placeholder="Введите новый пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={"password"}          
          />
          <Form className='d-flex align-items-center mt-4' style={{width: 393}}>
            <Form.Control              
              placeholder="Подтвердите пароль"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={"password"}              
            /> 
            <Button variant="outline-dark" style={{height: 38}} className="ms-4" onClick={changePass}>Изменить</Button>
          </Form>          
        </Form>     
      </Card>
    </Container>
  )
})

export default Profile