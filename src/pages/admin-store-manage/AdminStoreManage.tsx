import { FaEdit } from "react-icons/fa";
import Pagination from "../../components/Pagination";
import { IoSearch } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import "./AdminStoreManage.scss"
import ManageTable from "../../components/ManageTable";
import PageConfigs from "../PageConfigs";
import { ListResponse } from "../../utils/FetchUtils";
import { UserResponse } from "../../models/User";
import useGetAllApi from "../../hooks/use-get-all-api";
import UserConfigs from "../admin-user-manage/UserConfigs";
import { StoreOwner, StoreResponse } from "../../models/Store";
import StoreConfigs from "./StoreConfigs";
import ResourceUrl from "../../constants/ResourceUrl";
import { Image, TableProps, Tag, Tooltip } from "antd";
import ManagePagination from "../../components/ManagePagination";

const storeData: {
    storeId: string,
    storeName: string,
    sellerId: string,
    dateRegis: string,
    enable: boolean
}[] = [
        {
            storeId: 'CH00001',
            storeName: 'FPTShop',
            sellerId: '0123456789',
            dateRegis: '03/03/2024',
            enable: true
        },
        {
            storeId: 'CH00001',
            storeName: 'FPTShop',
            sellerId: '0123456789',
            dateRegis: '03/03/2024',
            enable: true
        },
        {
            storeId: 'CH00001',
            storeName: 'FPTShop',
            sellerId: '0123456789',
            dateRegis: '03/03/2024',
            enable: true
        },
        {
            storeId: 'CH00001',
            storeName: 'FPTShop',
            sellerId: '0123456789',
            dateRegis: '03/03/2024',
            enable: false
        },
        {
            storeId: 'CH00001',
            storeName: 'FPTShop',
            sellerId: '0123456789',
            dateRegis: '03/03/2024',
            enable: true
        },
        {
            storeId: 'CH00001',
            storeName: 'FPTShop',
            sellerId: '0123456789',
            dateRegis: '03/03/2024',
            enable: false
        },
        {
            storeId: 'CH00001',
            storeName: 'FPTShop',
            sellerId: '0123456789',
            dateRegis: '03/03/2024',
            enable: true
        }
    ]
export default function AdminStoreManage() {

    const entityDetailsTableRowsFragment: TableProps<StoreResponse>['columns'] = [
        {
            title: 'Thông tin cửa hàng',
            key: 'storeInfo',
            render: (text, record: StoreResponse) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Image
                        width={40}
                        height={40}
                        style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
                        src={record.imageUrls ? record.imageUrls[0] : ''}
                    />
                    <span>{record.name}</span>
                </div>
            ),
        },
        {
            title: 'Đường dẫn cửa hàng',
            dataIndex: 'urlStore',
            key: 'urlStore',
            render: (urlStore: string) => (
                <Tooltip title={urlStore}>
                    <a
                        href={urlStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: 'block',
                            maxWidth: 200 // Đặt giới hạn chiều rộng theo nhu cầu của bạn
                        }}
                    >
                        {urlStore}
                    </a>
                </Tooltip>
            ),
        },
        {
            title: 'Thông tin người sở hữu',
            dataIndex: 'owner',
            key: 'owner',
            render: (owner: StoreOwner) => <div>
                <div>Mã định danh: <strong>{owner.id}</strong></div>
                <div>Họ và tên: <strong>{owner.fullName}</strong></div>
            </div>
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
    ]

    const {
        isLoading,
        data: listResponse = PageConfigs.initListResponse as ListResponse<StoreResponse>
    } = useGetAllApi<StoreResponse>(StoreConfigs.resourceUrl, StoreConfigs.resourceKey)

    return (
        <div className="admin-store-manage">
            <div className="search-filter">
                <div className="search">
                    <input type="text" placeholder='Tìm kiếm...' className="search-input" />
                    <IoSearch className='search-icon' />
                </div>
            </div>

            <ManageTable
                listResponse={listResponse}
                resourceUrl={StoreConfigs.resourceUrl}
                resourceKey={StoreConfigs.resourceKey}
                entityDetailsTableRowsFragment={entityDetailsTableRowsFragment}
                resourceName={StoreConfigs.resourceName} />

            <ManagePagination listResponse={listResponse} />

            {/*<table className="table">*/}
            {/*    <tr className="header-row">*/}
            {/*        <th>ID CỬA HÀNG</th>*/}
            {/*        <th>TÊN CỬA HÀNG</th>*/}
            {/*        <th>ID SELLER</th>*/}
            {/*        <th>NGÀY ĐĂNG KÝ</th>*/}
            {/*        <th>HÀNH ĐỘNG</th>*/}
            {/*    </tr>*/}
            {/*    {storeData.map((value) => {*/}
            {/*        let enaIcon;*/}
            {/*        if (value.enable) {*/}
            {/*            enaIcon = <FaLockOpen className="lock-icon" style={{color: 'var(--primary-color)'}}/>*/}
            {/*        } else {*/}
            {/*            enaIcon = <FaLock className="lock-icon" style={{color: 'red'}}/>*/}
            {/*        }*/}
            {/*        return <tr className="data-row">*/}
            {/*            <td className="store-id">{value.storeId}</td>*/}
            {/*            <td className="store-name">{value.storeName}</td>*/}
            {/*            <td className="seller-id">{value.sellerId}</td>*/}
            {/*            <td className="date-regis">{value.dateRegis}</td>*/}
            {/*            <td className="action">*/}
            {/*                <FaEdit className="edit-icon"/>*/}
            {/*                {enaIcon}*/}
            {/*            </td>*/}
            {/*        </tr>*/}
            {/*    })}*/}
            {/*</table>*/}
            {/*<Pagination />*/}
        </div>
    )
}