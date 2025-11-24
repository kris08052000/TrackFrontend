import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

const BASE_URL = `${API_BASE}/api/items`;
const AUTH_URL = `${API_BASE}/api/auth`;

export async function getItems() {
    const response = await axios.get(BASE_URL);
    return response.data;
}

export const createItem = async (item) => {
    const response = await axios.post(BASE_URL, item);
    return response.data;
};

export const deleteItem = async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
};

export const updateItem = async (id, item) => {
    const response = await axios.put(`${BASE_URL}/${id}`, item);
    return response.data;
};

export const signUp = async (Email, Password) => {
    const response = await axios.post(`${AUTH_URL}/signup`, { Email, Password });
    return response.data;
};

export const login = async (Email, Password) => {
    const response = await axios.post(`${AUTH_URL}/login`, { Email, Password });
    return response.data;
};

export const me = async (token) => {
    const response = await axios.get(`${AUTH_URL}/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};