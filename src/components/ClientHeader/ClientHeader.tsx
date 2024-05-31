import logo from '../../assets/img/logo.jpg'
import { Link, useNavigate } from "react-router-dom";
import './ClientHeader.scss'
import { IoSearch } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import UserSubNav from '../UserSubnav';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { IoIosLogOut } from "react-icons/io";
import { App } from "antd";
import { resetAuthState } from "../../redux/slices/authSlice";
import useGetAllApi from "../../hooks/use-get-all-api";
import { CategoryResponse } from "../../models/Category";
import ResourceUrl from "../../constants/ResourceUrl";
import PageConfigs from "../../pages/PageConfigs";
import { ListResponse } from "../../utils/FetchUtils";
import { useState } from 'react';
import Search from "antd/es/input/Search";
import { SearchProps } from "antd/lib/input";
import { setSearchToken } from "../../redux/slices/managePageSlice";

const categories: {
    cateLink: string,
    cateName: string,
    subCate: {
        subCateLink: string,
        subCateName: string
    }[]
}[] = [
        {
            cateLink: 'super-products',
            cateName: 'Đồ điện tử',
            subCate: [
                {
                    subCateLink: 'sub-products',
                    subCateName: 'Điện thoại di động'
                },
                {
                    subCateLink: 'maytinh',
                    subCateName: 'PC và Laptop'
                },
                {
                    subCateLink: 'phukien',
                    subCateName: 'Phụ kiện'
                },
                {
                    subCateLink: 'amthanh',
                    subCateName: 'Thiết bị âm thanh'
                },
                {
                    subCateLink: 'giadung',
                    subCateName: 'Thiết bị gia dụng'
                },
                {
                    subCateLink: 'khac',
                    subCateName: 'Thiết bị khác'
                }
            ]
        },
        {
            cateLink: 'suckhoe',
            cateName: 'Sức khỏe',
            subCate: [
                {
                    subCateLink: 'thucphamchucnang',
                    subCateName: 'Thực phẩm chức năng'
                },
                {
                    subCateLink: 'thietbiyte',
                    subCateName: 'Thiết bị y tế'
                },
                {
                    subCateLink: 'chamsoccanhan',
                    subCateName: 'Chăm sóc cá nhân'
                },
                {
                    subCateLink: 'dungcuthethao',
                    subCateName: 'Dụng cụ thể thao'
                }
            ]
        },
        {
            cateLink: 'lamdep',
            cateName: 'Làm đẹp',
            subCate: [
                {
                    subCateLink: 'chamsocda',
                    subCateName: 'Chăm sóc da'
                },
                {
                    subCateLink: 'chamsoctoc',
                    subCateName: 'Chăm sóc tóc'
                },
                {
                    subCateLink: 'chamsoccothe',
                    subCateName: 'Chăm sóc cơ thể'
                },
                {
                    subCateLink: 'trangdiem',
                    subCateName: 'Trang điểm'
                }
            ]
        },
        {
            cateLink: 'thucpham',
            cateName: 'Thực phẩm',
            subCate: [
                {
                    subCateLink: 'traicayvarauqua',
                    subCateName: 'Trái cây và rau quả'
                },
                {
                    subCateLink: 'thitvagiacam',
                    subCateName: 'Thịt và gia cầm'
                },
                {
                    subCateLink: 'cavahaisan',
                    subCateName: 'Cá và hải sản'
                },
                {
                    subCateLink: 'trung',
                    subCateName: 'Trứng'
                },
                {
                    subCateLink: 'sanphamtusua',
                    subCateName: 'Sản phẩm từ sữa'
                },
                {
                    subCateLink: 'cacloaihat',
                    subCateName: 'Các loại hạt'
                },
                {
                    subCateLink: 'giavi',
                    subCateName: 'Gia vị'
                }
            ]
        },
        {
            cateLink: 'douong',
            cateName: 'Đồ uống',
            subCate: [
                {
                    subCateLink: 'cacloainuoc',
                    subCateName: 'Các loại nước'
                },
                {
                    subCateLink: 'sua',
                    subCateName: 'Sữa'
                },
                {
                    subCateLink: 'cafevatra',
                    subCateName: 'Cà phê và trà'
                },
                {
                    subCateLink: 'ruoubia',
                    subCateName: 'Rượu bia'
                }
            ]
        },
        {
            cateLink: 'quanao',
            cateName: 'Quần áo',
            subCate: [
                {
                    subCateLink: 'donam',
                    subCateName: 'Đồ nam'
                },
                {
                    subCateLink: 'donu',
                    subCateName: 'Đồ nữ'
                },
                {
                    subCateLink: 'phukiendikem',
                    subCateName: 'Phụ kiện đi kèm'
                }
            ]
        },
        {
            cateLink: 'noithat',
            cateName: 'Nội thất',
            subCate: [
                {
                    subCateLink: 'dogo',
                    subCateName: 'Đồ gỗ'
                },
                {
                    subCateLink: 'dokimloai',
                    subCateName: 'Đồ kim loại'
                },
                {
                    subCateLink: 'donhua',
                    subCateName: 'Đồ nhựa'
                },
                {
                    subCateLink: 'doda',
                    subCateName: 'Đồ đá'
                }
            ]
        },
        {
            cateLink: 'sach',
            cateName: 'Sách',
            subCate: [
                {
                    subCateLink: 'hucau',
                    subCateName: 'Hư cấu'
                },
                {
                    subCateLink: 'phihucau',
                    subCateName: 'Phi hư cấu'
                },
                {
                    subCateLink: 'sachthieunhi',
                    subCateName: 'Sách thiếu nhi'
                },
                {
                    subCateLink: 'sachgiaoduc',
                    subCateName: 'Sách giáo dục'
                }
            ]
        }
    ]

