import React, { useState, useEffect } from 'react';
import getAllHomeCategories from "../../../service/CategoriesService";
import { Button, TableRow, TableCell, colors } from "@mui/material";
import '..//..//..//css/Categories.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench, faTrash, faEye, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";
import swal from "sweetalert2";

function HomeCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [itemsToShow, setItemsToShow] = useState(5);  // Hiển thị 10 mục ban đầu

    const fetchHomeCategories = async () => {
        setLoading(true);
        try {
            const data = await getAllHomeCategories();
            setCategories(data);
        } catch (error) {
            console.error("Error while getting categories list:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHomeCategories();
    }, []);

    const handleLoadMore = () => {
        setItemsToShow(prevItems => prevItems + 5);
    };

    const categoriesHandlingDeactivate = async (id, currentStatus) => {
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
                let isUpdated = await categories.categoriesDeactivation(id);
                if (isUpdated) {
                    swalWithBootstrapButtons.fire(
                        "Thành công!",
                        successMessage,
                        "success"
                    );

                    // Cập nhật trạng thái sản phẩm sau khi hành động thành công
                    setCategories((prevCategories) =>
                        prevCategories.map((categories) =>
                            categories.id === id
                                ? { ...categories, status: currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE" }
                                : categories
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

    return (
        <div className="table-categories">
            <h3 className="categories-heading">Danh Sách Danh Mục</h3>

            <div className="top-bar">
                <Button className="btn btn-success btn-success-light" variant="primary">
                    Thêm danh Mục
                </Button>

                <div className="search-bar-client">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên và danh mục"

                        value={searchKeyword}
                        onChange={(e) => {
                            setSearchKeyword(e.target.value);

                            if (e.target.value.trim() === "") {
                                fetchHomeCategories(0);
                            } else {
                                setTimeout(() => {
                                    fetchHomeCategories(0);
                                }, 3000);
                            }
                        }}
                    />

                    <button className="btn btn-outline-info btn-sm" >
                        <i className="bi bi-search"></i>
                    </button>
                </div>
            </div>


            <table className="table table-hover table-bordered categories">
                <thead className="thead-categories">
                    <tr>
                        <th>STT</th>
                        <th>Tên Danh Mục</th>
                        <th>Thời Gian</th>
                        <th>Trạng Thái</th>
                        <th>Quản Lý</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.slice(0, itemsToShow).map((categories, index) => (
                        <TableRow key={categories.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{categories.name}</TableCell>
                            <TableCell>{new Date(categories.createdDate).toLocaleDateString()}</TableCell>
                            <TableCell>{categories.status}</TableCell>
                            <TableCell>
                                <Button className="btn btn-info btn-sm me-2" variant="primary">
                                    <FontAwesomeIcon icon={faWrench} style={{ color: "#c01111" }} />
                                </Button>
                                <Button
                                    className="btn btn-info btn-sm me-2"
                                    onClick={() => categoriesHandlingDeactivate(categories.id, categories.status)}
                                    variant="primary"
                                >
                                    {categories.status === "ACTIVE" ? (
                                        <FontAwesomeIcon icon={faToggleOff} style={{ color: "#00FF00", fontSize: "18px" }} />
                                    ) : (
                                        <FontAwesomeIcon icon={faToggleOn} style={{ color: "#FFD43B", fontSize: "18px" }} />
                                    )}
                                </Button>
                                <Button className="btn btn-info btn-sm me-2" variant="primary">
                                    <FontAwesomeIcon icon={faTrash} style={{ color: "#FFD43B" }} />
                                </Button>
                                <Button className="btn btn-info btn-sm">
                                    <FontAwesomeIcon icon={faEye} rotation={180} style={{ color: "#7027b9" }} />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>


            </table>

            <div className="text-center mt-3">
                {itemsToShow < categories.length && (
                    <Button
                        className="btn btn-success btn-sm"
                        onClick={handleLoadMore}
                    >
                        XEM THÊM
                    </Button>
                )}
            </div>


        </div>
    );
}

export default HomeCategories;
