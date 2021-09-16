import { getAllClientsCards } from '../../cards/scripts/getAllClientsCards';
import { TAjacentHTML } from '../../types/types';
import {
    addCardBalance, addCardBalance2, addCardBalance3, noCard, noCard2, noCard3,
} from '../../forms/selector';
import { newCardBalance } from '../../payments/scripts/newCardItem';

export const cardBalance2 = async () => {
    try {
        const allCards = await getAllClientsCards();
        if (allCards) {
            noCard.style.display = 'none';
            noCard2.style.display = 'none';
            noCard3.style.display = 'none';
        }
        for (let i = 0; i < allCards.length; i++) {
            const newItemDiv = newCardBalance(allCards[i], i);
            addCardBalance.insertAdjacentHTML(<TAjacentHTML>'beforeend', newItemDiv);
            addCardBalance2.insertAdjacentHTML(<TAjacentHTML>'beforeend', newItemDiv);
            addCardBalance3.insertAdjacentHTML(<TAjacentHTML>'beforeend', newItemDiv);
        }
    } catch (error) { console.log(error.message); }
};

