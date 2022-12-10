import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { changeUserRole, changeUserStatus, getAllUser } from "../http/userAPI";
import Table from "react-bootstrap/Table";
import { Button, Card, Container, Dropdown } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { PROFILE_ROUTE } from "../utils/consts";

const AdminUsers = observer(() => {
  const { user } = useContext(Context)

  const [update, setUpdate] = useState(false)
  const [users, setUsers] = useState([])

  const navigate = useNavigate()

  const changeStatus = (id, isBlocked) => {
    changeUserStatus(id, isBlocked).then(data => setUpdate(!update))    
  }

  const changeRole = (id, role, newRole) => { 
    if (role !== newRole) {
      changeUserRole(id, newRole).then(data => setUpdate(!update))
    }    
  }

  useEffect(() => {
    getUsers()
  }, [update]);

  const getUsers = async () => {
    const data = await getAllUser()
    console.log(data)
    setUsers(data)
  }

  return (
    <Container className="mt-4" style={{width: 1500}}>
      <h1 className="mb-4 mt-0">Пользователи</h1>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th># id</th>
          <th>ФИО</th>
          <th>@ email</th>
          <th>Телефон</th>
          <th>Адрес</th>
          <th>Роль</th>
          <th>Статус</th>
          <th>Управление</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map(tr => 
            <tr key={tr.id}>
              <td style={{cursor:'pointer'}} onClick={() => navigate(PROFILE_ROUTE + '/' + tr.id)}>{tr.id}</td>
              <td style={{cursor:'pointer'}} onClick={() => navigate(PROFILE_ROUTE + '/' + tr.id)}>{tr.user_info.name || "Не заполнено"}</td>
              <td style={{cursor:'pointer'}} onClick={() => navigate(PROFILE_ROUTE + '/' + tr.id)}>{tr.email}</td>
              <td style={{cursor:'pointer'}} onClick={() => navigate(PROFILE_ROUTE + '/' + tr.id)}>{tr.user_info.phone || "Не заполнено"}</td>
              <td style={{cursor:'pointer'}} onClick={() => navigate(PROFILE_ROUTE + '/' + tr.id)}>{tr.user_info.address || "Не заполнено"}</td>
              <td>
                { tr.id !== user.id ?
                <div className="d-flex justify-content-center px-2">
                  <Card 
                    className="px-3"
                    border={tr.role === "USER" ? 'primary' : 'dark'}
                    text={tr.role === "USER" ? 'primary' : 'dark'}
                    style={{cursor:'pointer'}}
                    onClick={() => changeRole(tr.id, tr.role, 'USER')}
                  >П</Card>
                  <Card 
                    className="px-3 ms-3"
                    border={tr.role === "MODERATOR" ? 'primary' : 'dark'}
                    text={tr.role === "MODERATOR" ? 'primary' : 'dark'}
                    style={{cursor:'pointer'}}
                    onClick={() => changeRole(tr.id, tr.role, 'MODERATOR')}
                  >М</Card>                  
                  <Card
                    className="px-3 ms-3"
                    border={tr.role === "ADMIN" ? 'primary' : 'dark'}
                    text={tr.role === "ADMIN" ? 'primary' : 'dark'}
                    style={{cursor:'pointer'}} 
                    onClick={() => changeRole(tr.id, tr.role, 'ADMIN')}
                  >А</Card>
                  
                </div>
                  :
                  <div className="text-center">Администратор</div>
                }              
                
              </td>
              
              <td>{!tr.isBlocked ? <span className='text-success fw-bold'>Активен</span> : <span className='text-danger fw-bold'>Заблокирован</span>}</td>
              <td className="d-flex justify-content-center align-items-center" style={{height: 55}}>
                { tr.id !== user.id &&
                <>
                  {!tr.isBlocked && <Button variant="outline-danger" onClick={() => changeStatus(tr.id, true)}>Заблокировать</Button>}
                  {tr.isBlocked && <Button variant="outline-success" onClick={() => changeStatus(tr.id, false)}>Разблокировать</Button>}
                </>
                }                   
              </td>
            </tr>
          )
        }
      </tbody>
    </Table>
    </Container>
  );
});

export default AdminUsers;
