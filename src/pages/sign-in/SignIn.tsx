import "./SignIn.scss"
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineKey } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { App, Button, Form, FormProps, Input } from "antd";
import { LoginRequest, LoginResponse } from "../../models/Auth";
import { useMutation } from "react-query";
import FetchUtils, { ErrorMessage } from "../../utils/FetchUtils";
import ResourceUrl from "../../constants/ResourceUrl";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { resetAuthState, setUser, updateAccessToken } from "../../redux/slices/authSlice";
import { useState } from "react";
import { Simulate } from "react-dom/test-utils";
import load = Simulate.load;

export default function SignIn() {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const dispatch = useAppDispatch()

    const { notification } = App.useApp()

    const loginApi = useMutation<LoginResponse, ErrorMessage, LoginRequest>(
        (requestBody) => FetchUtils.post(ResourceUrl.LOGIN, requestBody)
    )

    const onFinish: FormProps<LoginRequest>['onFinish'] = async (loginRequest) => {
        setLoading(true)
        try {
            const loginResponse = await loginApi.mutateAsync(loginRequest)

            dispatch(updateAccessToken(loginResponse.accessToken))
            dispatch(setUser(loginResponse.user))

            notification.success({
                message: 'Đăng nhập thành công'
            })

            if (loginResponse.user.role.toLowerCase() === 'admin') navigate('/admin')
            else if (loginResponse.user.role.toLowerCase() === 'seller') navigate('/seller')
            else navigate('/')

        } catch (e: any) {
            dispatch(resetAuthState())
            notification.error({
                message: e.message
            })
        }
        setLoading(false)
    };


    return (
        <div className="wrapper-sign-in">
            <Link to='/' className="back-to-index">{`<`} Trở về trang chủ</Link>
            <div className="sign-in">
                <span className="title">Đăng nhập <span
                    style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>EPMALL</span></span>

                <Form
                    disabled={loading}
                    name="basic"
                    labelAlign="left"
                    size='large'
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 24 }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item<LoginRequest>
                        label="Tên đăng nhập"
                        name="username"
                        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<LoginRequest>
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button loading={loading} type="primary" htmlType="submit">
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>

                {/*<form action="" className="sign-in-form">*/}
                {/*    <div className="wrapper-username">*/}
                {/*        <FaRegUserCircle className="username-icon"/>*/}
                {/*        <input type="text" className="username-input" placeholder="Tên đăng nhập"/>*/}
                {/*    </div>*/}
                {/*    <div className="wrapper-password">*/}
                {/*        <AiOutlineKey className="password-icon" />*/}
                {/*        <input type="password" name="" id="" className="password-input" placeholder="Mật khẩu"/>*/}
                {/*        <FaEye className="show-password-icon"/>*/}
                {/*    </div>*/}
                {/*    <Link to='/' className="forget-password">Quên mật khẩu?</Link>*/}
                {/*    <button className="login-button">Đăng nhập</button>*/}
                {/*</form>*/}
                {/* <span className="register-content">Bạn chưa có tài khoản? <Link to='/sign-up' className="register-link">Đăng ký</Link></span> */}
                <span className="seller-register-content"><span>Hoặc</span>Bạn muốn trở thành Seller? <Link
                    to='/seller-register' className="seller-register-link">Đăng ký Seller</Link></span>
            </div>
        </div>
    )
}