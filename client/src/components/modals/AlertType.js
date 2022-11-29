import { observer } from "mobx-react-lite"
import React from "react"
import { Button, Modal } from "react-bootstrap"

const AlertType = observer(({ show, onHide }) => {

  return (
    <Modal   
        show={show}
        onHide={onHide}      
        size="sm"
        centered
        dialogClassName="delete-food-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Внимание!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='ps-10'>
        Сначала создайте тип
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={onHide}>Понятно</Button>       
      </Modal.Footer>
    </Modal>
  )
})

export default AlertType
