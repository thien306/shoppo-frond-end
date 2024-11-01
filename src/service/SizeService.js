import axios from "axios";

const URL_SIZE = "http://localhost:8080/api/size";

export const getAllSize = async () => {
    try {
        const url = `${URL_SIZE}`;
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        console.error("Lỗi khi truy xuất size:", error.message);
        return [];
    }
}

export default { getAllSize};
