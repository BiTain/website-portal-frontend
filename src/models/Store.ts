import BaseResponse from "./BaseResponse";

export interface StoreOwner {
    id: number
    fullName: string
    email: string
    phoneNumber: string
}

export interface StoreResponse extends BaseResponse {
    name: string
    urlStore: string
    owner: StoreOwner
    imageUrls: string[]
}
