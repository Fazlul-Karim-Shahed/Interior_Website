import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/videos";
const TOKEN = localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_TOKEN_NAME);

// Common Axios config
const config = {
    headers: {
        Authorization: `Bearer ${TOKEN}`,
    },
};

// ✅ Create Video
export const createVideoApi = async (data) => {
    try {
        const res = await axios.post(BASE_URL, data, {
            ...config,
            headers: {
                ...config.headers,
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    } catch (error) {
        return {
            error: true,
            message: error?.response?.data?.message || error.message,
        };
    }
};

// ✅ Update Video
export const updateVideoApi = (id, obj) => {
    return axios
        .put(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/videos/" + id, obj, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_TOKEN_NAME),
            },
        })
        .then((response) => response.data)
        .catch((error) => {
            return { message: `Something went wrong. - (${error.message}). Try again`, error: true };
        });
};


// ✅ Delete Video
export const deleteVideoApi = async (id) => {
    try {
        const res = await axios.delete(`${BASE_URL}/${id}`, config);
        return res.data;
    } catch (error) {
        return {
            error: true,
            message: error?.response?.data?.message || error.message,
        };
    }
};

// ✅ Get All Videos
export const getAllVideoApi = () => {
    return axios
        .get(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/videos")
        .then((response) => response.data)
        .catch((error) => {
            return { message: `Failed to load settings - (${error.message})`, error: true };
        });
};
