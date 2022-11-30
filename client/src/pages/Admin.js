import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { changeUserStatus, getAllUser } from "../http/userAPI";
import Table from "react-bootstrap/Table";
import { Button, Container, Dropdown } from "react-bootstrap";
import { observer } from "mobx-react-lite";

const Admin = observer(() => {
  const { user } = useContext(Context)

  const [info2, setInfo2] = useState([])
  const [update, setUpdate] = useState(false)

  const changeStatus = (id, isBlocked) => {
    changeUserStatus(id, isBlocked).then(data => setUpdate(!update))    
  }

  useEffect(() => {
    getAllUser().then((data) => {
      user.setUsers(data);
      setInfo2(user.users);
    });
  }, [update]);

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
          info2.map(tr => 
            <tr key={tr.id}>
              <td >{tr.id}</td>
              <td>{tr.user_info.name || "Не заполнено"}</td>
              <td>{tr.email}</td>
              <td>{tr.user_info.phone || "Не заполнено"}</td>
              <td>{tr.user_info.address || "Не заполнено"}</td>
              <td>
                { tr.role !== 'ADMIN' ?
                <>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary">
                      {tr.role === 'USER' && <>Пользователь</>}
                      {tr.role === 'ADMIN' && <>Администратор</>}
                      {tr.role === 'MODERATOR' && <>Модератор</>}
                    </Dropdown.Toggle>
                    <Dropdown.Menu onChange={console.log("Hello")}>
                      <Dropdown.Item>Администратор</Dropdown.Item>
                      {tr.role === 'USER' ?                       
                        <Dropdown.Item>Модератор</Dropdown.Item>
                          :
                        <Dropdown.Item>Пользователь</Dropdown.Item>            
                      }                   
                                     
                    </Dropdown.Menu>
                  </Dropdown>
                </>
                  :
                  <>Администратор</>
                }              
                
              </td>
              
              <td>{!tr.isBlocked ? <span className='text-success fw-bold'>Активен</span> : <span className='text-danger fw-bold'>Заблокирован</span>}</td>
              <td className="d-flex justify-content-center align-items-center" style={{height: 55}}>
                { tr.role !== 'ADMIN' &&
                <>
                  {!tr.isBlocked && <Button variant="danger" onClick={() => changeStatus(tr.id, true)}>Заблокировать</Button>}
                  {tr.isBlocked && <Button variant="success" onClick={() => changeStatus(tr.id, false)}>Разблокировать</Button>}
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

export default Admin;
