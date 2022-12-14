import React, { useContext, useEffect, useState } from 'react'
import { Context } from '..'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { ADMIN_ROUTE, BASKET_ROUTE, MODERATOR_ROUTE, ORDERS_ROUTE, PROFILE_ROUTE, SHOP_ROUTE } from '../utils/consts';
import {Button} from 'react-bootstrap'
import {observer} from 'mobx-react-lite'
import { useNavigate } from "react-router-dom"


const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        user.setRole({})
        user.setName('')
        user.setAddress({})
        user.setPhone({})
        localStorage.removeItem("token");
    }

    return (      
      <Navbar bg="dark" variant="dark" className='py-3'>
        <Container>
          <NavLink style={{color: 'white'}} to={SHOP_ROUTE} className="text-decoration-none fs-5 me-3">EtuFood</NavLink>
          
          {user.isAuth &&
            <Nav className="fs-6 me-auto">          
              {/* <Nav.Link className='ms-5' onClick={() => navigate(PROFILE_ROUTE + '/' + user.id)}>Профиль</Nav.Link> */}
              <Nav.Link className='ms-5' onClick={() => navigate(BASKET_ROUTE)}>Корзина</Nav.Link>  
              <Nav.Link className='ms-5' onClick={() => navigate(ORDERS_ROUTE)}>Заказы</Nav.Link>         
            </Nav>                            
          }           
              
          <Nav className="ml-auto">
            {user.isAuth && <Nav.Link className='me-2' onClick={() => navigate(PROFILE_ROUTE + '/' + user.id)}>{user.name || user.email} 
              {user.role === 'USER' && <span> (Пользователь)</span>}
              {user.role === 'MODERATOR' && <span> (Модератор)</span>}
              {user.role === 'ADMIN' && <span> (Администратор)</span>}
            </Nav.Link>}                    
            {user.role === 'MODERATOR' && <Button variant="outline-light" onClick={() => navigate(MODERATOR_ROUTE)}>Панель модератора</Button>}
            {user.role === 'ADMIN' && <Button variant="outline-light" onClick={() => navigate(ADMIN_ROUTE)}>Админ панель</Button>}
            {user.isAuth && <Button variant="outline-light" className="ms-3" onClick={() => logOut()}>Выйти</Button>}         
          </Nav>
        </Container>
      </Navbar>  
    )
})

export default NavBar