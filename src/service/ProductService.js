import axios from "axios";

const URL_PRODUCT = "http://localhost:8080/api/products"

export const getAllHomeProduct = async () => {
    try {
        const token = localStorage.getItem('user');
        if (!token) {
            throw new Error('Không tìm thấy thông tin người dùng trong localStorage');
        }
        const url = `${URL_PRODUCT}`;
        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error("Lỗi khi truy xuất tất cả giao dịch:", error.message);
        return [];
    }
}

export const getAllProduct = async () => {
    try {
        const url = `${URL_PRODUCT}/allProduct`;
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        console.error("Lỗi khi truy xuất tất cả giao dịch:", error.message);
        return [];
    }
}

export const getAllTotalHomeProducts = async () => {
    try {
        const token = localStorage.getItem('user');

        if (!token) {
            throw new Error('Không tìm thấy thông tin người dùng trong localStorage');
        }
        const res = await axios.get(URL_PRODUCT, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data.totalElements;
    } catch (error) {
        console.error("Lỗi khi truy xuất số lượng sản phẩm:", error.message);
        return 0;
    }
};

export const searchNameAndCategory = async (keyword) => {
    try {
        let query = `/search/${keyword}`;
        console.log('Query:', query);
        let res = await axios.get(URL_PRODUCT + query);
        console.log('Response:', res.data);
        return res.data.content;
    } catch (e) {
        console.log("Lỗi khi truy xuất giao dịch:", e);
        return [];
    }
};


export const saveProduct = async (product) => {
    try {
        const token = localStorage.getItem('user');
        console.log("token", localStorage.getItem('user'));
        if (!token) {
            throw new Error('Không tìm thấy thông tin người dùng trong localStorage');
        }
 
        const response = await axios.post(URL_PRODUCT, product, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
        });

        return response.data;
    } catch (error) {
        console.error("Lỗi khi truy xuất tất sản phẩm:", error.message);
        return [];
    }
};


export const productDeactivation = async (id) => {
    try {
        await axios.put(`${URL_PRODUCT}/${id}/toggle-status`);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}


export const deleteProduct = async (id) => {
    try {
        const token = localStorage.getItem('user');
        console.log("token", localStorage.getItem('user'));
        if (!token) {
            throw new Error('Không tìm thấy thông tin người dùng trong localStorage');
        }
 
        axios.delete(URL_PRODUCT + "/" + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
        });

        return true;
    } catch (error) {
        console.error("Lỗi khi truy xuất tất sản phẩm:", error.message);
        return false;
    }
}

export const findProduct = async (id) => {
    try {
        let res = await axios.get(URL_PRODUCT + "/" + id);
        return res.data;
    } catch (error) {
        console.error("Lỗi khi truy xuất tất sản phẩm:", error.message);
    }
}

export const EditProduct = async (id, product) => {
    try {
        const token = localStorage.getItem('user');
        if (!token) {
            throw new Error('Không tìm thấy thông tin người dùng trong localStorage');
        }
 
        const response = await axios.put(`${URL_PRODUCT}/${id}`, product, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
        });
        console.log("Phản hồi từ API:", response);
        console.log("response",response);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi truy xuất tất sản phẩm:", error.message);
        return [];
    }
};

