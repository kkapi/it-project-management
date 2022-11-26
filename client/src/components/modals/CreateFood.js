import React, { useContext, useState } from 'react'
import { Col, Dropdown, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Context } from '../..';

const CreateFood = ({show, onHide}) => {
    const {food} = useContext(Context)
    const [info, setInfo] = useState([])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

  return (
    <Modal   
        show={show}
        onHide={onHide} 
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить еду
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Dropdown>
                <Dropdown.Toggle>Выберете тип</Dropdown.Toggle>
                <Dropdown.Menu>
                    {food.types.map(type =>
                        <Dropdown.Item key={type.id}>{type.name}</Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
            <Form.Control
                className="mt-3"
                placeholder="Введите название еды"            
            />
            <Form.Control
                className="mt-3"
                placeholder="Введите стоимость еды"
                type="number"            
            />
            <Form.Control
                className="mt-3"
                type="file"
            />
            <hr/>
            <Button
                variant={"outline-dark"}
                onClick={addInfo}
            >
                Добавить новую характеристику
            </Button>
            {
                info.map(i =>
                    <Row className="mt-3" key={i.number}>
                        <Col md={4}>
                            <Form.Control
                                placeholder="Введите название характеристики"
                            />
                        </Col>
                        <Col md={4}>
                            <Form.Control
                                placeholder="Введите описание характеристики"
                            />
                        </Col>
                        <Col md={4}>
                            <Button variant={"outline-danger"} onClick={() => removeInfo(i.number)}>Удалить</Button>
                        </Col>
                    </Row>
                )
            }
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success" onClick={onHide}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateFood