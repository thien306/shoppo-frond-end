import axios from "axios";

const URL_CATEGORIES = "http://localhost:8080/api/categories";

const getAllHomeCategories = async () => {
    try {
        const token = localStorage.getItem('user')
        if (!token) {
            throw new Error('Không tìm thấy thông tin người dùng trong localStorage');
        }
        const url = `${URL_CATEGORIES}`;
        const res = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token
            }
        });
        return res.data;
    } catch (error) {
        console.error("Lỗi khi truy xuất tất cả danh mục:", error.message);
        return [];
    }
};

export const categoriesDeactivation = async (id) => {
    try {
        await axios.put(`${URL_CATEGORIES}/${id}/toggle-status`);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export default getAllHomeCategories;
