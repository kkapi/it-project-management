import React from 'react'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { deleteFood } from '../../http/foodAPI';
import { SHOP_ROUTE } from '../../utils/consts';


const ConfirmDeleteFood = ({show, onHide, name}) => {

    const navigate = useNavigate()
    
    const  delFood = () => {
        try {             
            deleteFood({name: name})
            onHide()
            navigate(SHOP_ROUTE)
        } catch (e) {
            console.log(e)
        }    
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
          Удаление карточки с едой
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            Вы действительно хотие удалить карточку "{name}"?  
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Отмена</Button>
        <Button variant="outline-danger" onClick={delFood}>Удалить</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmDeleteFood