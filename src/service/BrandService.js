import axios from "axios";

const URT_BRAND = "http://localhost:8080/api/brand";

const getallBrand = async () => {
    try {
        const url = `${URT_BRAND}`;
        const res = await axios.get(url);        
        return res.data;
    } catch (error) {
        console.error("Lỗi khi truy xuất Thương Hiệu:", error.message);
        return [];
    }
}

export default getallBrand ;
