import axios from "axios";

const BASE_URL = "http://localhost:5215/api/items";
const Auth_URL = "http://localhost:5215/api/auth/";

export async function getItems() {
    const response = await axios.get(BASE_URL);
    return response.data;
};

export const createItem = async (item) => {
    const response = await axios.post(BASE_URL, item);
    return response.data;
};

export const deleteItem = async(id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
};

export const updateItem = async(id, item) => {
    const response = await axios.put(`${BASE_URL}/${id}`, item);
    return response.data;
}

export const signUp = async(Email, Password) => {
    const response = await axios.post(`${Auth_URL}signup`, { Email, Password });
    return response.data;
}

export const login = async(Email, Password) => {
    const response = await axios.post(`${Auth_URL}login`, { Email, Password });
    return response.data;
}

export const me = async(token) => {
    const response = await axios.get(`${Auth_URL}me`, {
        headers : {
            Authorization : `Bearer ${token}`,
        },
    });
    return response.data;
}