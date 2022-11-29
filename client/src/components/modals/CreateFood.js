import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react'
import { Col, Dropdown, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Context } from '../..';
import { createFood, fetchFood, fetchTypes } from '../../http/foodAPI';

const CreateFood = observer(({show, onHide}) => {
    const {food} = useContext(Context)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [file, setFile] = useState(null)    
    const [info, setInfo] = useState([])
    const [error, setError] = useState(null)    

    useEffect(() => {
        food.setSelectedType({})
        fetchTypes().then(data => food.setTypes(data))
        fetchFood().then(data => food.setFoods(data.rows))
    },[show, onHide])

    const hideNull = () => {        
        setError(null)
        food.setSelectedType({})  
        onHide()
        setName('')
        setDescription('')
        setPrice('')
        setFile(null)
        setInfo([])               
    }    

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])        
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const hasDuplicates = (array) => {
        return (new Set(array)).size !== array.length;
    }

    const addFood = () => {
        const formData = new FormData()

        try {
            let infoFlag = false;
            info.map(item => {
                if (!item.title || !item.description) {
                    infoFlag = true 
                }
            })

            let nameFlag = false;
            food.foods.map(item => {
                if (item.name === name) {
                    nameFlag = true
                }
            })

            const types = []
    
            info.map(item =>
                types.push(item.title)
            )

            if (!food.selectedType.id) {
                setError("Выберете тип")
            } else if (!name) {
                setError("Введите название")
            } else if (nameFlag) {
                setError("Еда с таким названием уже существует")
                setName('')
            } else if (!description) {
                setError("Добавьте описание")
            }else if (!price) {
                setError("Введите цену")
            } else if (price[0] === '0' || Number(price) < 0) {
                setError("Цена должна быть больше одного рубля")
            } else if (!file) {
                setError("Выберете файл")
            } else if (file.type !== 'image/jpeg') {
                setError("Выберете файл c расширением .jpg")
                setFile(null)
            } else if (infoFlag) {
                setError("Заполните информацию о характеристиках")
            } else if (hasDuplicates(types)) {
                setError("У еды не может быть несколько характеристик с одинаковыми названиями")
            } else {
                formData.append('name', name)
                formData.append('description', description)
                formData.append('price', `${(price)}`)
                formData.append('img', file)        
                formData.append('typeId', food.selectedType.id)
                formData.append('info', JSON.stringify(info))
                createFood(formData).then(data => hideNull())
            }        
        } catch (e) {
            console.log(e.response.data.message)
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
          Добавление карточки с едой
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            { error && <div className="alert alert-danger m-0 mb-3 text-center py-2" role="alert">{error}</div>}
            <Dropdown>
                <Dropdown.Toggle>{food.selectedType.name || "Выберете тип"}</Dropdown.Toggle>
                <Dropdown.Menu>
                    {food.types.map(type =>
                        <Dropdown.Item onClick={() => food.setSelectedType(type)} key={type.id}>{type.name}</Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
            <Form.Control
                value={name}
                onChange={e => setName(e.target.value)}
                className="mt-3"
                placeholder="Введите название еды"            
            />
            <Form.Control
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="mt-3"
                placeholder="Введите описание еды"            
            />
            <Form.Control
                value={price}
                onChange={e => setPrice(e.target.value)}
                className="mt-3"
                placeholder="Введите цену"
                type="number"             
            />
            <Form.Control
                className="mt-3"
                type="file"                 
                onChange={selectFile}
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
                                value={i.title}
                                onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                placeholder="Введите название характеристики"
                            />
                        </Col>
                        <Col md={4}>
                            <Form.Control
                                value={i.description}
                                onChange={(e) => changeInfo('description', e.target.value, i.number)}
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
        <Button variant="outline-success" onClick={addFood}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  )
})

export default CreateFood