import React, { useState, useEffect } from 'react';
import getAllHomeSubCategory from "../../../service/SubCategoryService";
import { Button, TableRow, TableCell, colors } from "@mui/material";
import '..//..//..//css/SubCategory.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";

function HomeSubCategory() {
    const [subCategory, setSubCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [itemsToShow, setItemsToShow] = useState(5);  // Hiển thị 10 mục ban đầu

    const fetchHomeSubCategory = async () => {
        setLoading(true);
        try {
            const data = await getAllHomeSubCategory();
            setSubCategory(data);
        } catch (error) {
            console.error("Error while getting subCategory list:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHomeSubCategory();
    }, []);

    const handleLoadMore = () => {
        setItemsToShow(prevItems => prevItems + 5);
    };



    return (
        <div className="table-subCategory">
            <h3 className="subCategory-heading">Danh Sách Danh Mục Phụ</h3>

            <div className="top-bar">
                <Button className="btn btn-success btn-success-light" variant="primary">
                    Thêm danh Mục Phụ
                </Button>

                <div className="search-bar-client">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên và danh mục phụ"

                        value={searchKeyword}
                        onChange={(e) => {
                            setSearchKeyword(e.target.value);

                            if (e.target.value.trim() === "") {
                                fetchHomeSubCategory(0);
                            } else {
                                setTimeout(() => {
                                    fetchHomeSubCategory(0);
                                }, 3000);
                            }
                        }}
                    />

                    <button className="btn btn-outline-info btn-sm" >
                        <i className="bi bi-search"></i>
                    </button>
                </div>
            </div>


            <table className="table table-hover table-bordered subCategory">
                <thead className="thead-subCategory">
                    <tr>
                        <th>STT</th>
                        <th>Tên Danh Mục Phụ</th>
                        <th>Thời Gian</th>
                        <th>Trạng Thái</th>
                        <th>Quản Lý</th>
                    </tr>
                </thead>
                <tbody>
                    {subCategory.slice(0, itemsToShow).map((subCategory, index) => (
                        <TableRow key={subCategory.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{subCategory.name}</TableCell>
                            <TableCell>{new Date(subCategory.createdDate).toLocaleDateString()}</TableCell>
                            <TableCell>{subCategory.status}</TableCell>
                            <TableCell>
                                <Button className="btn btn-info btn-sm me-2" variant="primary">
                                    <FontAwesomeIcon icon={faWrench} style={{ color: "#c01111" }} />
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
                {itemsToShow < subCategory.length && (
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

export default HomeSubCategory;
