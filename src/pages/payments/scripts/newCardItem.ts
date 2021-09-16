import {
    CardCurrency, ICreatedCard, ITransaction, TAjacentHTML,
} from '../../types/types';
import { lastTransaction } from '../../forms/selector';


export const newCardItem = (card: ICreatedCard, i: number) => {
    const cardSystem = `${card.system[0].toUpperCase()}${card.system.slice(1)}`;
    const image = card.system === 'visa' ? 'visa-icon.svg' : 'mastercard-icon.svg';
    const newItemDiv = `<div id="card${i}" class="dropdown__list__item">
                        <img src="img/icon/${image}" class="paysystem__icon visa__icon" alt="">
                        <p class="form__input">${cardSystem}  ... ${card.iban.slice(-4)}</p>
                        </div>`;

    return newItemDiv;
};

export const newCardItem2 = (card: ICreatedCard, i: number) => {
    const cardSystem = `${card.system[0].toUpperCase()}${card.system.slice(1)}`;
    const image = card.system === 'visa' ? 'visa-icon.svg' : 'mastercard-icon.svg';
    const newItemDiv = `<div id="card2${i}" class="dropdown__list__item">
                        <img src="img/icon/${image}" class="paysystem__icon visa__icon" alt="">
                        <p class="form__input">${cardSystem}  ... ${card.iban.slice(-4)}</p>
                        </div>`;

    return newItemDiv;
};

export const newCardBalance = (card: ICreatedCard, i: number) => {
    const image = card.system === 'visa' ? 'visa-icon.svg' : 'mastercard-icon.svg';
    const cardNumber = card.iban.slice(10);
    const newItemDiv = `<div id="balance${i}" class="card__balance card__balance__item">
                                <img src="img/icon/${image}" class="card__balance__icon" alt="">
                                <div>
                                    <p class="card__balance__type">Personal card</p>
                                    <p class="card__balance__number">${cardNumber.slice(0, 4)} **** **** ${cardNumber.slice(-4)}</p>
                                </div>
                                <p class="card__balance__data">${CardCurrency[card.currency]}${card.balance}</p>
                                <img src="img/icon/increase-icon.svg" class="card__balance__status" alt="">
                            </div>`;

    return newItemDiv;
};

export const lastTrans = (payload: ITransaction) => {
    const newItemDiv = `<div class="transaction__item">
                                <img class="transaction__item__icon" src="img/transaction/home.svg" alt="">
                                <div>
                                    <p class="transaction__item__type">${payload.title}</p>
                                    <p class="transaction__item__data">${payload.description}</p>
                                </div>
                                <div class="transaction__item__value">${payload.cur} ${payload.amount}</div>
                                <img src="img/icon/dots-icon.svg" class="transaction__item__more" alt="">
                            </div>`;
    lastTransaction.insertAdjacentHTML(<TAjacentHTML>'afterbegin', newItemDiv);
    // }
};
