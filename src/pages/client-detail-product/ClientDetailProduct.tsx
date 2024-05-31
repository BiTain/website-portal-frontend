import { Link, useParams } from "react-router-dom"
import "./ClientDetailProduct.scss"
import useGetByIdApi from "../../hooks/use-get-by-id-api";
import { ProductResponse } from "../../models/Product";
import ResourceUrl from "../../constants/ResourceUrl";
import { useState } from "react";

const detailProducts: {
    productName: string,
    productImage: string,
    productWebsite: {
        productWebsiteName: string,
        productWebsiteLink: string
    }[],
    productRelative: {
        productRelativeName: string,
        productRelativeLink: string
    }[]
} = {
    productName: 'iPhone 14 Pro Max 128GB',
    productImage: 'product.png',
    productWebsite: [
        {
            productWebsiteName: 'FPTShop',
            productWebsiteLink: 'https://fptshop.com.vn/dien-thoai/iphone-14-pro-max'
        },
        {
            productWebsiteName: 'Thegioididong',
            productWebsiteLink: 'https://www.thegioididong.com/dtdd/iphone-14-pro-max-256gb'
        },
        {
            productWebsiteName: 'CellphoneS',
            productWebsiteLink: 'https://cellphones.com.vn/iphone-14-pro-max-256gb.html'
        },
        {
            productWebsiteName: 'Viettel Store',
            productWebsiteLink: 'https://viettelstore.vn/dien-thoai/iphone-14-pro-max-256gb-pid293827.html'
        }
    ],
    productRelative: [
        {
            productRelativeName: 'Củ sạc Apple Power Adapter 20W Type-C',
            productRelativeLink: 'https://fptshop.com.vn/dien-thoai/iphone-14-pro-max'
        },
        {
            productRelativeName: 'Ốp lưng iPhone 14 Pro Max Silicone Case with MagSafe',
            productRelativeLink: 'https://www.thegioididong.com/dtdd/iphone-14-pro-max-256gb'
        },
        {
            productRelativeName: 'Tai nghe AirPods Pro 2022',
            productRelativeLink: 'https://cellphones.com.vn/iphone-14-pro-max-256gb.html'
        },
        {
            productRelativeName: 'Dây sạc Apple MagSafe Charger to USB-C Cable 1m',
            productRelativeLink: 'https://viettelstore.vn/dien-thoai/iphone-14-pro-max-256gb-pid293827.html'
        }
    ]
}
export default function ClientDetailProduct() {
    const [product, setProduct] = useState<ProductResponse | null>(null)

    const { id } = useParams()



    const { isLoading } =
        useGetByIdApi<ProductResponse>(
            ResourceUrl.PRODUCT,
            "products",
            Number(id),
            (productRes) => {
                setProduct(productRes)
            }
        )

    return (
        <div className="wrapper-client-detail-product">
            <main className="client-detail-product">
                <div className="product-info">
                    {/*<img src={require(`../../assets/img/${detailProducts.productImage}`)} alt=""*/}
                    {/*     className="product-img"/>*/}
                    <div className='d-flex align-items-center gap-3'>
                        {product?.productImages.map((item, index) => <img key={index}
                            src={item} alt=""
                            className="product-img" />)}
                    </div>
                    <div className="product-website">
                        <div className="product-website-list">
                            <h2 className="product-name">{product?.name}</h2>
                            {product?.productUrls.map((value) => {
                                return <div className="product-website-item">
                                    <span className="product-website-name">Cửa hàng: <span style={{ fontWeight: 'normal' }}>{product?.storeOwner.name}</span></span>
                                    <span className="product-website-link">Link sản phẩm: { }
                                        <Link target="_blank" to={value}
                                            className="">{value}</Link></span>
                                    <span className="product-price">Giá sản phẩm: <span style={{ fontWeight: 'normal' }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(+product.price)}</span></span>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
                <div className="product-relative">
                    <h3 className="product-relative-title">CÁC MẶT HÀNG LIÊN QUAN</h3>
                    <div className="product-relative-list">
                        {detailProducts.productRelative.map((value) => {
                            return <div className="product-relative-item">
                                <span className="product-relative-name">{value.productRelativeName}: </span>
                                <Link target="_blank" to={value.productRelativeLink}
                                    className="product-relative-link">{value.productRelativeLink}</Link>
                            </div>
                        })}
                    </div>
                </div>
            </main>
        </div>
    )
}