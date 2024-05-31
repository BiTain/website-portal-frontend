import { FaUser } from "react-icons/fa";
import { FaStore } from "react-icons/fa";
import { FaRegSun } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import "./AdminSidebar.scss"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { App } from "antd";
import { resetAuthState } from "../../redux/slices/authSlice";
import { useState } from "react";

export default function AdminSidebar() {
    const dispatch = useDispatch()
    const { notification } = App.useApp()
    const handleLogout = () => {

        dispatch(resetAuthState())

        notification.success({
            message: 'Đăng xuất thành công!'
        })
    }
    const [isActive, setIsActive] = useState([true, false])
    return (
        <div className="admin-sidebar">
            <div className="manage">
                <Link onClick={() => setIsActive([true, false])} to="/admin" className={`manage-user ${isActive[0] ? 'active' : ''}`}>
                    <FaUser className="user-icon" />
                    <span className="manage-user-content">Quản lý người dùng</span>
                </Link>
                <Link onClick={() => setIsActive([false, true])} to="/admin/store" className={`manage-store ${isActive[1] ? 'active' : ''}`}>
                    <FaStore className="store-icon" />
                    <span className="manage-store-content">Quản lý cửa hàng</span>
                </Link>
            </div>
            <div className="functional">
                <Link to="/admin" className="setting">
                    <FaRegSun className="setting-icon" />
                    <span className="setting-content">Cài đặt</span>
                </Link>
                <Link to="/sign-in" className="logout" onClick={handleLogout}>
                    <FaSignOutAlt className="logout-icon" />
                    <span className="logout-content">Đăng xuất</span>
                </Link>
            </div>
        </div>
    )
}