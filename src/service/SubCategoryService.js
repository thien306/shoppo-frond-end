import axios from "axios";

const URL_SUBCATEGORY = "http://localhost:8080/api/subCategory";

const getAllHomeSubCategory = async () => {
    try {
        const token = localStorage.getItem('user');
        if (!token) {
            throw new Error('Không tìm thấy thông tin người dùng trong localStorage');
        }
        const url = `${URL_SUBCATEGORY}`;
        const res = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token
            }
        });
        return res.data;
    } catch (error) {
        console.error("Lỗi khi truy xuất tất cả danh mục phụ:", error.message);
        return [];
    }
};

export default getAllHomeSubCategory;
