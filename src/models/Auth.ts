import {UserResponse} from "./User";

export interface LoginRequest {
    username: string
    password: string
}

export interface LoginResponse {
    user: UserResponse
    message: string
    accessToken: string
    refreshToken: string
    createdDate: string
    tokenType: string
}