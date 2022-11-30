import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { Context } from '..'
import { check, getOneUser, changePassword, changeInfo } from '../http/userAPI'

const Profile = observer(() => {

  const {user} = useContext(Context)

  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [notification, setNotification] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {
    getOneUser().then(data => {
      user.setInfo(data)      
    })
    check().then(data => {
      user.setUser(data)      
    })   
    
  },[name, phone, address])

  const validatePassword = (password) => {
    return String(password)
      .match(
        /^(?=.*[0-9])(?=.*[#$&*_-])[a-zA-Z0-9А-Яа-я#$&*_-]{5,25}$/
    )
  }

  let placeholderName = user.name || "Добавьте ФИО"
  let placeholderPhone = user.phone || "Добавьте телефон"
  let placeholderAddress = user.address || "Добавьте адрес"

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
  const changeAdress = async () => {
    if (!address) {
      alert('Введите адрес')
    } else {      
      changeInfo('', '', address).then(data => { 
        placeholderAddress = user.address || "Добавьте адрес"
        setAddress('')
      })      
      alert("Адрес изменен")
    }
  }

  const changeName = async () => {
    if (!name) {
      alert('Введите имя')
    } else {      
      changeInfo(name, '', '').then(data => {
        placeholderName = user.name || "Добавьте ФИО"
        setName('')}
        )      
      alert("Имя изменено")
    }
  }

  const changePhone = async () => {
    if (!phone) {
      alert('Введите телефон')
    } else {      
      changeInfo('', phone, '').then(data => {
        placeholderPhone = user.phone || "Добавьте телефон"
        setPhone('')
      })      
      alert("Телефон изменен")
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
                placeholder={placeholderName}
                value={name}
                onChange={(e) => setName(e.target.value)}            
              />
              <Button 
                variant="outline-dark" 
                style={{height: 38}} 
                className="ms-2"
                onClick={() => changeName()}
              >
                Изменить
              </Button>    
          </Form>
          <Form style={{width: 550, height: 38}} className='d-flex align-items-center mt-4'>
            <span style={{width: 300}}>Номер телефона</span>            
              <Form.Control
                className="mx-3"
                placeholder={placeholderPhone}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"            
              />
              <Button
                variant="outline-dark" 
                style={{height: 38}} 
                className="ms-2"
                onClick={() => changePhone()}
              >
                Изменить
              </Button>    
          </Form>
          <Form style={{width: 550, height: 38}} className=' d-flex align-items-center mt-4'>
            <span style={{width: 300}}>Адрес</span>            
              <Form.Control
                className="mx-3"
                placeholder={placeholderAddress}
                value={address}
                onChange={(e) => setAddress(e.target.value)}             
              />
              <Button 
                variant="outline-dark"
                style={{height: 38}} 
                className="ms-2"
                onClick={() => changeAdress()}
              >
                Изменить
              </Button>    
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