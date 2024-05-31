import { IoSearch } from "react-icons/io5"
import "./SellerProductManage.scss"
import { FaPlus } from "react-icons/fa"
import { Link } from "react-router-dom"
import useResetManagePageState from "../../hooks/use-reset-manage-page-state";
import useGetAllApi from "../../hooks/use-get-all-api";
import SellerPMConfigs from "./SellerPMConfigs";
import PageConfigs from "../PageConfigs";
import { ListResponse } from "../../utils/FetchUtils";
import { ProductResponse } from "../../models/Product";
import ManageTable from "../../components/ManageTable";
import ManagePagination from "../../components/ManagePagination";
import { Image, TableProps } from "antd";
import { StoreResponse } from "../../models/Store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setActiveFilter, setFilters } from "../../redux/slices/managePageSlice";
import { useEffect } from "react";
import { Filter, FilterCriteria, FilterOperator, NumberOperator, SortCriteria } from "../../utils/FilterUtils";
import { EntityPropertyType } from "../../types";
import { formatPriceVND } from "../../utils/FormatPriceUtils";

const productData: {
    prodId: number,
    imgName: string,
    prodName: string,
    postDate: string,
    category: string
}[] = [
        {
            prodId: 1,
            imgName: 'product.png',
            prodName: 'iPhone 14 Pro Max 128GB',
            postDate: '02/02/2024',
            category: 'Điện thoại di động'
        },
        {
            prodId: 2,
            imgName: 'product.png',
            prodName: 'iPhone 14 Pro Max 128GB',
            postDate: '02/02/2024',
            category: 'Điện thoại di động'
        },
        {
            prodId: 3,
            imgName: 'product.png',
            prodName: 'iPhone 14 Pro Max 128GB',
            postDate: '02/02/2024',
            category: 'Điện thoại di động'
        },
        {
            prodId: 4,
            imgName: 'product.png',
            prodName: 'iPhone 14 Pro Max 128GB',
            postDate: '02/02/2024',
            category: 'Điện thoại di động'
        },
        {
            prodId: 5,
            imgName: 'product.png',
            prodName: 'iPhone 14 Pro Max 128GB',
            postDate: '02/02/2024',
            category: 'Điện thoại di động'
        }
    ]
export default function SellerProductManage() {
    useResetManagePageState()

    const { user } = useAppSelector(state => state.auth)


    const dispatch = useAppDispatch();

    useEffect(() => {

        const filterCriteria: FilterCriteria = {
            property: 'createdBy',
            type: EntityPropertyType.NUMBER,
            operator: NumberOperator.EQUALS,
            value: `${user ? user.id : 1}`
        }

        const filter: Filter = {
            // id: `1`,
            // createdAt: `adw`,
            // updatedAt: `waad`,
            // createdBy: 1,
            // updatedBy: 1,
            // name: `name`,
            sortCriteriaList: [],
            filterCriteriaList: [filterCriteria],
        }

        dispatch(setActiveFilter(filter))
    }, [])

    const {
        isLoading,
        data: listResponse = PageConfigs.initListResponse as ListResponse<ProductResponse>
    } = useGetAllApi<ProductResponse>(SellerPMConfigs.resourceUrl, SellerPMConfigs.resourceKey)


    const entityDetailsTableRowsFragment: TableProps<ProductResponse>['columns'] = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Image
                    width={40}
                    height={40}
                    style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
                    src={record.productImages[0]}
                />
                <span>{record.name}</span>
            </div>
        },
        {
            title: 'Thể loại',
            dataIndex: 'category',
            key: 'category'
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: value => <strong>{formatPriceVND(value)}</strong>
        },
        {
            title: 'Cửa hàng',
            dataIndex: 'storeOwner',
            render: (value: StoreResponse) => value.name
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
    ]

    return (
        <div className="wrapper-seller-product-manage">
            <div className="seller-product-manage">
                <div className="toolbar">
                    <div className="search-filter">
                        <div className="search">
                            <input type="text" placeholder='Tìm kiếm...' className="search-input" />
                            <IoSearch className='search-icon' />
                        </div>
                        <select name="" id="role">
                            <option className="role-item" value="Telephone">Điện thoại di động</option>
                            <option className="role-item" value="Laptop">Laptop</option>
                            <option className="role-item" value="PC">PC</option>
                        </select>
                    </div>
                    <Link to='/seller/add-product' className="add-product">Thêm sản phẩm <FaPlus className="plus-icon" /></Link>
                </div>

                <ManageTable
                    listResponse={listResponse}
                    resourceUrl={SellerPMConfigs.resourceUrl}
                    resourceKey={SellerPMConfigs.resourceKey}
                    entityDetailsTableRowsFragment={entityDetailsTableRowsFragment}
                    resourceName={SellerPMConfigs.resourceName}
                />

                <ManagePagination listResponse={listResponse} />

                {/*<table className="table">*/}
                {/*    <thead className="table-header">*/}
                {/*        <tr className="header-row">*/}
                {/*            <th>HÌNH ẢNH</th>*/}
                {/*            <th>TÊN SẢN PHẨM</th>*/}
                {/*            <th>NGÀY ĐĂNG BÁN</th>*/}
                {/*            <th>DANH MỤC</th>*/}
                {/*            <th>HÀNH ĐỘNG</th>*/}
                {/*        </tr>*/}
                {/*    </thead>*/}
                {/*    <tbody className="table-body">*/}
                {/*        {productData.map((value) => {*/}
                {/*            return <tr key={value.prodId} className="data-row">*/}
                {/*                <td className="prod-img"><img src={require(`../../assets/img/${value.imgName}`)} alt="" /></td>*/}
                {/*                <td className="prod-name">{value.prodName}</td>*/}
                {/*                <td className="post-date">{value.postDate}</td>*/}
                {/*                <td className="category">{value.category}</td>*/}
                {/*                <td className="action">*/}
                {/*                    <FaEdit className="edit-icon"/>*/}
                {/*                    <FaTrashAlt className="delete-icon"/>*/}
                {/*                </td>*/}
                {/*            </tr>*/}
                {/*        })}*/}
                {/*    </tbody>*/}
                {/*</table>*/}
                {/*<Pagination />*/}
            </div>
        </div>
    )
}