import $api from "../http/index";
import {AxiosResponse} from 'axios'
import { AuthResponse } from "../models/response/AuthResponse";
import { IUser } from "../models/IUsers";

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users')
    }
}