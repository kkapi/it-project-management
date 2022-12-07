import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getAllOrders } from '../http/foodAPI'
import { getAllUser } from '../http/userAPI'
import { ORDER_ROUTE } from '../utils/consts'

const AdminOrders = () => {

    const [orders, setOrders] = useState([])

    const navigate = useNavigate()

useEffect(() => {
    console.log("EFFF")
    getUsers()
    
}, [])

    const getUsers = async () => {
        const data = await getAllOrders()
        console.log(data)
        setOrders(data)
    }

  return (
    <Container className="mt-4">
        <h1 className="mb-4 mt-0">Заказы</h1>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th># id</th>
                    <th>Cтатус</th>
                    <th>ФИО</th>
                    <th>Телефон</th>
                    <th>Адрес доставки</th>
                    <th>Дата</th>
                    <th>Время</th>
                    <th>Доставка к</th>
                    <th>Сумма</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order =>
                    <tr key={order.id} style={{cursor:'pointer'}} onClick={() => navigate(ORDER_ROUTE + '/' + order.id)}>
                        <td>{order.id}</td>
                        <td>{order.status}</td>
                        <td>{order.name}</td>
                        <td>{order.phone}</td>
                        <td>{order.address}</td>
                        <td>{order.date}</td>
                        <td>{order.registration_time}</td>
                        <td>{order.wish_time}</td>
                        <td>{order.sum} руб</td>
                    </tr>
                )}
                
            </tbody>
        </Table>
    </Container>
  )
}

export default AdminOrders