import axios from 'axios';
import {
    ILogForm, INewCard, IOrder, IRegForm, IRegResponse,
} from '../types/types';
import { storage } from '../storage/storage';

const BANK_API_URL = 'https://lab.lectrum.io/js2/api/ironbank';

export const api = Object.freeze({
    async checkToken(token: string) {
        const header = { 'x-token': token };
        const data = await axios.get(`${BANK_API_URL}/auth`, { headers: header });

        return data.data;
    },
    async regProfile(payload: IRegForm) {
        const data = await axios.post<IRegResponse>(`${BANK_API_URL}/register`, payload);

        return data.data;
    },
    async logProfile(payload: ILogForm) {
        const data = await axios.post(`${BANK_API_URL}/login`, payload);

        return data.data.data;
    },
    async createNewCard(token: string, payload: INewCard) {
        const header = { 'x-token': token };
        const data = await axios.post(`${BANK_API_URL}/cards`, payload, { headers: header });

        return data.data;
    },
    async getAllCards(token: string) {
        const header = { 'x-token': token };
        const data = await axios.get(`${BANK_API_URL}/cards`, { headers: header });

        return data.data;
    },

    async getTransCart(token:string, cardNumber: string) {
        const header = { 'x-token': token, cardNumber };
        const data = await axios.get(`${BANK_API_URL}/orders/${cardNumber}`, { headers: header });

        return data.data;
    },

    async setOrder(token:string, order: IOrder) {
        const header = { 'x-token': token };
        const data = await axios.post(`${BANK_API_URL}/orders`, order, { headers: header });
        storage.delItemFromStorage('descr');
        storage.delItemFromStorage('chosenDebit');
        storage.delItemFromStorage('chosenCredit');
        storage.delItemFromStorage('amount');
        storage.delItemFromStorage('title');

        return data.data.data;
    },

    async getProfile(token: string) {
        const header = { 'x-token': token };
        const user = await axios.get(`${BANK_API_URL}/profile`, { headers: header });
        storage.setItem('user', user.data.data);

        return user.data.data;
    },

    async getReport(token: string) {
        const header = { 'x-token': token };
        const user = await axios.get(`${BANK_API_URL}/reports`, { headers: header });

        return user.data.data;
    },
});
