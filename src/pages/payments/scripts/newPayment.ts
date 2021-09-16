
import {
    addNewCard,
    chooseTitle, addNewCard2,
} from '../../forms/selector';
import { ICreatedCard, TAjacentHTML, TypePayment } from '../../types/types';
import { newCardItem, newCardItem2 } from './newCardItem';


export const debitAccount = (card: ICreatedCard, i: number) => {
    const newItemDiv = newCardItem(card, i);
    addNewCard.insertAdjacentHTML(<TAjacentHTML>'beforeend', newItemDiv);
};


export const creditAccount = (card: ICreatedCard, i: number) => {
    const newItemDiv = newCardItem2(card, i);
    addNewCard2.insertAdjacentHTML(<TAjacentHTML>'beforeend', newItemDiv);
};


export const setTitle = () => {
    let tit = '';
    chooseTitle.querySelectorAll('.radio__button')
        .forEach((el) => {
            el.addEventListener('click', () => {
                const title = el.getElementsByTagName('input')[0].id;
                if (title === 'transfer') tit = TypePayment.transfer;
                else if (title === 'saving') tit = TypePayment.saving;
                else if (title === 'communal') tit = TypePayment.communal;
                else tit = TypePayment.mobile;
            });
        });

    return tit;
};
