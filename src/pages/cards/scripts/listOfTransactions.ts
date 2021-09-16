import { CardCurrency, ICreatedCard, ITransaction } from '../../types/types';
import { allTrans } from '../../forms/selector';


export const listOfTransactions = (transactions: ITransaction[], cardItem: ICreatedCard) => {
    allTrans.innerHTML = '';
    const currency = CardCurrency[cardItem.currency];
    for (let i = 0; i < transactions.length; i++) {
        let sign;
        let color = '';
        if (transactions[i].operation === 'credit') {
            sign = '+';
            color = 'increase';
        } else {
            sign = '-';
        }

        const newItemDiv = `<div class="transaction__item">
                            <img class="transaction__item__icon" src="img/transaction/home.svg" alt="">
                            <div>
                                <p class="transaction__item__type">${transactions[i].title}</p>
                                <p class="transaction__item__data">${transactions[i].description}</p>
                            </div>
                            <div class="transaction__item__value ${color}">${sign} ${currency}${transactions[i].amount}</div>
                            <img src="img/icon/dots-icon.svg" class="transaction__item__more" alt="">
                        </div>`;
        allTrans.insertAdjacentHTML('afterbegin', newItemDiv);
    }
};
