import React, {FC, useContext, useEffect, useState} from 'react';
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {IUser} from "./models/IUsers";
import UserService from "./services/UserService";
import './styles/App.css'

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
      <div className="container">
        <h1>It Project Management</h1>
        <h2>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : 'АВТОРИЗУЙТЕСЬ'}</h2>
        <h2 className='appr'>{store.user.isActivated ? 'Аккаунт подтвержден по почте' : 'ПОДТВЕРДИТЕ АККАУНТ!!!!'}</h2>      
        
        <h2>Изменение пароля</h2>
        <input className='newPassword'
                          onChange={e => setPassword(e.target.value)}
                          value={newPassword}
                          type="password"
                          placeholder='Новый пароль'
                      />
        <div>
          <button className='changeb' onClick={() => store.changePass(newPassword)}>Изменить пароль</button>
        </div>
        <h2>Выход</h2>
        <div>
          <button className='logoutb' onClick={() => store.logout()}>Выйти</button>        
        </div>     
      </div>       
    </div>    
  );
};

export default observer(App);