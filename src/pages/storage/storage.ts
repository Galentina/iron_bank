import {
    IPayment,
} from '../types/types';


class Storage {
    getItem(key: string) {
        const data = localStorage.getItem(key);
        if (data) return JSON.parse(data);

        return {};
    }

    setItem(key: string, data: any) {
        return localStorage.setItem(key, JSON.stringify(data));
    }

    delItemFromStorage(key: string) {
        return localStorage.removeItem(key);
    }

    setListItems(key: string, order: IPayment) {
        const allItems = this.getItem(key);
        console.log(allItems, order);
        const result = allItems.push(order);
        console.log(result);

        return localStorage.setItem(key, JSON.stringify(result));
    }
}

export const storage = new Storage();
