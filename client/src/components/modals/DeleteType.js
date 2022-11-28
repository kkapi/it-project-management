import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react'
import { Dropdown } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Context } from '../..';
import { deleteType } from '../../http/foodAPI';

const DeleteType = observer(({show, onHide}) => {
  const {food} = useContext(Context)

  const [error, setError] = useState(null)

  const hideNull = () => {
    onHide()
    setError(null)
    food.setSelectedType({})
  }

  const  delType = () => {
    try {
        if (!food.selectedType.name) {
            setError("Выберете тип для удаления")
        } else {        
            deleteType({name: food.selectedType.name})
            hideNull()
        }
    } catch (e) {
      setError(e.response.data.message)
    }    
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
          Удаление типов
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { error && <div className="alert alert-danger m-0 mb-3 text-center py-2" role="alert">{error}</div>}
        <Dropdown>
            <Dropdown.Toggle>{food.selectedType.name || "Выберете тип"}</Dropdown.Toggle>
            <Dropdown.Menu>
                {food.types.map(type =>
                    <Dropdown.Item onClick={() => food.setSelectedType(type)} key={type.id}>{type.name}</Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={hideNull}>Закрыть</Button>
        <Button variant="outline-danger" onClick={delType}>Удалить</Button>
      </Modal.Footer>
    </Modal>
  )
})

export default DeleteType