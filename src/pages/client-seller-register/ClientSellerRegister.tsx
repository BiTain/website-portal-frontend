import "./ClientSellerRegister.scss"
import {Button, Col, Form, FormProps, GetProp, Image, Input, Row, Upload, UploadFile, UploadProps} from "antd";
import {PlusOutlined} from '@ant-design/icons';
import {SellerRequest} from "../../models/User";
import useClientSellerRegisterViewModel from "./ClientSellerRegister.vm";
import {useState} from "react";

export default function ClientSellerRegister() {
    const {
        loading,
        setLoading,
        form,
        handleFormSubmit,
        handleOpenPreview,
        previewOpen,
        previewImage,
        setPreviewOpen,
        setPreviewImage,
        avatarFile,
        storeImageFiles,
        handleAvatarFileChange,
        handleChangeStoreImage
    } = useClientSellerRegisterViewModel();

    const onFinish: FormProps<SellerRequest>['onFinish'] = (values) => {
        setLoading(true)
        handleFormSubmit(values)
    };

    return (
        <div className="wrapper-client-seller-register">
            <Form
                form={form}
                name="seller-register"
                className='client-seller-register'
                onFinish={onFinish}
                disabled={loading ? true : false}
                autoComplete="off"
            >
                <span className="title">Đăng ký thành SELLER</span>

                <div className="register-info">
                    <div className='seller-avatar' style={{width: '25%', marginRight: 24}}>
                        {avatarFile.length === 0 &&
                            <img src={require("../../assets/img/avatar.jpg")} alt=""
                                 className="avatar"/>}
                        <Form.Item
                            name="avatarFile"
                            labelCol={{span: 24}}
                            label="Hình đại diện của bạn"
                            rules={[{required: true, message: 'Vui lòng tải hình đại diện của bạn!'}]}
                        >
                            <Upload
                                maxCount={1}
                                fileList={avatarFile}
                                beforeUpload={() => false}
                                listType="picture-card"
                                onChange={handleAvatarFileChange}
                                onPreview={handleOpenPreview}
                            >
                                <button style={{border: 0, background: 'none'}} type="button">
                                    <PlusOutlined/>
                                    <div style={{marginTop: 8}}>Upload</div>
                                </button>
                            </Upload>
                        </Form.Item>
                    </div>

                    <div className="register-info-content">
                        <Form.Item<SellerRequest>
                            label="Họ và tên"
                            labelCol={{span: 24}}
                            name="fullName"
                            rules={[{required: true, message: 'Vui lòng nhập tên đầy đủ!'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item<SellerRequest>
                                    label="Email"
                                    labelCol={{span: 24}}
                                    name="email"
                                    rules={[
                                        {required: true, message: 'Vui lòng nhập email!'},
                                        {
                                            type: 'email',
                                            message: 'Email không hợp lệ'
                                        },
                                    ]}
                                >
                                    <Input
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item<SellerRequest>
                                    label="Số điện thoại"
                                    labelCol={{span: 24}}
                                    name="phoneNumber"
                                    rules={[{required: true, message: 'Vui lòng nhập số điện thoại!'}]}
                                >
                                    <Input/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item<SellerRequest>
                            label="Tên cửa hàng"
                            labelCol={{span: 24}}
                            name="storeName"
                            rules={[{required: true, message: 'Vui lòng nhập tên cửa hàng!'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item<SellerRequest>
                            label="Link cửa hàng"
                            labelCol={{span: 24}}
                            name="urlStore"
                            rules={[{required: true, message: 'Vui lòng nhập đường dẫn cửa hàng!'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            name="storeImageFiles"
                            label="Hình ảnh cửa hàng"
                            labelCol={{span: 24}}
                            rules={[{required: true, message: 'Vui lòng tải ít nhất một hình ảnh về cửa hàng!'}]}
                        >
                            <Upload
                                multiple
                                listType="picture-card"
                                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                fileList={storeImageFiles}
                                beforeUpload={() => false}
                                onChange={handleChangeStoreImage}
                                onPreview={handleOpenPreview}
                            >
                                <button style={{border: 0, background: 'none'}} type="button">
                                    <PlusOutlined/>
                                    <div style={{marginTop: 8}}>Upload</div>
                                </button>
                            </Upload>
                        </Form.Item>

                        <Button type='primary' loading={loading} htmlType='submit' size='large' className="register-button">Đăng ký</Button>
                    </div>
                </div>
            </Form>

            {previewImage && (
                <Image
                    wrapperStyle={{display: 'none'}}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}

            {/*<form action="" className="client-seller-register">*/}
            {/*    <span className="title">Đăng ký thành SELLER</span>*/}
            {/*    <div className="register-info">*/}
            {/*        <img src={require("../../assets/img/avatar.jpg")} alt="" className="avatar"/>*/}
            {/*        <div className="register-info-content">*/}
            {/*            <label htmlFor="fullname" className="fullname-label">Họ và tên<span*/}
            {/*                style={{color: "red"}}>*</span></label>*/}
            {/*            <input type="text" id="fullname"/>*/}
            {/*            <label htmlFor="email" className="email-label">Email<span*/}
            {/*                style={{color: "red"}}>*</span></label>*/}
            {/*            <label htmlFor="phone-number" className="phone-number-label">Số điện thoại<span*/}
            {/*                style={{color: "red"}}>*</span></label>*/}
            {/*            <input type="email" id="email"/>*/}
            {/*            <input type="text" id="phone-number"/>*/}
            {/*            <label htmlFor="store-name" className="store-name-label">Tên cửa hàng<span*/}
            {/*                style={{color: "red"}}>*</span></label>*/}
            {/*            <input type="text" id="store-name" placeholder="Nhập tên cửa hàng"/>*/}
            {/*            <label htmlFor="store-link" className="store-link-label">Link cửa hàng<span*/}
            {/*                style={{color: "red"}}>*</span></label>*/}
            {/*            <input type="url" id="store-link" placeholder="Dán URL"/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <button className="register-button">Đăng ký</button>*/}
            {/*</form>*/}
        </div>
    )
}