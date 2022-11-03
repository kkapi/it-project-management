import {IUser} from "../models/IUsers";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";

export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false; 

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user)
        } catch (e) {            
            alert("Неверный логин или пароль")            
            console.log(e)         
        }
    }

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user)
        } catch (e) {
            alert("Ошибка регистрации")
            console.log(e)
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e) {            
            console.log(e)
        }
    }
 
    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
                    
            console.log(e);
        } finally {
            this.setLoading(false);
        }
    }

    async recovery(email: string) {
        try {
            alert(`Ссылка для восстановления пароля была отправлена на ${email}`)
            const response = await AuthService.passRecovery(email);
            console.log(response)            
        } catch (e) {
            console.log(e)
            alert('Ошибка восстановления пароля')
        }
    }

    async changePass(newPassword: string) {
        try {       
            alert('Пароль был изменен');    
            await AuthService.changePass(newPassword);     
            
        } catch (e) {
            console.log(e)
            alert('Ошибка изменения пароля')
        }
    }

}