import React, { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as productService from "..//..//..//service/ProductService";
import getAllHomeSubCategory from '..//..//..//service/SubCategoryService';
import sizeService from '..//..//..//service/SizeService';
import getallColor from '..//..//..//service/ColorService';
import getallBrand from '..//..//..//service/BrandService';
import { toast } from "react-toastify";
import Modal from 'react-bootstrap/Modal';
import Select from "react-select";
import Button from "react-bootstrap/Button";
import '..//..//..//css/ProductCreate.css';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageDb } from '..//..//..//firebase/Config';
import { v4 } from "uuid";

const ProductCreate = ({ showModal, handleClose, onProductAdded }) => {
    const [subCategory, setSubcategory] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [brand, setBrand] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);  // Để quản lý file hình ảnh
    const [currentDateTime, setCurrentDateTime] = useState('');

    const fetchData = async () => {
        let subCategoryData = await getAllHomeSubCategory();
        setSubcategory(subCategoryData.map(subCategory => ({ value: subCategory.id, label: subCategory.name })));
        let colorData = await getallColor();
        setColors(colorData.map(colors => ({ value: colors.id, label: colors.colorName })));
        let sizeData = await sizeService.getAllSize();
        setSizes(sizeData.map(sizes => ({ value: sizes.id, label: sizes.sizeName })));
        let brandData = await getallBrand();
        setBrand(brandData.map(brand => ({ value: brand.id, label: brand.name })));
    };

    useEffect(() => {
        const getCurrentDateTime = () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = ('0' + (now.getMonth() + 1)).slice(-2); // Lấy tháng (bắt đầu từ 0)
            const day = ('0' + now.getDate()).slice(-2);
            const hours = ('0' + now.getHours()).slice(-2);
            const minutes = ('0' + now.getMinutes()).slice(-2);
            const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
            return formattedDateTime;
        };
        setCurrentDateTime(getCurrentDateTime());
        fetchData();
    }, []);

    const handleRemoveImage = (index, formik) => {
        const updatedImages = [...formik.values.images]; // Sao chép mảng hiện tại
        updatedImages.splice(index, 1); // Xóa ảnh tại vị trí index
        formik.setFieldValue("images", updatedImages); // Cập nhật lại giá trị formik
        setImagePreviews(prev => prev.filter((_, i) => i !== index)); // Cập nhật lại imagePreviews để hiển thị
    };

    const handleImageUpload = async (file) => {
        const imgRef = ref(imageDb, `files/${v4()}`);
        const snapshot = await uploadBytes(imgRef, file);
        const url = await getDownloadURL(snapshot.ref);
        return url;
    };

    const saveProduct = async (product) => {
        try {
            if (imageFiles.length === 0) {
                throw new Error("Chưa có hình ảnh nào được chọn");
            }
            const uploadedUrls = await Promise.all(imageFiles.map(file => handleImageUpload(file)));
            const colors = product.colors.map(color => color.value)
            const sizes = product.sizes.map(size => size.value)

            let dataRequest = {
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                brand: product.brand ? product.brand : null,
                subCategory: product.subCategory ? product.subCategory : null,
                colors: colors,
                sizes: sizes,
                images: uploadedUrls,
                status: "ACTIVE",
                createdDate: product.createdDate || new Date().toISOString()
            };

            if (!product || !product.name || !product.description || !product.price) {
                throw new Error("Dữ liệu sản phẩm không đầy đủ");
            }
            const response = await productService.saveProduct(dataRequest);
            if (response && response.status === "OK") {
                toast.success("Thêm mới thành công");
                handleClose();
                if (onProductAdded) onProductAdded();
            } else {
                toast.error("Thêm mới thất bại");
            }
        } catch (error) {
            console.error("Lỗi trong quá trình lưu sản phẩm:", error);
            toast.error("Đã xảy ra lỗi: " + error.message);
        }
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        await saveProduct(values);
        setSubmitting(false);
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Thêm Mới Sản Phẩm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        name: "",
                        description: "",
                        price: "",
                        stock: "",
                        brand: [],
                        subCategory: [],
                        colors: [],
                        sizes: [],
                        images: [],
                        status: "ACTIVE",
                        createdDate: currentDateTime
                    }}
                    // validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                // validateOnChange={true}
                // validateOnBlur={true}
                >
                    {(formik, isSubmitting) => (
                        <Form>
                            <div className="form-group">
                                <label>Tên Sản Phẩm</label>
                                <Field name="name" type="text" className="form-control" />
                                <ErrorMessage name="name" component="div" className="text-danger" />
                            </div>

                            <div className="form-group">
                                <label>Miêu Tả Sản phẩm</label>
                                <Field
                                    as="textarea"  // Sử dụng textarea thay vì input
                                    name="description"
                                    className="form-control"
                                    rows="3"  // Số dòng mặc định
                                    style={{ resize: "vertical" }}  // Cho phép thay đổi chiều cao (resize)
                                />
                                <ErrorMessage name="description" component="div" className="text-danger" />
                            </div>

                            <div className="form-group">
                                <label>Giá Sản Phẩm</label>
                                <Field name="price" type="text" className="form-control" />
                                <ErrorMessage name="price" component="div" className="text-danger" />
                            </div>

                            <div className="form-group">
                                <label>Số Lượng Sản Phẩm</label>
                                <Field name="stock" type="text" className="form-control" />
                                <ErrorMessage name="stock" component="div" className="text-danger" />
                            </div>

                            <div className="form-group">
                                <label>Hình Ảnh</label>
                                <input
                                    name="images"
                                    type="file"
                                    className="form-control"
                                    multiple
                                    accept="image/*"
                                    onChange={(event) => {
                                        const files = Array.from(event.target.files);
                                        formik.setFieldValue("images", [...formik.values.images, ...files]);
                                        setImageFiles((prev) => [...prev, ...files]);  // Lưu file để upload sau
                                        const previewUrls = files.map(file => URL.createObjectURL(file));
                                        setImagePreviews((prev) => [...prev, ...previewUrls]);
                                    }}
                                />
                                <ErrorMessage name="images" component="div" className="text-danger" />
                            </div>

                            <div className="form-group">
                                <div className="image-previews">
                                    {imagePreviews.length > 0 ? (
                                        <PhotoProvider>
                                            {imagePreviews.map((imageSrc, index) => (
                                                <div key={index} style={{ display: "inline-block", marginRight: "10px" }}>
                                                    <PhotoView src={imageSrc}>
                                                        <img
                                                            src={imageSrc}
                                                            alt={`preview-${index}`}
                                                            style={{ width: "100px", cursor: "pointer" }}
                                                        />
                                                    </PhotoView>
                                                    <button type="button" onClick={() => handleRemoveImage(index, formik)}>&times;</button>
                                                </div>
                                            ))}
                                        </PhotoProvider>
                                    ) : (
                                        <p>Chưa có hình ảnh nào được chọn</p>
                                    )}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Thương Hiệu</label>
                                <Select
                                    name="brand"
                                    options={brand}
                                    onChange={(option) => formik.setFieldValue("brand", option ? option.value : '')}
                                    value={brand.find(option => option.value === formik.values.brand)}
                                    placeholder="Chọn Danh Thương Hiệu"
                                />
                                <ErrorMessage name="subcategory" component="div" className="text-danger" />
                            </div>

                            <div className="form-group">
                                <label>Danh Mục Phụ</label>
                                <Select
                                    name="subcategory"
                                    options={subCategory}
                                    onChange={(option) => formik.setFieldValue("subCategory", option ? option.value : '')}
                                    value={subCategory.find(option => option.value === formik.values.subcategory)}
                                    placeholder="Chọn Danh Mục Phụ"
                                />
                                <ErrorMessage name="subcategory" component="div" className="text-danger" />
                            </div>

                            <div>
                                <div className="form-group">
                                    <label htmlFor="colors">Màu Sắc</label>
                                    <Select
                                        name="colors"
                                        options={colors} // Danh sách màu
                                        isMulti
                                        onChange={(selectedOptions) => {
                                            formik.setFieldValue("colors", selectedOptions); // Lưu toàn bộ đối tượng, không chỉ value
                                        }}
                                        value={formik.values.colors} // Hiển thị các giá trị đã chọn
                                        placeholder="Chọn Màu Sắc"
                                    />
                                    <ErrorMessage name="colors" component="div" className="text-danger" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="sizes">Kích Thước</label>
                                    <Select
                                        name="sizes"
                                        options={sizes} // Danh sách kích thước
                                        isMulti
                                        onChange={(selectedOptions) => {
                                            formik.setFieldValue("sizes", selectedOptions); // Lưu toàn bộ đối tượng, không chỉ value
                                        }}
                                        value={formik.values.sizes} // Hiển thị các giá trị đã chọn
                                        placeholder="Chọn Kích Thước"
                                    />
                                    <ErrorMessage name="sizes" component="div" className="text-danger" />
                                </div>

                                <div className="form-group">
                                    <label>Ngày và Giờ Thêm Sản Phẩm</label>
                                    <Field
                                        name="createdDate"
                                        type="datetime-local"
                                        className="form-control"
                                        value={currentDateTime}  // Set giá trị mặc định là thời gian hiện tại
                                    />
                                    <ErrorMessage name="createdDate" component="div" className="text-danger" />
                                </div>
                            </div>

                            <button className="btn btn-primary mt-3" type="submit" disabled={isSubmitting}>Lưu</button>
                            <Button variant="secondary" className="btn btn-primary mt-3" onClick={handleClose}>Đóng</Button>

                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default ProductCreate;
