import {
    cardDescr,
    cardName, currency, imageSystem, inputSystem,
} from '../../forms/selector';


export const resetIssueCardForm = () => {
    cardName.value = '';
    inputSystem.value = '';
    inputSystem.placeholder = 'Visa';
    imageSystem.src = 'img/icon/visa-icon.svg';
    currency.value = '';
    currency.placeholder = 'Dollar';
    cardDescr.value = '';
};
