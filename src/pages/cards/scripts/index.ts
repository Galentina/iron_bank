import '../../../css/style.scss';
import toastr from 'toastr';
import io from 'socket.io-client';
import { getAllClientsCards, getTrans } from './getAllClientsCards';
import { ICreatedCard, TAjacentHTML } from '../../types/types';
import { getExample } from './getExample';
import {
    allTrans, placeForNewCards, plug, userName, logoClick,
} from '../../forms/selector';
import { storage } from '../../storage/storage';
import { api } from '../../api/api';
import { listOfTransactions } from './listOfTransactions';


const socket = io('https://lab.lectrum.io', {
    path: '/ws',
});

socket.on('connect', () => {
    console.log('connected');
});

socket.on('notification', (source) => {
    const data = JSON.parse(source);
    toastr.info(`You receive a notification from  ${data}`);
});

socket.on('disconnect', () => {
    console.log('disconnect');
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

const userN = storage.getItem('user').name;
userName.innerHTML = userN;
const cardList = async () => {
    try {
        const cardArray = await getAllClientsCards();
        const newCard = placeForNewCards;

        cardArray.map((cardItem: ICreatedCard, i: number) => {
            const newCardElement = getExample(cardItem, i);
            newCard.insertAdjacentHTML(<TAjacentHTML>'beforeend', newCardElement);
            const collaps = document.getElementById(`${i}`);
            if (collaps) {
                collaps.addEventListener('click', async () => {
                    if (collaps.parentElement &&  collaps.parentElement.className === 'card__info__item collapsed') {
                        collaps.parentElement.className = 'card__info__item';
                        const numberCard = cardItem.iban.slice(10);
                        try {
                            const transactions = await getTrans(numberCard);
                            plug.style.display = 'none';
                            allTrans.style.display = 'inherit';
                            listOfTransactions(transactions.data, cardItem);

                            for (let j = 0; j < cardArray.length; j++) {
                                if (j !== i) {
                                    const close = document.getElementById(`${j}`);
                                    if (close?.parentElement) close.parentElement.className = 'card__info__item collapsed';
                                }
                            }
                        } catch (error) { console.log(error.message); }
                    } else if (collaps.parentElement &&  collaps.parentElement.className === 'card__info__item') {
                        collaps.parentElement.className = 'card__info__item collapsed';
                        plug.style.display = 'inherit';
                        allTrans.style.display = 'none';
                    }
                    const internet = document.getElementById(`internet${i}`);
                    internet?.addEventListener('click', () => {
                        let internetNew: boolean;
                        if (internet.className === 'switch__block internet__switch__block checked') {
                            internet.className = 'switch__block internet__switch__block';
                            internetNew = false;
                        } else if (internet.className === 'switch__block internet__switch__block') {
                            internet.className = 'switch__block internet__switch__block checked';
                            internetNew = true;
                        }
                        cardArray.map((card: ICreatedCard) => {
                            // eslint-disable-next-line no-param-reassign
                            if (card.iban === cardItem.iban) card.internet = internetNew;

                            return null;
                        });
                    });

                    const security = document.getElementById(`security${i}`);
                    security?.addEventListener('click', () => {
                        let security3D: boolean;
                        if (security.className === 'switch__block security__switch__block checked') {
                            security.className = 'switch__block security__switch__block';
                            security3D = false;
                        } else if (security.className === 'switch__block security__switch__block') {
                            security.className = 'switch__block security__switch__block checked';
                            security3D = true;
                        }
                        cardArray.map((card: ICreatedCard) => {
                            // eslint-disable-next-line no-param-reassign
                            if (card.iban === cardItem.iban) card.security3d = security3D;

                            return null;
                        });
                    });
                    try {
                        const cartNumber = cardItem.iban.slice(10);
                        await api.getTransCart(token, cartNumber);
                    } catch (error) {
                        console.log(error.message);
                    }
                });
            }

            return null;
        });
    } catch (error) {
        console.log(error.message);
    }
};

cardList();
