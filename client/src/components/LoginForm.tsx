import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import '../styles.css'


const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context);

    return (
        <div className='login-page'>
            <div className="form">
                <div className="login-form">
                    <input className='text'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        type="text"
                        placeholder='Email'
                    />
                    <input className='password'
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder='Пароль'
                    />
                    <button onClick={() => store.login(email, password)}>
                        Войти
                    </button>
                    <button onClick={() => store.registration(email, password)}>
                        Регистрация
                    </button>
                    <button className='recovery' onClick={() => store.recovery(email)}>
                        Восстановить пароль
                    </button>
                </div>                
            </div>            
        </div>
    );
};

export default observer(LoginForm);