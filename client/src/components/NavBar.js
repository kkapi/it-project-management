import React, { useContext } from 'react'
import { Context } from '..'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE, MODERATOR_ROUTE, SHOP_ROUTE } from '../utils/consts';
import {Button} from 'react-bootstrap'
import {observer} from 'mobx-react-lite'
import { useNavigate } from "react-router-dom"


const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

  return (
    <Navbar bg="dark" variant="dark">
    <Container>
      <NavLink style={{color: 'white'}} to={SHOP_ROUTE} className="text-decoration-none">EtuFood</NavLink>
      {user.isAuth ?
            <Nav className="ml-auto">
            <Button variant="outline-light" onClick={() => navigate(MODERATOR_ROUTE)}>Панель модератора</Button>
            <Button variant="outline-light" className="ms-2" onClick={() => navigate(LOGIN_ROUTE)}>Выйти</Button>            
          </Nav>
          :
          <Nav className="ml-auto">
            <Button variant={"outline-light"} onClick={() => user.setIsAuth(true)}>Авторизация</Button>            
          </Nav>
          }
    </Container>
  </Navbar>
  )
})

export default NavBar