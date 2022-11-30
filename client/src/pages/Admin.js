import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { getAllUser } from "../http/userAPI";
import Table from "react-bootstrap/Table";
import { Button, Container } from "react-bootstrap";

const Admin = () => {
  const { user } = useContext(Context);

  const [info2, setInfo2] = useState([]);

  useEffect(() => {
    getAllUser().then((data) => {
      user.setUsers(data);
      setInfo2(user.users);
    });
  }, []);

  return (
    <Container className="mt-5" style={{width: 1500}}>
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
              {tr.role === 'USER' && <td>Пользователь</td>}
              {tr.role === 'ADMIN' && <td>Администратор</td>}
              {tr.role === 'MODERATOR' && <td>Модератор</td>}
              <td>{!tr.isBlocked ? <span className='text-success fw-bold'>Активен</span> : <span className='text-danger fw-bold'>Заблокирован</span>}</td>
              <td className="d-flex justify-content-center align-items-center" style={{height: 55}}>
                { tr.role !== 'ADMIN' &&
                <>
                  {!tr.isBlocked && <Button variant="danger">Заблокировать</Button>}
                  {tr.isBlocked && <Button variant="danger">Разблокировать</Button>}
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
};

export default Admin;
