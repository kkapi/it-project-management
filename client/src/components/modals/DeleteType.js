import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react'
import { Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Context } from '../..';
import { deleteType, fetchTypes } from '../../http/foodAPI';
import './DeleteType.css'

const DeleteType = observer(({show, onHide}) => { 

  const {food} = useContext(Context)

  const [info, setInfo] = useState([])  

  useEffect(() => {
    fetchTypes().then(data => {
      food.setTypes(data)
      setInfo(food.types)       
    })      
  },[show, onHide])

  const removeInfo = (name) => {
    setInfo(info.filter(i => i.name !== name))
    deleteType({name: name})
    if (info.length === 1) {
      onHide()
    }
  }

  return (
    <Modal   
        show={show}
        onHide={onHide} 
        size="lg"
        centered
        dialogClassName="delete-type-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Удаление типов
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='ps-10'>
        {
          info.map((i, index) =>
            <>
            <Form className="d-flex align-items-center justify-content-center" key={index}>
                  <Form style={{width: 290}} className="mt-1 d-flex align-items-center justify-content-between">
                    <h6 className='superbiba'>{i.name}</h6>                
                    <Button variant={"outline-danger"} className="ps-auto" onClick={() => removeInfo(i.name)}>Удалить</Button>
                  </Form>  
            </Form>
            <hr/>
            </>
          )
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>       
      </Modal.Footer>
    </Modal>
  )
})

export default DeleteType