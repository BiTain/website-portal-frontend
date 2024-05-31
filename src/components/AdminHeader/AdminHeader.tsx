import Logo from "../../assets/img/logo.jpg"
import { FaBell } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import "./AdminHeader.scss"
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { Image } from "antd";

export default function AdminHeader() {

    const { user } = useAppSelector(state => state.auth)


    return (
        <div className="wrapper-admin-header">
            <header className="admin-header">
                <Link to='/admin'>
                    <img src={Logo} alt="" className="admin-header-logo" />
                </Link>
                <div className="noti-user">
                    <FaBell className="noti-icon" />
                    <div className="user">
                        {/*<FaUserCircle className="user-icon"/>*/}
                        <Image
                            style={{ borderRadius: '50%', objectFit: 'cover' }}
                            width={40}
                            height={40}
                            src={user?.avatar}
                        />
                        <span className="ms-2 d-inline-block user-name">{user?.fullName}</span>
                    </div>
                </div>
            </header>
        </div>
    )
}