export default function ClientHeader() {
    // const [isOpen, setIsOpen] = useState(false)
    const { user } = useAppSelector(state => state.auth)

    const { notification } = App.useApp()

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const handleLogout = () => {

        dispatch(resetAuthState())

        notification.success({
            message: 'Đăng xuất thành công!'
        })
    }

    const [isOpen, setIsOpen] = useState(false)
    const [isActive, setIsActive] = useState([true, false, false, false])

    const {
        data: listResponse = PageConfigs.initListResponse as ListResponse<CategoryResponse>
    } = useGetAllApi<CategoryResponse>(ResourceUrl.CLIENT_CATEGORY, "categories", { all: true })

    const handleSearch: SearchProps['onSearch'] = (value,
        _e,
        info) => {
        dispatch(setSearchToken(value))
        navigate('/result-search')
    }

    return (
        <div className="wrapper-client-header">
            <ul className='client-header'>
                <li className='logo-item'>
                    <Link to='/' className='logo-link'>
                        <img src={logo} alt='logo' className='logo' />
                    </Link>
                </li>
                <ul className='sub-header'>
                    <li onClick={() => setIsActive([true, false, false, false])}>
                        <Link className={`${isActive[0] ? 'active' : ''}`} to={'/'}>Trang chủ</Link>
                    </li>
                    <li onClick={() => setIsActive([false, true, false, false])}>
                        <Link className={`${isActive[1] ? 'active' : ''}`} to={'/introduce'}>Giới thiệu</Link>
                    </li>
                    <li className={`categories ${isActive[2] ? 'active' : ''}`}>
                        Danh mục sản phẩm
                        <FaAngleDown className='down-icon' />
                        <ul className="categories-list">
                            {listResponse.content.map((value) => {
                                return <li key={value.id} className='super-categories'>
                                    <Link onClick={() => setIsActive([false, false, true, false])} to={`/products/categories/${value.id}`}>{value.name}</Link>
                                    {/*{value.subCate.map((subValue) => {*/}
                                    {/*    return <li className="sub-categories">*/}
                                    {/*        <Link to={subValue.subCateLink}>{subValue.subCateName}</Link>*/}
                                    {/*    </li>*/}
                                    {/*})}*/}
                                </li>
                            })}
                            {/*{categories.map((value) => {*/}
                            {/*    return <li className="super-categories">*/}
                            {/*        <Link to={value.cateLink}>{value.cateName}</Link>*/}
                            {/*        {value.subCate.map((subValue) => {*/}
                            {/*            return <li className="sub-categories">*/}
                            {/*                <Link to={subValue.subCateLink}>{subValue.subCateName}</Link>*/}
                            {/*            </li>*/}
                            {/*        })}*/}
                            {/*    </li>*/}
                            {/*})}*/}
                        </ul>
                    </li>
                    {user?.role.toLowerCase() === 'seller' && <li>
                        <Link to={'/seller'}>Seller</Link>
                    </li>}
                    {user?.role.toLowerCase() === 'admin' && <li>
                        <Link to={'/admin'}>Admin</Link>
                    </li>}
                    <li onClick={() => setIsActive([false, false, false, true])}>
                        <Link className={`${isActive[3] ? 'active' : ''}`} to={'/contact'}>Liên hệ</Link>
                    </li>
                </ul>
                <li className='search'>
                    <Search size='large' placeholder="Tìm kiếm..." onSearch={handleSearch} style={{ width: 200 }} />
                    {/*<input onClick={handleSearch} type="text" placeholder='Bạn tìm gì hôm nay...'/>*/}
                    {/*<IoSearch className='search-icon'/>*/}
                </li>
                <li className='auth'>
                    {!user ? <>
                        <FaUser className='log-icon' />
                        <Link to={'/sign-in'}>Đăng nhập/Đăng ký</Link>
                    </> :
                        <div className="user">
                            <img src={user?.avatar} alt="" className="user-avatar" onClick={() => setIsOpen(!isOpen)} />
                            <UserSubNav isOpen={isOpen} />
                        </div>
                    }
                </li>
            </ul>
        </div>
    )
}