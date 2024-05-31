import "./SellerHeader.scss"
import Logo from "../../assets/img/logo.jpg"
import { FaBell, FaQuestionCircle, FaRegSun, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"
import UserSubNav from "../UserSubnav"
import { useAppSelector } from "../../redux/hooks"
import { useState } from "react"
export default function SellerHeader() {

    const [isOpen, setIsOpen] = useState(false)
    const { user } = useAppSelector(state => state.auth)
    return (
        <div className="wrapper-seller-header">
            <header className="seller-header">
                <Link to='/seller' className="seller-header-logo-link">
                    <img src={Logo} alt="" className="seller-header-logo" />
                </Link>
                <div className="noti-user">
                    <Link to='/seller' className="noti">
                        <FaBell className="noti-icon" />
                    </Link>
                    <div className="user">
                        <img src={user?.avatar} alt="" className="user-avatar" onClick={() => setIsOpen(!isOpen)} />
                        <UserSubNav isOpen={isOpen} />
                    </div>
                </div>
            </header>
        </div>
    )
}