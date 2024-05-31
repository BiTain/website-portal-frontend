import { FaPhoneAlt } from "react-icons/fa"
import "./ClientContact.scss"
import { HiMapPin } from "react-icons/hi2";
import { IoMdMail } from "react-icons/io";
export default function ClientContact() {
    return (
        <div className="wrapper-client-contact">
            <ul className="contact-info">
                <li className="contact-phone">
                    <FaPhoneAlt className="icon" />
                    <span className="content">Phone</span>
                    <span className="detail-content">0236 564 238</span>
                </li>
                <li className="contact-address">
                    <HiMapPin className="icon" />
                    <span className="content">Address</span>
                    <span className="detail-content">48 Cao Thắng, P. Thanh Bình, Q. Hải Châu, Tp. Đà Nẵng</span>
                </li>
                <li className="contact-email">
                    <IoMdMail className="icon" />
                    <span className="content">Email</span>
                    <span className="detail-content">epmall@gmail.com</span>
                </li>
            </ul>
            <div className="contact-map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.771403944958!2d108.21084937465672!3d16.077347939221433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142184792140755%3A0xd4058cb259787dac!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTxrAgUGjhuqFtIEvhu7kgdGh14bqtdCAtIMSQ4bqhaSBo4buNYyDEkMOgIE7hurVuZw!5e0!3m2!1svi!2s!4v1716983576382!5m2!1svi!2s" width="100%" height="450" style={{ border: '0' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    )
}