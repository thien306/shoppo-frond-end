import React, { useState, useEffect } from 'react';
import getallColor from "../../service/ColorService";
import { Button, TableRow, TableCell, colors } from "@mui/material";
import '../../css/Color.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";

function HomeColors() {
    const [color, setColor] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [itemsToShow, setItemsToShow] = useState(5);  // Hiển thị 10 mục ban đầu

    const fetchHomeColors = async () => {
        setLoading(true);
        try {
            const data = await getallColor();
            setColor(data);
        } catch (error) {
            console.error("Error while getting color list:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHomeColors();
    }, []);

    const handleLoadMore = () => {
        setItemsToShow(prevItems => prevItems + 5);
    };



    return (
        <div className="table-color">
            <h3 className="color-heading">Danh Sách Danh Mục</h3>

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
                                fetchHomeColors(0);
                            } else {
                                setTimeout(() => {
                                    fetchHomeColors(0);
                                }, 3000);
                            }
                        }}
                    />

                    <button className="btn btn-outline-info btn-sm" >
                        <i className="bi bi-search"></i>
                    </button>
                </div>
            </div>


            <table className="table table-hover table-bordered color">
                <thead className="thead-color">
                    <tr>
                        <th>STT</th>
                        <th>Tên Màu sắc</th>
                        <th>Quản Lý</th>
                    </tr>
                </thead>
                <tbody>
                    {color.slice(0, itemsToShow).map((color, index) => (
                        <TableRow key={color.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{color.colorName}</TableCell>
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
                {itemsToShow < color.length && (
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

export default HomeColors;
