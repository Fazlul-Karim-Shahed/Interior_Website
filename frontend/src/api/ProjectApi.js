import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/project";

export const getAllProjectsApi = () => {
    return fetch(BASE_URL, { cache: "no-cache" })
        .then((res) => res.json())
        .catch((err) => ({
            message: `Something went wrong. - (${err.message}). Try again`,
            error: true,
        }));
};

export const getProjectByIdApi = (id) => {
    return fetch(`${BASE_URL}/${id}`, { cache: "no-cache" })
        .then((res) => res.json())
        .catch((err) => ({
            message: `Something went wrong. - (${err.message}). Try again`,
            error: true,
        }));
};

export const createProjectApi = (obj) => {
    return axios
        .post(BASE_URL, obj, {
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

export const updateProjectApi = (obj, id) => {
    return axios
        .put(`${BASE_URL}/${id}`, obj, {
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

export const deleteProjectApi = (id) => {
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
