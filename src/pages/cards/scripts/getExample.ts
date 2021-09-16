import { CardCurrency, ICreatedCard } from '../../types/types';


export const getExample = (cardItem: ICreatedCard, i: number) => {
    const cadNumber = [
        cardItem.iban.slice(10, 14), cardItem.iban.slice(14, 18),
        cardItem.iban.slice(18, 22), cardItem.iban.slice(22),
    ];
    const cardLastDigits = cadNumber[3];
    const image1 = cardItem.system === 'visa' ? 'visa-icon.svg' : 'mastercard-icon.svg';
    const image2 = cardItem.system === 'visa' ? 'visa-white.svg' : 'mastercard-icon-small.svg';
    const limitCard = cardItem.limit === 0 ? 'No' : cardItem.limit + CardCurrency[cardItem.currency];
    const onlineShopClass = cardItem.internet ? 'switch__block internet__switch__block checked' : 'switch__block internet__switch__block';
    const securityClass = cardItem.security3d ? 'switch__block security__switch__block checked' : 'switch__block security__switch__block';
    const newCardDiv = `<div class="card__info__item collapsed">
                        <div id='${i}' class="card__info__header">
                            <img src="img/icon/${image1}" alt="" class="card__info__icon">
                            <p class="card__info__data">Personal card ** ${cardLastDigits}</p>
                            <p class="card__info__balance">${CardCurrency[cardItem.currency]} ${cardItem.balance}</p>
                            <img  src="img/icon/arr-bottom.svg" alt="" class="arr__icon">
                        </div>
                        <div class="card__info__main">
                            <div class="card__info__card">
                                <img src="img/card-back.jpg" class="card__back" alt="">
                                <img src="img/icon/${image2}" class="card__type" alt="">
                                <p class="card__number">${cadNumber[0]} ${cadNumber[1]} ${cadNumber[2]} ${cadNumber[3]}</p>
                                <p class="card__owner__name">${cardItem.issuer}</p>
                                <p class="card__exp__date">${cardItem.valid.slice(5, 7)} / ${cardItem.valid.slice(2, 4)}</p>
                            </div>
                            <div class="card__info__settings">
                                <div class="data-item">
                                    <p class="legend">Card class</p>
                                    <p class="data">${cardItem.system} ${cardItem.class}</p>
                                </div>
                                <div class="data-item">
                                    <p class="legend">IBAN-number</p>
                                    <p class="data">${cardItem.iban}</p>
                                </div>
                                <div class="data-item">
                                    <p class="legend">Credit limit</p>
                                    <p class="data">${limitCard}</p>
                                </div>
                                <div class="data-item">
                                    <p class="legend">Online shopping</p>
                                    <!-- Для того что бы "включить switch нужно добавить к классу switch__block класс checked" -->
                                    <div id='internet${i}' class='${onlineShopClass}'>
                                        <div class="switcher "></div>
                                        <input type="checkbox" id="internetPayments">
                                    </div>
                                </div>
                                <div class="data-item">
                                    <p class="legend">3D Security</p>
                                    <!-- Для того что бы "включить switch нужно добавить к классу switch__block класс checked" -->
                                    <div id='security${i}' class='${securityClass}'>
                                        <div class="switcher "></div>
                                        <input type="checkbox" id="security3D">
                                        
                                    </div>
                                </div>
                                <div class="other__settings">
                                    <img class="settings__icon" src="img/icon/dots-icon.svg" alt="">
                                    <p class="settings__name">Card operations</p>
                                </div>
                            </div>
                        </div>
                    </div>`;


    return newCardDiv;
};
