import './ClientFooter.scss'
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
export default function ClientFooter() {
    return (
        <div className="wrapper-client-footer">
            <footer className="client-footer">
                <div className="main-footer">
                    <div className="brand">
                        <span className="brand-name">epMall</span>
                        <span className="brand-description">
                            epMall tự hào là cổng thương mại điện tử uy tín hàng đầu Việt Nam, mang đến trải nghiệm mua sắm trực tuyến tiện lợi và an toàn.
                        </span>
                    </div>
                    <div className="info">
                        <span className="info-title">Liên hệ với chúng tôi</span>
                        <div className="address">
                            <FaMapMarkerAlt className="address-icon"/>
                            <span className="address-content">48 Cao Thắng, P. Thanh Bình, Q. Hải Châu, Tp. Đà Nẵng</span>
                        </div>
                        <div className="tel">
                            <FaPhoneAlt className='tel-icon'/>
                            <span className='tel-content'>0236 564 238</span>
                        </div>
                        <div className="email">
                            <FaEnvelope className='email-icon'/>
                            <span className='email-content'>epmall@gmail.com</span>
                        </div>
                    </div>
                    <div className="social-network">
                        <span className='social-network-title'>Kết nối với chúng tôi</span>
                        <div className="social-network-icon">
                            <FaFacebookF className='facebook-icon'/>
                            <FaInstagram className='instagram-icon'/>
                            <FaTwitter className='twitter-icon'/>
                        </div>
                    </div>
                </div>
            </footer>
            <div className="copyright">
                <span className='copyright-content'>Copyright &#169;2024 All right reserved | This website is made by epMall</span>
            </div>
        </div>
    )
}