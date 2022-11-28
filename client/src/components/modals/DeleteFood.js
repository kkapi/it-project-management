import { observer } from "mobx-react-lite"
import React, { useContext, useState } from "react"
import { Button, Dropdown, Modal } from "react-bootstrap"
import { Context } from "../.."
import { deleteFood } from "../../http/foodAPI"

const DeleteFood = observer(({ show, onHide }) => {
  const { food } = useContext(Context)

  const [error, setError] = useState(null)
  const [selectedFood, setSelectedFood] = useState(null)

  const hideNull = () => {
    onHide()
    setError(null)
    setSelectedFood(null)
  }

  const  delFood = () => {
    try {
        if (!selectedFood) {
            setError("Выберете еду для удаления")
        } else {        
            deleteFood({name: selectedFood})
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
          Удаление карточек с едой
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { error && <div className="alert alert-danger m-0 mb-3 text-center py-2" role="alert">{error}</div>}
        <Dropdown>
            <Dropdown.Toggle>{selectedFood || "Выберете еду"}</Dropdown.Toggle>
            <Dropdown.Menu>
                {food.foods.map(item =>
                    <Dropdown.Item onClick={() => setSelectedFood(item.name)} key={item.id}>{item.name}</Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={hideNull}>Закрыть</Button>
        <Button variant="outline-danger" onClick={delFood}>Удалить</Button>
      </Modal.Footer>
    </Modal>  
  )
})

export default DeleteFood
