import {makeAutoObservable} from "mobx"

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._role = {}
        this._name = {}
        this._address = {}
        this._phone = {}
        this._isBlocked = false
        makeAutoObservable(this)
    }

    setInfo(data) {
        this._name = data.name
        this._address = data.address
        this._phone = data.phone
    }

    setIsBlocked(bool) {
        this._isBlocked = bool
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(user) {
        this._user = user
    }

    setRole(role) {
        this._role = role
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }

    get role() {
        return this._role
    }

    get name() {
        return this._name
    }

    get phone() {
        return this._phone
    }

    get address() {
        return this._address
    }
 }