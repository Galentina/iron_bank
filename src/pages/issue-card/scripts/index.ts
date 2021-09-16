import '../../../css/style.scss';
import toastr from 'toastr';
import { storage } from '../../storage/storage';
import {
    cardName, dropDownSystem, imageSystem, inputSystem, masterCard, dropToggle,
    newCardForm, paySystem, visaCard, currencyList, dropDownCurrency,
    currencyToggle, currency, cardM, cardH, cardLow, cardMedium, cardHigh, classList,
    cardTerm, checkMarkCard, io,
} from '../../forms/selector';
import { ICard, INewCard, ISubmitEvent } from '../../types/types';
import { api } from '../../api/api';
import { resetIssueCardForm } from '../../cards/scripts/resetIssueCardForm';

io.addEventListener('click', () => {
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

const user = storage.getItem('user');

const chosenData: INewCard = {
    issuer: '', system: '', currency: 'dollar', class: '', description: '',
};

if (user) {
    cardName.value = user.name;
    chosenData.issuer = user.name;
}


const VisaCardChoice = { low: 'Gold', medium: 'Platinum', high: 'Signature' };
const masterCardChoice = { low: 'Gold', medium: 'World', high: 'Platinum' };
let chosenCart;


const choseValue = (card: ICard) => {
    cardLow.addEventListener('click', () => {
        cardLow.checked;
        classList.value = card.low;
        chosenData.class = card.low;
    });
    cardMedium.addEventListener('click', () => {
        cardMedium.checked;
        classList.value = card.medium;
        chosenData.class = card.medium;
    });
    cardHigh.addEventListener('click', () => {
        cardHigh.checked;
        classList.value = card.high;
        chosenData.class = card.high;
    });
};

paySystem.addEventListener('click', () => {
    dropDownSystem.className = 'dropdown dropdown--open';
    dropToggle.className = 'dropdown__toggle active';
    visaCard.addEventListener('click', () => {
        inputSystem.value = 'Visa';
        inputSystem.placeholder = 'Visa';
        chosenData.system = 'visa';
        imageSystem.src = 'img/icon/visa-icon.svg';
        cardM.innerHTML = VisaCardChoice.medium;
        cardH.innerHTML = VisaCardChoice.high;
        chosenCart = VisaCardChoice;
        choseValue(chosenCart);
        dropDownSystem.className = 'dropdown';
        dropToggle.className = 'dropdown__toggle';
    });
    masterCard.addEventListener('click', () => {
        inputSystem.value = 'mastercard';
        inputSystem.placeholder = 'Mastercard';
        chosenData.system = 'mastercard';
        imageSystem.src = 'img/icon/mastercard-icon.svg';
        cardM.innerHTML = masterCardChoice.medium;
        cardH.innerHTML = masterCardChoice.high;
        chosenCart = masterCardChoice;
        choseValue(chosenCart);
        dropDownSystem.className = 'dropdown';
        dropToggle.className = 'dropdown__toggle';
    });
});


currencyList.addEventListener('click', () => {
    dropDownCurrency.className = 'dropdown dropdown--open';
    currencyToggle.className = 'dropdown__toggle active';
    const curList = dropDownCurrency.querySelectorAll('.dropdown__list__item');
    for (let i = 0; i < curList.length; i++) {
        curList[i].addEventListener('click', () => {
            const chosenCurrency = curList[i].querySelector('p');

            if (chosenCurrency) {
                currency.value = chosenCurrency.innerText;
                currency.placeholder = chosenCurrency.innerText;
                chosenData.currency = chosenCurrency.id;
                dropDownCurrency.className = 'dropdown';
                currencyToggle.className = 'dropdown__toggle';
            }
        });
    }
});

newCardForm.addEventListener('submit',  async (event) => {
    event.preventDefault();

    const submitEvent = event as unknown as ISubmitEvent;
    const formData = new FormData(submitEvent.target);
    const { issuer, system  } = chosenData;
    const chosenCurrency = chosenData.currency.toLowerCase();
    const classChosen = chosenData.class.toLowerCase();
    const description = String(formData.get('descr'));

    const payload = {
        issuer, system, currency: chosenCurrency, class: classChosen, description,
    };

    if (cardTerm.checked) {
        try {
            const data = await api.createNewCard(token, payload);
            toastr.info(
                'Your card is successfully created!',
                `Dear ${chosenData.issuer}, Congratulation!`,
            );
            resetIssueCardForm();
            setTimeout(() => { window.location.href = 'cards.html'; }, 2000);
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    } else {
        checkMarkCard.style.opacity = '100%';
    }
});
