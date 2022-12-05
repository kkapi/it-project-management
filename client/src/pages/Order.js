import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const Order = observer(() => {

const {id} = useParams()

useEffect(() => {
    
    
    
  },[])

    return (
        <Container className='pt-4'>
            <h1>Заказ {id}</h1>
        </Container>
    )
})

export default Order