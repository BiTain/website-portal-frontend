import "./ClientIntroduce.scss"
export default function ClientIntroduce() {
    return (
        <div className="wrapper-client-introduce">
            <div className="client-introduce">
                <h2 className="title">Giới thiệu</h2>
                <p className="content">
                    <span style={{ fontSize: "20px", color: "var(--primary-color)", fontWeight: "400", marginBottom: "5px", display: "block" }}>Chào mừng bạn đến với epMall!</span>
                    Bạn đang tìm kiếm sản phẩm phù hợp với nhu cầu của mình nhưng không biết mua ở đâu? Bạn muốn so sánh giá cả và chất lượng sản phẩm từ nhiều trang web thương mại điện tử khác nhau? <br />
                    <span style={{ fontSize: "20px", color: "var(--primary-color)", fontWeight: "500", marginBottom: "5px", marginTop: "15px", display: "block" }}>EpMall hoàn toàn miễn phí và dễ sử dụng: </span>
                    <ul>
                        <li>
                            Giao diện web đơn giản, dễ sử dụng, thân thiện với người dùng
                        </li>
                        <li>
                            Tốc độ truy cập web nhanh chóng
                        </li>
                        <li>
                            Tuyển chọn web uy tín, chất lượng
                        </li>
                    </ul>
                    <span style={{ fontSize: "20px", color: "var(--primary-color)", fontWeight: "500", marginBottom: "5px", marginTop: "15px", display: "block" }}>Cam kết của chúng tôi: </span>
                    <ul>
                        <li>
                            Cung cấp thông tin sản phẩm chính xác và cập nhật
                        </li>
                        <li>
                            Giúp bạn tìm kiếm sản phẩm phù hợp với nhu cầu
                        </li>
                        <li>
                            Tiết kiệm thời gian và tiền bạc cho bạn
                        </li>
                    </ul>
                    <span style={{ fontSize: "20px", color: "var(--primary-color)", fontWeight: "500", marginBottom: "5px", marginTop: "15px", display: "block" }}>Liên hệ với chúng tôi: </span>
                    <ul>
                        <li>Website: https://epmall.com.vn</li>
                        <li>Email: epmall@gmail.com</li>
                        <li>Hotline: 0236 564 238</li>
                    </ul>
                </p>
            </div>
        </div>
    )
}