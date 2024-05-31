import { Link } from "react-router-dom"
import "./UserSubNav.scss"
import { FaQuestionCircle, FaRegSun, FaSignOutAlt, FaUser } from "react-icons/fa"
import { useDispatch } from "react-redux"
import { resetAuthState } from "../../redux/slices/authSlice"
import { App } from "antd"
import { useAppSelector } from "../../redux/hooks"

interface UserSubnavProps {
    isOpen?: boolean
}

export default function UserSubNav(props?: UserSubnavProps) {
    const { user } = useAppSelector(state => state.auth)
    const dispatch = useDispatch()
    const { notification } = App.useApp()
    const handleLogout = () => {

        dispatch(resetAuthState())

        notification.success({
            message: 'Đăng xuất thành công!'
        })
    }
    return (
        <ul className={`user-subnav ${props?.isOpen ? 'open' : ''}`}>
            <li>
                <span className="user-name">{user?.fullName}</span>
            </li>
            <li>
                <Link to='info' className="user-info">
                    <FaUser className="user-icon" />
                    Thông tin cá nhân
                </Link>
            </li>
            <li>
                <Link to='/' className="setting">
                    <FaRegSun className="setting-icon" />
                    Cài đặt
                </Link>
            </li>
            <li>
                <Link to='/' className="support">
                    <FaQuestionCircle className="support-icon" />
                    Hỗ trợ
                </Link>
            </li>
            <li>
                <Link to='/sign-in' className="log-out" onClick={handleLogout}>
                    <FaSignOutAlt className="log-out-icon" />
                    Đăng xuất
                </Link>
            </li>
        </ul>
    )
}