import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { resetPassword } from '../http/userAPI'
import { LOGIN_ROUTE } from '../utils/consts'

const RecoveryPassword = observer(() => {

    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [notification, setNotification] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState('')
    const {link} = useParams()
    const navigate = useNavigate()


    const reset = async () => {
        try {            
            if (!password && !confirmPassword) {
                setNotification(null)
                setError("Введите и подтвердите пароль")
            } else if (!password) {
                setNotification(null)
                setError("Введите пароль")
            } else if (!confirmPassword) {
                setNotification(null)
                setError("Подтвердите пароль")
            } else if (password !== confirmPassword) {
                setNotification(null)
                setError("Пароли не совпадают")
            } else if (password === confirmPassword) {
                setError(null)               
                const {message} = await resetPassword(link, password)
                console.log(message)                
                setNotification('Пароль был успешно изменен')                            
                setTimeout(() => {navigate(LOGIN_ROUTE)}, 3000);              
            }                
        } catch (e) {
            setNotification(null)
            setError(e.response.data.message)
        }
    }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">Восстановление пароля</h2>
        <Form className="d-flex flex-column">
            { error && <div className="alert alert-danger m-0 mt-3 text-center py-2" role="alert">{error}</div>}
            { notification && <div className="alert alert-success m-0 mt-3 text-center py-2" role="alert">{notification}</div>}        
          <Form.Control
            className="mt-3"
            placeholder="Введите новый пароль..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={"password"}
          />
          <Form.Control
            className="mt-3"
            placeholder="Подтвердите пароль..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type={"password"}
          />
          <Form className="d-flex justify-content-end mt-3">
            <Button className="mt-1" variant="outline-success" onClick={reset}>
              Изменить пароль
            </Button>
          </Form>
        </Form>
      </Card>
    </Container>
  )
})

export default RecoveryPassword