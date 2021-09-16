export interface ISubmitEvent {
    target: HTMLFormElement;
}

export interface IYupErrors {
    path: string,
    message: string
}

export enum FieldLogForm {
    email = 'email',
    password = 'password',
}

export type IUser  = {
    name: string,
    email: string,
    phone: string,
};

export enum FieldRegForm {
    name = 'name',
    email = 'email',
    phone = 'tel',
    password = 'password',
    terms = 'terms',
}

export interface IRegResponse {
    data: string
}

export interface ILogForm {
    email: string,
    password: string,
}

export interface IRegForm extends ILogForm {
    name: string,
    phone: string,
}

// export interface IRegValForm extends IRegForm{
//     type: boolean,
// }

export interface INewCard {
    issuer: string,
    system: string,
    currency: string,
    class: string,
    description: string,
}

export interface ICard {
    low: string,
    medium: string,
    high: string,
}

export interface ICreatedCard {
    hash: string,
    issuer: string,
    system: 'visa' | 'mastercard',
    iban: string,
    currency: 'uah' | 'usd' | 'rub' | 'eur',
    class: 'gold' | 'platinum' | 'world' | 'signature',
    card: string,
    description: string,
    valid: string,
    balance: number,
    limit: number,
    internet: boolean,
    security3d: boolean
}

export enum CardCurrency {
    uah = '&#8372;',
    usd = '&#x24;',
    rub = '&#8381;',
    eur = '&#8364;',
}

export type TAjacentHTML = 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend';

export interface ITransaction {
    hash: string,
    title: string,
    description: string,
    operation: string,
    amount: number,
    card: string,
    cur: string,
    created: string
}

export interface IOrder {
    title: string,
    description: string,
    operation: string,
    amount: number,
    card: string,
    created: string,
    transfer: string
}

export enum TypePayment {
    transfer = 'Account replenishment',
    saving = 'Transferring money to a savings account',
    communal = 'Utility Bills',
    mobile = 'Mobile phone replenishment',
}

export enum TypeIcons {
    transfer = 'img/transaction/atm.svg',
    saving = 'img/transaction/money-pig.svg',
    communal = 'img/transaction/home.svg',
    mobile = 'img/transaction/phone.svg',
}
export interface IResOpder {
    title: string,
    description: string,
    operation: string,
    amount: number,
    hash: string,
    created: string,
    cur: 'uah' | 'usd' | 'rub' | 'eur',
}

export interface IPayment {
    payment: IOrder,
    date: string,
}
export interface IReport {
    amount: number,
    card: string,
    created: string,
    description: string,
    hash: string,
    operation: string,
    title: string,
}

