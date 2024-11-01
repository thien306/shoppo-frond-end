import React, { useState, useEffect } from 'react';
import * as productService from "../../../service/ProductService";
import { Button, TableRow, TableCell, colors } from "@mui/material";
import '..//..//..//css/Product.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { faWrench, faToggleOn, faToggleOff, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import ProductTooltip from '..//product/ProductTooltip';
import ProductColorAnnotationTool from '..//product/ProductColorAnnotationTool'
import ProductImages from './ProductImage';
import { toast } from "react-toastify";
import swal from "sweetalert2";
import 'bootstrap/dist/css/bootstrap.min.css';
import '..//..//..//css/CustomPhotoView.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProductCreate from '..//product/ProductCreact';
import ProductDetail from '../product/ProductDetail'
import ProductEdit from './ProductEdit';

function HomeProduct() {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [itemsToShow, setItemsToShow] = useState(5);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const handleShowCreateModal = () => setShowCreateModal(true);
    const handleCloseCreateModal = () => setShowCreateModal(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const handleCloseDetailModal = () => setShowDetailModal(false);
    const [selectedProductForDetail, setSelectedProductForDetail] = useState(null);
    const handleShowDetailModal = () => setShowDetailModal(true);
    const [selectedProductForEdit, setSelectedProductForEdit] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const handleShowEditModal = () => setShowEditModal(true);
    const handleCloseEditModal = () => setShowEditModal(false);

    const fetchHomeProduct = async () => {
        setLoading(true);
        try {
            const res = await productService.getAllProduct();
            setProduct(res);

        } catch (error) {
            console.error("Error while getting product list:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = () => {
        setItemsToShow(prevItems => prevItems + 5);
    };

    useEffect(() => {
        fetchHomeProduct();
    }, []);

    const handleSearch = async () => {
        setLoading(true);
        if (searchKeyword.trim() === "") {
            fetchHomeProduct(0);
        } else {
            try {
                const data = await productService.searchNameAndCategory(searchKeyword);
                if (!data || data?.length === 0) {
                    toast.info("Không có dữ liệu phù hợp.");
                    setProduct([]);
                } else {
                    setProduct(data);

                    setTimeout(() => {
                        setProduct(0);
                    }, 3000);
                }
            } catch (error) {
                toast.error("Đã xảy ra lỗi khi tìm kiếm.");
            }
        }

        setLoading(false);
    };

    const productHandlingDeactivate = async (id, currentStatus) => {
        const swalWithBootstrapButtons = swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });

        // Xác định nội dung thông báo dựa trên trạng thái hiện tại của sản phẩm
        const actionText = currentStatus === "ACTIVE" ? "ẩn" : "hiện";
        const confirmButtonText = currentStatus === "ACTIVE" ? "Đúng rồi, ẩn sản phẩm!" : "Đúng rồi, hiện sản phẩm!";
        const successMessage = currentStatus === "ACTIVE" ? "Sản phẩm của bạn đã được ẩn thành công." : "Sản phẩm của bạn đã được hiện thành công.";
        const failureMessage = currentStatus === "ACTIVE" ? "Ẩn sản phẩm không thành công." : "Hiện sản phẩm không thành công.";

        swalWithBootstrapButtons.fire({
            title: "Bạn có chắc không?",
            text: `Bạn sẽ không thể hoàn tác điều này! Bạn có muốn ${actionText} sản phẩm này?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: confirmButtonText,
            cancelButtonText: "Không, hủy đi!",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Gọi API để cập nhật trạng thái của sản phẩm
                let isUpdated = await productService.productDeactivation(id);
                if (isUpdated) {
                    swalWithBootstrapButtons.fire(
                        "Thành công!",
                        successMessage,
                        "success"
                    );

                    // Cập nhật trạng thái sản phẩm sau khi hành động thành công
                    setProduct((prevProducts) =>
                        prevProducts.map((product) =>
                            product.id === id
                                ? { ...product, status: currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE" }
                                : product
                        )
                    );
                } else {
                    swalWithBootstrapButtons.fire(
                        "Lỗi",
                        failureMessage,
                        "error"
                    );
                }
            } else if (result.dismiss === swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                    "Đã hủy",
                    "Sản phẩm của bạn vẫn an toàn :)",
                    "error"
                );
            }
        });
    };

    const handleDelete = async (id) => {
        const swalWithBootstrapButtons = swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: "Bạn có chắc không?",
            text: "Bạn sẽ không thể hoàn tác điều này!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Đúng rồi, xóa sản phẩm",
            cancelButtonText: "Không, hủy đi!",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                let isDeleted = await productService.deleteProduct(id);
                if (isDeleted) {
                    swalWithBootstrapButtons.fire(
                        "Đã xóa!",
                        "Sản phẩm của bạn đã được xóa.",
                        "success"
                    );
                    fetchHomeProduct();
                } else {
                    swalWithBootstrapButtons.fire(
                        "Lỗi",
                        "Xóa sản phẩm không thành công.",
                        "error"
                    );
                }
            } else if (result.dismiss === swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                    "Đã hủy",
                    "Sản phẩm của bạn vẫn an toàn :)",
                    "error"
                );
            }
        });
    };

    const productDetails = async (id) => {
        try {
            const product = await productService.findProduct(id)
            setSelectedProductForDetail(product);
            handleShowDetailModal(true)
        } catch (error) {
            toast.error("Lỗi khi lấy chi tiết sản Phẩm");
        }
    };

    const handleEdit = async (id) => {
        try {
            const product = await productService.findProduct(id);
            setSelectedProductForEdit(product);
            handleShowEditModal();
        } catch (error) {
            toast.error("Có lỗi xảy ra khi lấy dữ liệu giao dịch!");
        }
    };

    return (
        <div className="table-product">
            <h3 className="product-heading">Danh Sách Sản Phẩm</h3>

            <div className="top-bar">
                <Button className="btn btn-success btn-success-light" variant="primary" onClick={handleShowCreateModal}>
                    Thêm Sản Phẩm
                </Button>

                <div className="search-bar-client">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên và danh mục"

                        value={searchKeyword}
                        onChange={(e) => {
                            setSearchKeyword(e.target.value);

                            if (e.target.value.trim() === "") {
                                fetchHomeProduct(0);
                            } else {
                                setTimeout(() => {
                                    fetchHomeProduct(0);
                                }, 3000);
                            }
                        }}
                    />

                    <button className="btn btn-outline-info btn-sm" onClick={handleSearch}>
                        <i className="bi bi-search"></i>
                    </button>
                </div>
            </div>

            <table className="table table-hover table-bordered product">
                <thead className="thead-product">
                    <tr>
                        <th>STT</th>
                        <th>Tên Sản Phẩm</th>
                        <th>Miêu Tả</th>
                        <th>Giá</th>
                        <th>Số Lượng</th>
                        <th>Thời Gian</th>
                        <th>Size</th>
                        <th>Màu Sắc</th>
                        <th>Hình Ảnh</th>
                        <th>Trạng Thái</th>
                        <th>Quản Lý</th>

                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(product) && product.length > 0 ? (
                        product.slice(0, itemsToShow).map((product, index) => (
                            <tr key={product.id}>
                                <td className={product.status === 'INACTIVE' ? 'row-inactive' : ''}>{index + 1}</td>
                                <td className={product.status === 'INACTIVE' ? 'row-inactive' : ''}>{product.name}</td>
                                <td className={product.status === 'INACTIVE' ? 'row-inactive' : ''}><ProductTooltip description={product.description} /></td>
                                <td className={product.status === 'INACTIVE' ? 'row-inactive' : ''}>{product.price.toLocaleString()} VND</td>
                                <td className={product.status === 'INACTIVE' ? 'row-inactive' : ''}>{product.stock}</td>
                                <td className={product.status === 'INACTIVE' ? 'row-inactive' : ''}
                                >{new Date(product.createdDate).toLocaleDateString()}</td>
                                <td className={`size-cell ${product.status === 'INACTIVE' ? 'row-inactive' : ''}`}>
                                    {product.sizes.map((size, index) => (
                                        <span key={index}>{size}</span>
                                    ))}
                                </td>
                                <td className={product.status === 'INACTIVE' ? 'row-inactive' : ''}>
                                    <ProductColorAnnotationTool colors={product.colors} />  </td>
                                <td className={product.status === 'INACTIVE' ? 'row-inactive' : ''}
                                    variant="primary">
                                    <ProductImages images={product.images}></ProductImages>
                                </td>
                                <td className={product.status === 'INACTIVE' ? 'row-inactive' : ''}>{product.status}</td>
                                <td className="quan-ly-cell">
                                    <div className="btn-group">
                                        <Button className="btn btn-info btn-sm me-2" variant="primary" onClick={() => handleEdit(product.id)}>
                                            <FontAwesomeIcon icon={faWrench} style={{ color: "#c01111", fontSize: "18px" }} />
                                        </Button>
                                        <Button
                                            className="btn btn-info btn-sm me-2"
                                            onClick={() => productHandlingDeactivate(product.id, product.status)}
                                            variant="primary"
                                        >
                                            {product.status === "ACTIVE" ? (
                                                <FontAwesomeIcon icon={faToggleOff} style={{ color: "#00FF00", fontSize: "18px" }} />
                                            ) : (
                                                <FontAwesomeIcon icon={faToggleOn} style={{ color: "#FFD43B", fontSize: "18px" }} />
                                            )}
                                        </Button>

                                        <Button className="btn btn-info btn-sm" onClick={() => productDetails(product.id)}>
                                            <FontAwesomeIcon icon={faEye} rotation={180} style={{ color: "#7027b9", fontSize: "18px" }} />
                                        </Button>


                                        <Button className="btn btn-info btn-sm" onClick={() => handleDelete(product.id)}>
                                            <FontAwesomeIcon icon={faTrash} style={{ color: "#FF0000", fontSize: "18px" }} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={11}>Không có dữ liệu</td>
                        </tr>
                    )}
                </tbody>

            </table>

            <div className="text-center mt-3">
                {itemsToShow < product.length && (
                    <Button
                        className="btn btn-success btn-sm"
                        onClick={handleLoadMore}
                    >
                        XEM THÊM
                    </Button>
                )}
            </div>

            <ProductCreate
                showModal={showCreateModal}
                handleClose={handleCloseCreateModal}
                onProductAdded={fetchHomeProduct}
            />

            {showDetailModal && (
                <ProductDetail
                    product={selectedProductForDetail} 
                    handleClose={handleCloseDetailModal}
                />
            )}



            <ProductEdit
                showModal={showEditModal}
                handleClose={() => {
                    handleCloseEditModal();
                    fetchHomeProduct(0);
                }}
                product={selectedProductForEdit}
            />

        </div >
    );
}



export default HomeProduct;
