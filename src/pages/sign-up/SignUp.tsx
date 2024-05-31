import { FaEye, FaRegUserCircle } from "react-icons/fa"
import "./SignUp.scss"
import { AiOutlineKey } from "react-icons/ai"
import { Link } from "react-router-dom"
import { FaAddressCard } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
export default function SignUp() {
    return (
        <div className="wrapper-sign-up">
            <Link to='/' className="back-to-index">{`<`} Trở về trang chủ</Link>
            <div className="sign-up">
                <span className="title">Đăng ký <span style={{color: 'var(--primary-color)', fontWeight: 'bold'}}>EPMALL</span></span>
                <form action="" className="sign-up-form">                    
                    <div className="wrapper-username">
                        <FaRegUserCircle className="username-icon"/>
                        <input type="text" className="username-input" placeholder="Tên đăng nhập"/>
                    </div>
                    <div className="wrapper-password">
                        <AiOutlineKey className="password-icon" />
                        <input type="password" name="" id="" className="password-input" placeholder="Mật khẩu"/>
                        <FaEye className="show-password-icon"/>
                    </div>
                    <div className="wrapper-repeat-password">
                        <AiOutlineKey className="repeat-password-icon" />
                        <input type="password" name="" id="" className="repeat-password-input" placeholder="Nhập lại mật khẩu"/>
                        <FaEye className="show-repeat-password-icon"/>
                    </div>
                    <span className="info-title">Thông tin cá nhân</span>
                    <div className="wrapper-fullname">
                        <FaAddressCard className="fullname-icon" />
                        <input type="text" className="fullname-input" placeholder="Họ và tên"/>
                    </div>
                    <div className="wrapper-email">
                        <FaEnvelope className="email-icon" />
                        <input type="email" className="email-input" placeholder="Email"/>
                    </div>
                    <div className="wrapper-tel">
                        <FaPhoneAlt className="tel-icon" />
                        <input type="tel" className="tel-input" placeholder="Số điện thoại"/>
                    </div>
                    <button className="signup-button">Đăng ký</button>
                </form>
                <span className="signin-content">Bạn đã có tài khoản? <Link to='/sign-in' className="signin-link">Đăng nhập</Link></span>
            </div>
        </div>
    )
}