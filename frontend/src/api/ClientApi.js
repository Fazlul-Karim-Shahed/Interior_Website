import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/client";

// Get all clients
export const getAllClientsApi = () => {
    return fetch(BASE_URL, { cache: "no-cache" })
        .then((res) => res.json())
        .catch((err) => ({
            message: `Something went wrong. - (${err.message}). Try again`,
            error: true,
        }));
};

// Get a single client by ID
export const getClientByIdApi = (id) => {
    return fetch(`${BASE_URL}/${id}`, { cache: "no-cache" })
        .then((res) => res.json())
        .catch((err) => ({
            message: `Something went wrong. - (${err.message}). Try again`,
            error: true,
        }));
};

// Create a new client (multipart/form-data)
export const createClientApi = (formData) => {
    return axios
        .post(BASE_URL, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_TOKEN_NAME),
            },
        })
        .then((res) => res.data)
        .catch((err) => ({
            message: `Something went wrong. - (${err.message}). Try again`,
            error: true,
        }));
};

// Update client by ID (multipart/form-data)
export const updateClientApi = (id, formData) => {
    return axios
        .put(`${BASE_URL}/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_TOKEN_NAME),
            },
        })
        .then((res) => res.data)
        .catch((err) => ({
            message: `Something went wrong. - (${err.message}). Try again`,
            error: true,
        }));
};

// Delete client by ID
export const deleteClientApi = (id) => {
    return axios
        .delete(`${BASE_URL}/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_TOKEN_NAME),
            },
        })
        .then((res) => res.data)
        .catch((err) => ({
            message: `Something went wrong. - (${err.message}). Try again`,
            error: true,
        }));
};
