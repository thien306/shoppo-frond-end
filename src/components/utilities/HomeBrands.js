import React, { useState, useEffect } from 'react';
import getallBrand from "../../service/BrandService";
import { Button, TableRow, TableCell, colors } from "@mui/material";
import '../../css/Brand.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";

function HomeBrands() {
    const [brand, setBrand] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [itemsToShow, setItemsToShow] = useState(10);  // Hiển thị 10 mục ban đầu

    const fetchHomeBrands = async () => {
        setLoading(true);
        try {
            const data = await getallBrand();
            setBrand(data);
        } catch (error) {
            console.error("Error while getting brand list:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHomeBrands();
    }, []);

    const handleLoadMore = () => {
        setItemsToShow(prevItems => prevItems + 5);
    };



    return (
        <div className="table-brand">
            <h3 className="brand-heading">Danh Sách Danh Mục</h3>

            <div className="top-bar">
                <Button className="btn btn-success btn-success-light" variant="primary">
                    Thêm Màu Sắc
                </Button>

                <div className="search-bar-client">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên và danh mục"

                        value={searchKeyword}
                        onChange={(e) => {
                            setSearchKeyword(e.target.value);

                            if (e.target.value.trim() === "") {
                                fetchHomeBrands(0);
                            } else {
                                setTimeout(() => {
                                    fetchHomeBrands(0);
                                }, 3000);
                            }
                        }}
                    />

                    <button className="btn btn-outline-info btn-sm" >
                        <i className="bi bi-search"></i>
                    </button>
                </div>
            </div>


            <table className="table table-hover table-bordered brand">
                <thead className="thead-brand">
                    <tr>
                        <th>STT</th>
                        <th>Tên Màu sắc</th>
                        <th>Quản Lý</th>
                    </tr>
                </thead>
                <tbody>
                    {brand.slice(0, itemsToShow).map((brand, index) => (
                        <TableRow key={brand.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{brand.name}</TableCell>
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
                {itemsToShow < brand.length && (
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

export default HomeBrands;
