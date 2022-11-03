import React, {FC, useContext, useEffect, useState} from 'react';
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {IUser} from "./models/IUsers";
import UserService from "./services/UserService";

const App: FC = () => {
  const {store} = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);
  const [newPassword, setPassword] = useState<string>('')

  useEffect(() => {
    if (localStorage.getItem('token')) {
        store.checkAuth()
    }
  }, [])

  async function getUsers() {
    try {
        const response = await UserService.fetchUsers();
        setUsers(response.data);
    } catch (e) {
        console.log(e);
    }
}
  
  if (store.isLoading) {
    return <div>Загрузка...</div>
  }

  if (!store.isAuth) {
    return (
        <div>
            <LoginForm/>            
        </div>
    );
}

  return (
    <div>
      <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : 'АВТОРИЗУЙТЕСЬ'}</h1>
      <h1>{store.user.isActivated ? 'Аккаунт подтвержден по почте' : 'ПОДТВЕРДИТЕ АККАУНТ!!!!'}</h1>
      <div>
        <button onClick={() => store.logout()}>Выйти</button>
        {/* <div>
          <button onClick={getUsers}>Получить пользователей</button>
        </div> */}
      </div>
      
      {/* {users.map(user =>
                <div key={user.email}>{user.email}</div>
            )} */}
      <input className='newPassword'
                        onChange={e => setPassword(e.target.value)}
                        value={newPassword}
                        type="password"
                        placeholder='Пароль'
                    />
      <div>
        <button onClick={() => store.changePass(newPassword)}>Изменить пароль</button>
      </div>
    </div>  
    
  );
};

export default observer(App);