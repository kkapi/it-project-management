import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { Context } from '..'
import { check, getOneUser, changePassword, changeInfo } from '../http/userAPI'

const Profile = observer(() => {

  const {user} = useContext(Context)
  const {id} = useParams()

  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [notification, setNotification] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [isBlocked, setIsBlocked] = useState('')
  const [currentId, setCurrentId] = useState('')
  const [dataError, setDataError] = useState(null)

  let placeholderName = name || "Добавьте ФИО"
  let placeholderPhone = phone || "Добавьте телефон"
  let placeholderAddress = address || "Добавьте адрес"

  useEffect(() => {
      getOneUser(id).then(data => {
        setEmail(data.email)
        setRole(data.role)  
        setIsBlocked(data.isBlocked)
        
        setCurrentId(data.id)
      })
       
    
  },[email, dataError])

  useEffect(() => {

  },[name, phone, address])

  const validatePassword = (password) => {
    return String(password)
      .match(
        /^(?=.*[0-9])(?=.*[#$&*_-])[a-zA-Z0-9А-Яа-я#$&*_-]{5,25}$/
    )
  }

  const changePass = async () => {
    try {            
        if (!password && !confirmPassword) {
          setNotification(null)
          setError("Введите и подтвердите пароль")         
        } else if (!password) {
          setNotification(null)
          setError("Введите пароль")
        } else if (!validatePassword(password)) {
          setNotification(null)
          setError('Пароль должен содержать от 5 до 20 символов, иметь хотя бы одну цифру, иметь хотя бы один специальный символ [#$&*_-]')
        } else if (!confirmPassword) {
          setNotification(null)
          setError("Подтвердите пароль")
        } else if (password !== confirmPassword) {
          setNotification(null)
          setError("Пароли не совпадают")
        } else if (password === confirmPassword) {
          setError(null)             
          setNotification('Пароль был успешно изменен')
          const data = changePassword(password)
          setPassword('')
          setConfirmPassword('')              
        }                
    } catch (e) {
        setNotification(null)
        setError(e.response.data.message)
        console.log(e.response.data.message)
    }
}
  const changeAdress = async () => {
    console.log(address)
    if (address) {      
      changeInfo('', '', address).then(data => { 
        placeholderAddress = user.address || "Добавьте адрес"
        setAddress('')
      })      
    }
  }

  const changeName = async () => {
    if (name) {      
      changeInfo(name, '', '').then(data => {
        placeholderName = user.name || "Добавьте ФИО"
        setName('')}
        )      
   
    }
  }

  const changePhone = async () => {
    if (phone) {      
      changeInfo('', phone, '').then(data => {
        placeholderPhone = user.phone || "Добавьте телефон"
        setPhone('')
      })      
    }
  }

  return (
    (user.id === currentId || user.role === 'ADMIN') &&
    <Container 
    className="d-flex justify-content-center align-items-center flex-column pt-5"
    
  >
    <Card style={{width: 900}} className="p-3 text-center mb-5">
      <h2 className='pb-3' >Профиль</h2>
      <Form className='d-flex justify-content-around mb-3'>
        <Form>
          Почта: {<span className='fw-bold'>{email}</span>}
        </Form>
        <Form>
          Роль: {role === 'USER' && <span className='fw-bold'>Пользователь</span>}
                {role === 'ADMIN' && <span className='fw-bold'>Администратор</span>}
                {role === 'MODERATOR' && <span className='fw-bold'>Модератор</span>}
        </Form>
        <Form>
          Статус: {!isBlocked ? <span className='text-success fw-bold'>Активен</span> : <span className='text-danger fw-bold'>Заблокирован</span>}
        </Form>
      </Form>        
      <hr/>
      <div className='d-flex justify-content-center' style={{width: 800}}>
      <Form className='d-flex flex-column align-items-start pb-4'>
        { error && <div className="alert alert-danger m-0 text-center py-2 mb-4" role="alert" style={{width: 270}}>{dataError}</div>}
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
      {currentId === user.id && 
        <>
        <hr/>
        <Form style={{width: 300}} className="align-self-center pt-3 pe-4 mb-3">
            { error && <div className="alert alert-danger m-0 text-center py-2 mb-4" role="alert" style={{width: 270}}>{error}</div>}
            { notification && <div className="alert alert-success m-0 text-center py-2" role="alert" style={{width: 270}}>{notification}</div>}
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
        </>
      }      
      
    </Card>
  </Container>
    
  )
})

export default Profile