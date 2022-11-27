import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { sendRecovery } from "../http/userAPI";

const ForgotPassword = observer(() => {

    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)
    const [notification, setNotification] = useState(null)

    const recover = async () => {
        try {            
            setError(null)
            const data = await sendRecovery(email)            
            if (data) setNotification('Ссылка для восстановления пароля была отправлена на ' + email)
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
            { notification && <div className="alert alert-info m-0 mt-3 text-center py-2" role="alert">{notification}</div>}
          <Form.Control
            className="mt-3"
            placeholder="Введите ваш email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form className="d-flex justify-content-end mt-3">
            <Button className="mt-1" variant="outline-success" onClick={recover}>
              Восстановить пароль
            </Button>
          </Form>
        </Form>
      </Card>
    </Container>
  )
})

export default ForgotPassword;
