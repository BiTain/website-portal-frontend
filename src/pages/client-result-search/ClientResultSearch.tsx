import "./ClientSubProduct.scss"
import { Link, useParams } from "react-router-dom"
import Banner from "../../assets/img/banner.png"
import Pagination from "../../components/Pagination";
import useGetAllApi from "../../hooks/use-get-all-api";
import { ProductResponse } from "../../models/Product";
import ResourceUrl from "../../constants/ResourceUrl";
import PageConfigs from "../PageConfigs";
import { ListResponse } from "../../utils/FetchUtils";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { Filter, FilterCriteria, NumberOperator } from "../../utils/FilterUtils";
import { EntityPropertyType } from "../../types";
import { setActiveFilter, setActivePage, setActivePageSize } from "../../redux/slices/managePageSlice";
import ManagePagination from "../../components/ManagePagination";
import useResetManagePageState from "../../hooks/use-reset-manage-page-state";

type ProductsType = {
    tag: string;
    productImageName: string;
    productName: string;
    productLink: string;
}[];
const products: {
    tag: string,
    productImageName: string,
    productName: string,
    productLink: string
}[] = [
        {
            tag: 'outstanding',
            productImageName: 'product.png',
            productName: 'iPhone 14 Pro Max 128GB',
            productLink: '/'
        },
        {
            tag: 'outstanding',
            productImageName: 'product.png',
            productName: 'iPhone 14 Pro Max 128GB',
            productLink: '/'
        },
        {
            tag: 'outstanding',
            productImageName: 'product.png',
            productName: 'iPhone 14 Pro Max 128GB',
            productLink: '/'
        },
        {
            tag: 'outstanding',
            productImageName: 'product.png',
            productName: 'iPhone 14 Pro Max 128GB',
            productLink: '/'
        },
        {
            tag: 'outstanding',
            productImageName: 'product.png',
            productName: 'iPhone 14 Pro Max 128GB',
            productLink: '/'
        },
        {
            tag: 'default',
            productImageName: 'product.png',
            productName: 'iPhone 14 Pro Max 128GB',
            productLink: '/'
        },
        {
            tag: 'default',
            productImageName: 'product.png',
            productName: 'iPhone 14 Pro Max 128GB',
            productLink: '/'
        },
        {
            tag: 'default',
            productImageName: 'product.png',
            productName: 'iPhone 14 Pro Max 128GB',
            productLink: '/'
        },
        {
            tag: 'default',
            productImageName: 'product.png',
            productName: 'iPhone 14 Pro Max 128GB',
            productLink: '/'
        },
        {
            tag: 'default',
            productImageName: 'product.png',
            productName: 'iPhone 14 Pro Max 128GB',
            productLink: '/'
        },
        {
            tag: 'default',
            productImageName: 'product.png',
            productName: 'iPhone 14 Pro Max 128GB',
            productLink: '/'
        },
        {
            tag: 'default',
            productImageName: 'product.png',
            productName: 'iPhone 14 Pro Max 128GB',
            productLink: '/'
        },
        {
            tag: 'default',
            productImageName: 'product.png',
            productName: 'iPhone 14 Pro Max 128GB',
            productLink: '/'
        },
        {
            tag: 'default',
            productImageName: 'product.png',
            productName: 'iPhone 14 Pro Max 128GB',
            productLink: '/'
        },
        {
            tag: 'default',
            productImageName: 'product.png',
            productName: 'iPhone 14 Pro Max 128GB',
            productLink: '/'
        },
        {
            tag: 'default',
            productImageName: 'product.png',
            productName: 'iPhone 14 Pro Max 128GB',
            productLink: '/'
        },
        {
            tag: 'default',
            productImageName: 'product.png',
            productName: 'iPhone 14 Pro Max 128GB',
            productLink: '/'
        },
        {
            tag: 'default',
            productImageName: 'product.png',
            productName: 'iPhone 14 Pro Max 128GB',
            productLink: '/'
        },
        {
            tag: 'default',
            productImageName: 'product.png',
            productName: 'iPhone 14 Pro Max 128GB',
            productLink: '/'
        },
        {
            tag: 'default',
            productImageName: 'product.png',
            productName: 'iPhone 14 Pro Max 128GB',
            productLink: '/'
        },
        {
            tag: 'default',
            productImageName: 'product.png',
            productName: 'iPhone 14 Pro Max 128GB',
            productLink: '/'
        },
        {
            tag: 'default',
            productImageName: 'product.png',
            productName: 'iPhone 14 Pro Max 128GB',
            productLink: '/'
        },
        {
            tag: 'default',
            productImageName: 'product.png',
            productName: 'iPhone 14 Pro Max 128GB',
            productLink: '/'
        },
        {
            tag: 'default',
            productImageName: 'product.png',
            productName: 'iPhone 14 Pro Max 128GB',
            productLink: '/'
        }
    ]
let outstandingProducts: ProductsType = [];
products.forEach((value) => {
    if (value.tag === 'outstanding') {
        outstandingProducts.push(value);
    }
})
export default function ClientResultSearch() {

    // const { id } = useParams()

    const search = useAppSelector(state => state.managePage.searchToken)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setActivePageSize(8))
        dispatch(setActiveFilter(null))
        dispatch(setActivePage(1))
    }, [search])
    const {
        isLoading,
        data: listResponse = PageConfigs.initListResponse as ListResponse<ProductResponse>
    } = useGetAllApi<ProductResponse>(ResourceUrl.PRODUCT, "products")

    return (
        <div className="wrapper-client-sub-product">
            <main className="client-sub-product">
                <img src={Banner} alt="" className="client-sub-product-banner" />
                {/*<div className="outstanding-products">*/}
                {/*    <h2 className="outstanding-products-title">SẢN PHẨM NỔI BẬT</h2>*/}
                {/*    <div className="list-outstanding-product">*/}
                {/*        {outstandingProducts.map((value) => {                            */}
                {/*            return <Link to={`/detail-product`} className="outstanding-product-item">*/}
                {/*                <img src={require(`../../assets/img/${value.productImageName}`)} alt="" className="outstanding-product-img" />*/}
                {/*                <span className="outstanding-product-name">{value.productName}</span>*/}
                {/*            </Link>*/}
                {/*        })}*/}
                {/*    </div>*/}
                {/*</div>                */}
                <div className="all-products">
                    {isLoading ? <div>Đang tải</div> : <>
                        {listResponse.content.length > 0 && <h2 className="all-products-title text-uppercase">TẤT CẢ SẢN
                            PHẨM</h2>}

                        {listResponse.content.length === 0 &&
                            <h2 className="all-products-title text-uppercase">Không tìm thấy sản phẩm</h2>}
                        <div className="list-all-product">
                            {listResponse.content.map((value) => {
                                return <Link to={`/detail-product/${value.id}`} className="all-product-item">
                                    {/* <img src={require(`../../assets/img/${value.productImageName}`)} alt=""
                                     className="all-product-img"/>*/}
                                    <img src={value.productImages[0]} alt=""
                                        className="all-product-img" />
                                    <span className="all-product-name">{value.name}</span>
                                </Link>
                            })}
                        </div>
                        {/*<Pagination/>*/}
                        <div className='d-flex justify-content-center'>
                            <ManagePagination listResponse={listResponse} />
                        </div>
                    </>}
                </div>

            </main>
        </div>
    )
}