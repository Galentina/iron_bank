import '../../../css/style.scss';
import toastr from 'toastr';
import io from 'socket.io-client';
import { getAllClientsCards } from '../../cards/scripts/getAllClientsCards';
import { storage } from '../../storage/storage';
import {
    imgChooseCard1,
    chooseCard1,
    chooseCardToggle1,
    newCard,
    userName,
    imgChooseCard2,
    chooseCard2,
    chooseCardToggle2, imgCardLogo2, paySystem2,
    form, chooseTitle, imgCardLogo, paySystem1, addNewCard, addNewCard2, logoClick,
} from '../../forms/selector';

import {
    creditAccount,
    debitAccount,
} from './newPayment';
import { cardBalance } from './cardBalance';
import { api } from '../../api/api';
import { lastTrans } from './newCardItem';
import { ISubmitEvent, TypePayment } from '../../types/types';

const socket = io('https://lab.lectrum.io', {
    path: '/ws',
});
socket.on('connect', () => {
    console.log('connected');
});

socket.on('order', (data) => {
    const data1 = JSON.parse(data);
    toastr.info(`you performed an operation to send money: ${data1}`);
});

logoClick.addEventListener('click', () => {
    location.href = 'index.html';
});

const token = storage.getItem('token');
const checkToken = async () => {
    try {
        await api.checkToken(token);
    } catch (error) {
        setTimeout(() => { window.location.href = 'index.html'; }, 1000);
        toastr.info(
            'you are not authorized',
            'Dear client, Congratulation!',
        );
    }
};

if (token) checkToken();
if (!token) window.location.href = 'index.html';


const client = storage.getItem('user');


userName.innerHTML = client.name;
newCard.addEventListener('click', () => {
    window.location.href = 'issue-card.html';
});
cardBalance();
const chosenCards: { card1: string, card2: string, title: string, cur: string, system: string } = {
    card1: '', card2: '', title: '', cur: '', system: '',
};

imgChooseCard1.addEventListener('click', async () => {
    if (chooseCard1.className === 'dropdown') {
        addNewCard.innerHTML = '';
        try {
            const allCards = await getAllClientsCards();
            chooseCard1.className = 'dropdown dropdown--open';
            chooseCardToggle1.className = 'dropdown__toggle active';
            for (let i = 0; i < allCards.length; i++) {
                debitAccount(allCards[i], i);
                const chosenItem = <HTMLElement>document.getElementById(`card${i}`);
                chosenItem.addEventListener('click', () => {
                    imgCardLogo.src = allCards[i].system === 'visa' ? 'img/icon/visa-icon.svg' : 'img/icon/mastercard-icon.svg';
                    paySystem1.placeholder = allCards[i].system === 'visa' ? 'Visa' : 'Mastercard';
                    paySystem1.value = allCards[i].system === 'visa' ? `Visa: ...${allCards[i].iban.slice(-4)}` : `Mastercard: ...${allCards[i].iban.slice(-4)}`;
                    chosenCards.card1 = allCards[i].iban.slice(10);
                    chosenCards.cur = allCards[i].currency;
                    chosenCards.system = allCards[i].system;
                    chooseCard1.className = 'dropdown';
                    chooseCardToggle1.className = 'dropdown__toggle';
                });
            }
        } catch (error) { console.log(error.message); }
    } else if (chooseCard1.className === 'dropdown dropdown--open') {
        chooseCard1.className = 'dropdown';
        chooseCardToggle1.className = 'dropdown__toggle';
    }
});
imgChooseCard2.addEventListener('click', async () => {
    if (chooseCard2.className === 'dropdown') {
        addNewCard2.innerHTML = '';
        try {
            const allCards = await getAllClientsCards();
            chooseCard2.className = 'dropdown dropdown--open';
            chooseCardToggle2.className = 'dropdown__toggle active';
            for (let i = 0; i < allCards.length; i++) {
                creditAccount(allCards[i], i);
                const chosenItem1 = <HTMLElement>document.getElementById(`card2${i}`);
                chosenItem1.addEventListener('click', () => {
                    imgCardLogo2.src = allCards[i].system === 'visa' ? 'img/icon/visa-icon.svg' : 'img/icon/mastercard-icon.svg';
                    paySystem2.placeholder = allCards[i].system === 'visa' ? 'Visa' : 'Mastercard';
                    paySystem2.value = allCards[i].system === 'visa' ? `Visa: ...${allCards[i].iban.slice(-4)}` : `Mastercard: ...${allCards[i].iban.slice(-4)}`;
                    chooseCard2.className = 'dropdown';
                    chooseCardToggle2.className = 'dropdown__toggle';
                    chosenCards.card2 = allCards[i].iban.slice(10);
                });
            }
        } catch (error) { console.log(error.message); }
    } else if (chooseCard2.className === 'dropdown dropdown--open') {
        chooseCard2.className = 'dropdown';
        chooseCardToggle2.className = 'dropdown__toggle';
    }
});

chooseTitle.querySelectorAll('.radio__button')
    .forEach((el) => {
        el.addEventListener('click', () => {
            const title = el.getElementsByTagName('input')[0].id;
            if (title === 'transfer') chosenCards.title = TypePayment.transfer;
            else if (title === 'saving') chosenCards.title = TypePayment.saving;
            else if (title === 'communal') chosenCards.title = TypePayment.communal;
            else chosenCards.title = TypePayment.mobile;
        });
    });


form.addEventListener('submit',  async (event) => {
    event.preventDefault();
    try {
        const card = await String(chosenCards?.card1);
        const transfer = await String(chosenCards?.card2);
        const submitEvent = event as unknown as ISubmitEvent;
        const formData = new FormData(submitEvent.target);
        const title = String(chosenCards?.title);

        const operation = chosenCards?.system === 'visa' ? String('debet') : String('credit');
        const created = String(new Date());

        const amount = formData.get('amount');
        const tel = formData.get('phone');
        const name1 = formData.get('name');

        const payload = {
            title,
            description: String(name1) + String(tel),
            operation,
            amount: Number(amount),
            card,
            created,
            transfer,
        };
        const { name } = storage.getItem('user');
        try {
            const data = await api.setOrder(token, payload);
            toastr.info(
                'Your payment was successful!',
                `Dear ${name}, Congratulation!`,
            );
            cardBalance();
            lastTrans(data);
            form.reset();
        } catch (error) {
            toastr.info(
                error.message,
                `Dear ${name}, We are sorry.`,
            );
        }
    } catch (error) {
        console.log(error.message);
    }
});

