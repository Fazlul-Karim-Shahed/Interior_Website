import axios from "axios";

export const createServiceApi = (obj) => {
    let data = axios
        .post(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/service", obj, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_TOKEN_NAME),
            },
        })
        .then((response) => response.data)
        .catch((error) => {
            return { message: `Something went wrong. - (${error.message}). Try again`, error: true };
        });

    return data;
};

// Update Service
export const updateServiceApi = (formData, id) => {
    return axios
        .put(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/service/" + id, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_TOKEN_NAME),
            },
        })
        .then((response) => response.data)
        .catch((error) => {
            return {
                message: `Something went wrong. - (${error.message}). Try again`,
                error: true,
            };
        });
};

// Get All Services
export const getAllServiceApi = () => {
    return fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/service", { cache: "no-cache" })
        .then((res) => res.json())
        .catch((error) => {
            return {
                message: `Something went wrong. - (${error.message}). Try again`,
                error: true,
            };
        });
};

// Get Single Service by ID
export const getAServiceApi = (id) => {
    return fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/service/" + id, { cache: "no-cache" })
        .then((res) => res.json())
        .catch((error) => {
            return {
                message: `Something went wrong. - (${error.message}). Try again`,
                error: true,
            };
        });
};

// Delete Service
export const deleteServiceApi = (id) => {
    return axios
        .delete(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/service/" + id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_TOKEN_NAME),
            },
        })
        .then((response) => response.data)
        .catch((error) => {
            return {
                message: `Something went wrong. - (${error.message}). Try again`,
                error: true,
            };
        });
};

export const getServiceByNameApi = (name) => {
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/service/name/${name}`, { cache: "no-cache" })
        .then((res) => res.json())
        .catch((err) => ({
            message: `Something went wrong. - (${err.message}). Try again`,
            error: true,
        }));
};
