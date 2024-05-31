import { FaArrowLeft, FaPlus, FaSave, FaUpload } from "react-icons/fa"
import "./SellerUpdateProduct.scss"
import { Link } from "react-router-dom"
import { Button, Col, Form, FormProps, Image, Input, InputNumber, Row, Select, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ProductRequest } from "../../models/Product";
import useSellerUpdateProductViewModel from "./SellerUpdateProduct.vm";
import { IoReturnUpBackOutline } from "react-icons/io5";
export default function SellerUpdateProduct() {
    const {
        form,
        loading,
        handleOpenPreview,
        previewOpen,
        previewImage,
        setPreviewImage,
        setPreviewOpen,
        handleFormSubmit,
        setLoading,
        productImageFiles,
        handleChangeProductImage,
        id,
        product,
        categorySelectList
    } = useSellerUpdateProductViewModel()

    const onFinish: FormProps<ProductRequest>['onFinish'] = (values) => {
        setLoading(true)
        handleFormSubmit(values)
    };

    if (product) {
        return <div className="wrapper-seller-add-product">
            <Link to='/seller' className="back-to-index">
                <IoReturnUpBackOutline className="back-icon" />
                Trở lại
            </Link>
            <Form
                form={form}
                name="seller-register"
                className='seller-add-product'
                onFinish={onFinish}
                initialValues={{
                    name: product?.name,
                    price: Number(product?.price),
                    productUrl: product?.productUrls[0],
                    categoryId: product?.categoryId,
                }}
                disabled={loading}
                autoComplete="off"
            >
                <span className="infor-title">CẬP NHẬP SẢN PHẨM / ID:{id}</span>

                <div className="prod-information">
                    <div style={{ width: '100%' }} className="register-info-content">
                        <Row gutter={24}>
                            <Col span={16}>
                                <Form.Item<ProductRequest>
                                    label="Tên sản phẩm"
                                    labelCol={{ span: 24 }}
                                    name="name"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập tên sản phẩm!' },
                                    ]}
                                >
                                    <Input
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item<ProductRequest>
                                    label="Giá"
                                    labelCol={{ span: 24 }}
                                    name="price"
                                    rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}
                                >
                                    <InputNumber style={{ width: '100%' }} addonAfter="VND" defaultValue={0} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col span={8}>
                                <Form.Item<ProductRequest>
                                    label="Danh mục sản phẩm"
                                    labelCol={{ span: 24 }}
                                    name="categoryId"
                                    // initialValue={product.categoryId}
                                    rules={[{ required: true, message: 'Vui lòng chọn danh sản phẩm!' }]}
                                >
                                    <Select
                                        // defaultValue={product.categoryId}
                                        // value={product?.categoryId}
                                        // labelInValue={true}
                                        style={{ width: '100%' }}
                                        options={categorySelectList}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={16}>
                                <Form.Item<ProductRequest>
                                    label="Link sản phẩm"
                                    labelCol={{ span: 24 }}
                                    name="productUrl"
                                    rules={[{ required: true, message: 'Vui lòng nhập đường dẫn sản phẩm!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            name="productImageFiles"
                            label="Hình ảnh sản phẩm"
                            labelCol={{ span: 24 }}
                            rules={[{ required: true, message: 'Vui lòng tải ít nhất một hình ảnh về sản phẩm!' }]}
                        >
                            <Upload
                                multiple
                                listType="picture-card"
                                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                fileList={productImageFiles}
                                beforeUpload={() => false}
                                onChange={handleChangeProductImage}
                                onPreview={handleOpenPreview}
                            >
                                <button style={{ border: 0, background: 'none' }} type="button">
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </button>
                            </Upload>
                        </Form.Item>

                        <Button style={{ marginTop: '8px' }} type='primary' loading={loading} htmlType='submit'
                            size='large'
                            className="register-button">Cập nhập</Button>
                    </div>
                </div>
            </Form>


            {previewImage && (
                <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}

            {/*<form action="" className="seller-add-product">                */}
            {/*    <span className="infor-title">THÔNG TIN SẢN PHẨM</span>*/}
            {/*    <div className="prod-information">*/}
            {/*        <div className="prod-img-wrapper">*/}
            {/*            <label htmlFor="prod-img-upload-input" className="upload-img-label">*/}
            {/*                <FaUpload className="upload-icon"/>*/}
            {/*                Tải ảnh lên                            */}
            {/*            </label>*/}
            {/*            <img src={require('../../assets/img/product.png')} alt="" id="prod-img" />*/}
            {/*            <input type="file" src="" alt="" id="prod-img-upload-input" accept='.png, .jpg, .jpeg, .gif'/>*/}
            {/*        </div>*/}
            {/*        <div className="prod-infor-content">*/}
            {/*            <div className="prod-name-wrapper">*/}
            {/*                <label htmlFor="prod-name-input" className="prod-name-label">Tên sản phẩm<span style={{color: 'red'}}>*</span></label>*/}
            {/*                <input type="text" name="" id="prod-name-input" placeholder="Nhập tên sản phẩm"/>*/}
            {/*            </div>*/}
            {/*            <div className="category-name-wrapper">*/}
            {/*                <label htmlFor="category" className="category-name-label">Danh mục sản phẩm<span style={{color: 'red'}}>*</span></label>*/}
            {/*                <select name="" id="category">*/}
            {/*                    <option value="Telephone">Điện thoại di động</option>*/}
            {/*                    <option value="Laptop">Laptop</option>*/}
            {/*                    <option value="PC">PC</option>*/}
            {/*                </select>*/}
            {/*            </div>*/}
            {/*            <div className="prod-link-wrapper">*/}
            {/*                <label htmlFor="prod-link-input" className="prod-link-label">Link sản phẩm<span style={{color: 'red'}}>*</span></label>*/}
            {/*                <input type="url" name="" id="prod-link-input" placeholder="Dán URL"/>*/}
            {/*            </div>*/}
            {/*            <div className="note-wrapper">*/}
            {/*                <label htmlFor="note" className="note-label">Ghi chú</label>*/}
            {/*                <input type="text" id="note-input" placeholder="Nhập ghi chú (nếu có)"/>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <span className="prod-relation-title">SẢN PHẨM LIÊN QUAN</span>*/}
            {/*    <div className="prod-relation">*/}
            {/*        <div className="prod-relation-infor-row">*/}
            {/*            <div className="prod-relation-name-wrapper">*/}
            {/*                <label htmlFor="prod-relation-name-input" className="prod-relation-name-label">Tên sản phẩm</label>*/}
            {/*                <input type="text" id="prod-relation-name-input" placeholder="Nhập tên sản phẩm"/>*/}
            {/*            </div>*/}
            {/*            <div className="prod-relation-link-wrapper">*/}
            {/*                <label htmlFor="prod-relation-link-input" className="prod-relation-link-label">Link sản phẩm</label>*/}
            {/*                <input type="url" id="prod-relation-link-input" placeholder="Dán URL"/>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <button className="add-product-button">Thêm <FaPlus className="plus-icon"/></button>*/}
            {/*    </div>*/}
            {/*    <div className="save-cancel">*/}
            {/*        <button className="save-button">*/}
            {/*            Lưu*/}
            {/*            <FaSave className="save-icon"/>*/}
            {/*        </button>*/}
            {/*        <Link to="/seller" className="cancel-button">*/}
            {/*            Trở lại*/}
            {/*            <FaArrowLeft className="cancel-icon"/>*/}
            {/*        </Link>*/}
            {/*    </div>*/}
            {/*</form>*/}
        </div>
    }

    return <div>Loading</div>
}