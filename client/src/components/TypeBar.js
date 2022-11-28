import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '..'
import { Card, Form } from 'react-bootstrap';

const TypeBar = observer(() => {
    const {food} = useContext(Context)
  return (
    <Form className="d-flex flex-wrap pt-3">
        {food.types.map(type =>
            <Card
                key={type.id}
                className="p-3 m-1"
                onClick={type.id === food.selectedType.id ? () => food.setSelectedType({}) : () => food.setSelectedType(type)}
                border={type.id === food.selectedType.id ? 'primary' : 'light'}
                text={type.id === food.selectedType.id ? 'primary' : 'dark'}
                style={{cursor:'pointer'}}                
            >
                <Card.Text>
                    {type.name}
                </Card.Text>                
            </Card>
        )}
    </Form>    
  )
})

export default TypeBar