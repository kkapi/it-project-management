import React, { useContext, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Context } from '../..';
import { createType, fetchTypes } from '../../http/foodAPI';

const CreateType = ({show, onHide}) => {
  const {food} = useContext(Context)

  useEffect(() => {
    fetchTypes().then(data => {
      food.setTypes(data)           
    })      
  },[show, onHide])
  
  const types = []
  
  food.types.map(type => {
    types.push(type.name)
  })

  const [value, setValue] = useState('')
  const [error, setError] = useState(null)

  const addType = () => {
    try {
        if (!value) {
          setError("Введите тип")
        } else if (types.indexOf(value) !== -1) {
          setError(`Тип '${value}' уже существует`)
          setValue('')
        } else {
          createType({name: value}).then(data => setValue(''))
          setError(null)
          onHide() 
          types.push(value)
          food.setTypes(types)
          food.setSelectedType({})          
        }
    } catch (e) {
      setError(e.response.data.message)
    }    
  }

  const hideNull = () => {
    setValue('')
    onHide()
    setError(null)
  }

  return (
    <Modal   
        show={show}
        onHide={hideNull} 
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавление типа
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            { error && <div className="alert alert-danger m-0 mb-3 text-center py-2" role="alert">{error}</div>}
            <Form.Control
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={"Введите название типа"}
            />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={hideNull}>Закрыть</Button>
        <Button variant="outline-success" onClick={addType}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateType