import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useState } from "react"
import { Button, Dropdown, Form, Modal } from "react-bootstrap"
import { Context } from "../.."
import { deleteFood, fetchFood, fetchTypes, getAllFood } from "../../http/foodAPI"

const DeleteFood = observer(({ show, onHide }) => {
  const { food } = useContext(Context)
  
  const [info, setInfo] = useState([])

  useEffect(() => {    
    fetchTypes().then(data => food.setTypes(data))
    getAllFood().then(data => {
      food.setAllFood(data)
      setInfo(food.allFood)
    })    
  },[show])

  const removeInfo = (name) => {
    setInfo(info.filter(i => i.name !== name))
    deleteFood({name: name})
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
          Удаление карточек с едой
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='ps-10'>
        {
          info.map((i, index) =>
            <>
            <Form className="d-flex align-items-center justify-content-center" key={index}>
                  <Form style={{width: 350}} className="mt-1 mx-3 d-flex align-items-center justify-content-between">
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

export default DeleteFood
