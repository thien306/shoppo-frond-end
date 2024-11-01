import axios from "axios";

const URT_COLOR = "http://localhost:8080/api/color";

const getallColor = async () => {
    try {
        const url = `${URT_COLOR}`;
        const res = await axios.get(url);  
        return res.data;
    } catch (error) {
        console.error("Lỗi khi truy xuất màu sắc:", error.message);
        return [];
    }
}

export default getallColor;
