import React, { useEffect } from "react";
import { Formik, Field } from "formik";
import '../../../css/ProductDetail.css';
import Button from "react-bootstrap/Button";

const ProductDetail = ({ product, handleClose }) => {
    if (!product) {
        return null;
    }    


    return (
        <>
            <div className="overlay" onClick={handleClose}></div> 
            <div className="product-detail">
                <div className="product-detail-header">
                    <Button onClick={handleClose} className="close-button">×</Button>
                </div>
                <Formik
                    initialValues={{
                        id: product.id || "",
                        name: product.name || "",
                        description: product.description || "",
                        price: product.price ? product.price.toLocaleString() + " VND" : "",
                        stock: product.stock || "",
                        brand: product.brand ? product.brand : "",
                        color: product.colors ? product.colors.join(', ') : "",
                        size: product.sizes ? product.sizes.join(', ') : "",
                        status: product.status || "",
                        subCategory: product.subCategory ? product.subCategory : "",
                        createdDate: product.createdDate ? new Date(product.createdDate).toLocaleDateString() : "",
                        images: product.images ? product.images.map(img => img.url).join(', ') : "",
                    }}
                >
                    {() => (
                        <form>
                            <h5>Thông Tin Sản Phẩm</h5>
                            <div className="form-group-detail">
                                <label>Tên Sản Phẩm</label>
                                <Field name="name" type="text" className="form-control" disabled />
                            </div>
                            <div className="form-group-detail">
                                <label>Miêu tả Sản Phẩm</label>
                                <Field name="description" type="textarea" className="form-control" disabled />
                            </div>
                            <div className="form-group-detail">
                                <label>Giá Sản Phẩm</label>
                                <Field name="price" type="text" className="form-control" disabled />
                            </div>
                            <div className="form-group-detail">
                                <label>Số Lượng Sản Phẩm</label>
                                <Field name="stock" type="text" className="form-control" disabled />
                            </div>
                            <div className="form-group-detail">
                                <label>Thương Hiệu</label>
                                <Field name="brand" type="text" className="form-control" disabled />
                            </div>
                            <div className="form-group-detail">
                                <label>Màu Sắc Sản Phẩm</label>
                                <Field name="color" type="text" className="form-control" disabled />
                            </div>
                            <div className="form-group-detail">
                                <label>Kích Thước Sản Phẩm</label>
                                <Field name="size" type="text" className="form-control" disabled />
                            </div>
                            <div className="form-group-detail">
                                <label>Trạng Thái Sản Phẩm</label>
                                <Field name="status" type="text" className="form-control" disabled />
                            </div>
                            <div className="form-group-detail">
                                <label>Danh Mục Sản Phẩm</label>
                                <Field name="subCategory" type="text" className="form-control" disabled />
                            </div>
                            <div className="form-group-detail">
                                <label>Ngày Thêm Mới</label>
                                <Field name="createdDate" type="text" className="form-control" disabled />
                            </div>
                            <div className="form-group-detail">
                                <div className="image-gallery">
                                    {product.images && product.images.length > 0 ? (
                                        product.images.map((img, index) => (
                                            <img
                                                key={index}
                                                src={img}
                                                alt={`product-${index}`}                                            />
                                        ))
                                    ) : (
                                        <p>Không có hình ảnh</p>
                                    )}
                                </div>
                            </div>
                            
                        </form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default ProductDetail;
