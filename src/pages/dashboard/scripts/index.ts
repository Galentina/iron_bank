import '../../../css/style.scss';
import { storage } from '../../storage/storage';
import { checkToken } from '../../storage/checkToken';
import {
    imgChard, imgChard1, io, userName, imgChart2, imgChart3,
} from '../../forms/selector';
import { graph, graph2, graph3 } from './graph';
import { cardBalance2 } from './cardBalance2';
import { getAllClientsCards } from '../../cards/scripts/getAllClientsCards';
import { ICreatedCard } from '../../types/types';

const token = storage.getItem('token');

if (token) checkToken(token);

const client = storage.getItem('user');
userName.innerHTML = client.name;

io.addEventListener('click', () => {
    location.href = 'index.html';
});

cardBalance2();
const allCards = async () => {
    try {
        const cards = await getAllClientsCards();

        const cardNumbers: string[] = [];
        cards?.forEach((el: ICreatedCard) => {
            cardNumbers.push(`${el.system} - ${el.iban.slice(10)}`);
        });
        storage.setItem('allCards', cardNumbers);
        imgChard.style.display = 'none';
        imgChard1.style.display = 'none';
        imgChart2.style.display = 'none';
        imgChart3.style.display = 'none';
        graph(cards);
        graph2(token);
        graph3(token);
    } catch (error) { console.log(error.message); }
};
allCards();

