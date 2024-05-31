import BaseResponse from "./BaseResponse";
import {StoreResponse} from "./Store";

export interface ProductResponse extends BaseResponse {
    name: string
    price: string
    slug: string
    category: string
    storeOwner: StoreResponse
    productUrls: string[]
    productImages: string[]
    categoryId: number
}

export interface ProductRequest {
    name: string
    price: number
    categoryId?: number
    productUrl: string
    productImages: string[]
    userId: number
    oldImage?: string[]
}