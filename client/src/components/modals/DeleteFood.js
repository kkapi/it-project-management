import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useState } from "react"
import { Button, Form, Image, Modal } from "react-bootstrap"
import { Context } from "../.."
import { deleteFood, fetchTypes, getAllFood } from "../../http/foodAPI"
import './DeleteFood.css'

const DeleteFood = observer(({ show, onHide }) => {
  const { food } = useContext(Context)
  
  const [info, setInfo] = useState([])

  useEffect(() => {    
    fetchTypes().then(data => food.setTypes(data))
    getAllFood().then(data => {
      food.setAllFood(data)
      setInfo(food.allFood)
    })    
  },[show, onHide])

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
        dialogClassName="delete-food-modal"
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
              <Form  className="mx-5 m-0 d-flex align-items-center justify-content-between" key={index}>
                <Image width={50} height={50} src={process.env.REACT_APP_API_URL + i.img} className="rounded"/>
                <h6>{i.name}</h6>
                <h6>{i.price} руб</h6>                
                <Button variant={"outline-danger"} className="ps-auto" onClick={() => removeInfo(i.name)}>Удалить</Button>
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
