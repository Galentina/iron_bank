import { getAllClientsCards } from '../../cards/scripts/getAllClientsCards';
import { newCardBalance } from './newCardItem';
import { TAjacentHTML } from '../../types/types';
import { addCardBalance } from '../../forms/selector';

export const cardBalance = async () => {
    addCardBalance.innerHTML = '';
    try {
        const allCards = await getAllClientsCards();
        for (let i = 0; i < allCards.length; i++) {
            const newItemDiv = newCardBalance(allCards[i], i);
            addCardBalance.insertAdjacentHTML(<TAjacentHTML>'beforeend', newItemDiv);
        }
    } catch (error) { console.log(error.message); }
};
