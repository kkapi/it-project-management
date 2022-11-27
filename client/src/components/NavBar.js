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

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        user.setRole({})
        localStorage.removeItem("token");
    }

    function drawNavbar(user) {
      if (user.isAuth) {
        if (user.role === 'MODERATOR') {
          return (
            <Navbar bg="dark" variant="dark" className='py-3 fs-5'>
              <Container>
                <NavLink style={{color: 'white'}} to={SHOP_ROUTE} className="text-decoration-none">EtuFood</NavLink>
                    <Nav className="ml-auto">
                      <Button variant="outline-light" onClick={() => navigate(MODERATOR_ROUTE)}>Панель модератора</Button>
                      <Button variant="outline-light" className="ms-2" onClick={() => logOut()}>Выйти</Button>            
                    </Nav>
              </Container>
            </Navbar>
          )
        } else if (user.role === 'ADMIN') {
          return (
            <Navbar bg="dark" variant="dark" className='py-3 fs-5'>
              <Container>
                <NavLink style={{color: 'white'}} to={SHOP_ROUTE} className="text-decoration-none">EtuFood</NavLink>
                    <Nav className="ml-auto">
                      <Button variant="outline-light" onClick={() => navigate(MODERATOR_ROUTE)}>Панель модератора</Button>
                      <Button variant="outline-light" className="ms-2" onClick={() => logOut()}>Выйти</Button>            
                    </Nav>
              </Container>
            </Navbar>
          )
        } else {
          return (
            <Navbar bg="dark" variant="dark" className='py-3 fs-5'>
              <Container>
                <NavLink style={{color: 'white'}} to={SHOP_ROUTE} className="text-decoration-none">EtuFood</NavLink>
                    <Nav className="ml-auto">                      
                      <Button variant="outline-light" className="ms-2" onClick={() => logOut()}>Выйти</Button>            
                    </Nav>
              </Container>
            </Navbar>
          )
        }        
      } else {
        return (
          <Navbar bg="dark" variant="dark" className='py-3 fs-5'>
            <Container>
              <NavLink style={{color: 'white'}} to={SHOP_ROUTE} className="text-decoration-none">EtuFood</NavLink>                  
            </Container>
          </Navbar>
        )
      }
    }

    return drawNavbar(user)
})

export default NavBar