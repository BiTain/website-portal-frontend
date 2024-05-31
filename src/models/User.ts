import BaseResponse from "./BaseResponse";

export interface UserResponse extends BaseResponse {
    fullName: string
    email: string
    username: string
    phoneNumber:string
    avatar: string
    enabled: boolean
    role: string
}

export interface UserRequest {
    password: string
    fullName: string
    email: string
    username: string
    phoneNumber:string
}


export interface SellerRequest {
    fullName: string
    email: string
    phoneNumber: string
    storeName: string
    urlStore: string
    avatar: string
    storeImages: string[]
}