import { storage } from '../../storage/storage';
import { api } from '../../api/api';
import { IOrder } from '../../types/types';


const token = storage.getItem('token');

export const getAllClientsCards = async () => {
    try {
        const data = await api.getAllCards(token);

        return data.data;
    } catch (error) { console.log(error.message); }
};


export const setOrder = async (payload:IOrder) => {
    try {
        const data = await api.setOrder(token, payload);

        return data;
    } catch (error) { console.log(error.message); }
};

export const getTrans = async (cardNumber: string) => {
    try {
        const data = await api.getTransCart(token, cardNumber);

        return data;
    } catch (error) { console.log(error.message); }
};
