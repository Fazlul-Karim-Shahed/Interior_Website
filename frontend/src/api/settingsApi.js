import axios from "axios";

export const createSettingsApi = (obj) => {
    let data = axios
        .post(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/settings", obj, {
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

export const updateSettingsApi = (obj) => {
    return axios
        .put(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/settings/688a67d88d03a4e576e9fe0a", obj, {
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

export const getSettingsApi = () => {
    return fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/settings", { cache: "no-cache" })
        .then((res) => res.json())
        .catch((err) => ({
            message: `Something went wrong. - (${err.message}). Try again`,
            error: true,
        }));
};
