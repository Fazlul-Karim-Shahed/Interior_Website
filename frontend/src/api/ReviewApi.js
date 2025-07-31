import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/review";

// Get all reviews
export const getAllReviewsApi = () => {
    return fetch(BASE_URL, { cache: "no-cache" })
        .then((res) => res.json())
        .catch((err) => ({
            message: `Something went wrong. - (${err.message}). Try again`,
            error: true,
        }));
};

// Get review by ID
export const getReviewByIdApi = (id) => {
    return fetch(`${BASE_URL}/${id}`, { cache: "no-cache" })
        .then((res) => res.json())
        .catch((err) => ({
            message: `Something went wrong. - (${err.message}). Try again`,
            error: true,
        }));
};

// Create a new review (multipart/form-data)
export const createReviewApi = (formData) => {
    return axios
        .post(BASE_URL, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization:
                    "Bearer " + localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_TOKEN_NAME),
            },
        })
        .then((res) => res.data)
        .catch((err) => ({
            message: `Something went wrong. - (${err.message}). Try again`,
            error: true,
        }));
};

// Update review by ID (multipart/form-data)
export const updateReviewApi = (id, formData) => {
    return axios
        .put(`${BASE_URL}/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization:
                    "Bearer " + localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_TOKEN_NAME),
            },
        })
        .then((res) => res.data)
        .catch((err) => ({
            message: `Something went wrong. - (${err.message}). Try again`,
            error: true,
        }));
};

// Delete review by ID
export const deleteReviewApi = (id) => {
    return axios
        .delete(`${BASE_URL}/${id}`, {
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_TOKEN_NAME),
            },
        })
        .then((res) => res.data)
        .catch((err) => ({
            message: `Something went wrong. - (${err.message}). Try again`,
            error: true,
        }));
};
