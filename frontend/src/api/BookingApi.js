import axios from "axios";

export const createBookingApi = (obj) => {
    return axios
        .post(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/booking", obj, {})
        .then((response) => response.data)
        .catch((error) => {
            return { message: `Something went wrong. - (${error.message}). Try again`, error: true };
        });
};
