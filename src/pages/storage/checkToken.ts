import toastr from 'toastr';
import { api } from '../api/api';

export const checkToken = async (token: string) => {
    try {
        await api.checkToken(token);
    } catch (error) {
        setTimeout(() => { window.location.href = 'cards.html'; }, 1000);
        toastr.info(
            'you are not authorized!',
            'Dear client, Congratulation!',
        );
        console.log(error.message);
    }

    return null;
};

