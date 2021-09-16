import { IReport } from '../../types/types';
import { storage } from '../../storage/storage';

export const newLabels = (allData: IReport[]) => {
    const dates: any = [];
    allData.forEach((el: IReport) => dates.push(Date.parse(el.created)));

    return dates;
};

export const newSum = (allData: IReport[]) => {
    const amounts: any = [];
    allData.forEach((el: IReport) => amounts.push(el.amount));

    return amounts;
};

export const newGraphic = (allData: IReport[]) => {
    const allCards = storage.getItem('allCards');
    const dataSet = [];
    for (let i = 0; i < allCards.length; i++) {
        const curAcc = allData.filter((el: IReport) => el.card === allCards[i].slice(-16));
        const currAccRep = curAcc.filter((el: IReport) => el.title === 'Account replenishment');
        const currAccTrans = curAcc.filter((el: IReport) => el.title === 'Transferring money to a savings account');
        const currAccUtil = curAcc.filter((el: IReport) => el.title === 'Utility Bills');
        const currAccMob = curAcc.filter((el: IReport) => el.title === 'Mobile phone replenishment');
        let amountsRep = 0;
        // eslint-disable-next-line no-return-assign
        currAccRep.forEach((el: IReport) => amountsRep += el.amount);
        // eslint-disable-next-line no-return-assign
        let amountsTrans = 0;
        // eslint-disable-next-line no-return-assign
        currAccTrans.forEach((el: IReport) => amountsTrans += el.amount);
        let amountsUtil = 0;
        // eslint-disable-next-line no-return-assign
        currAccUtil.forEach((el: IReport) => amountsUtil += el.amount);
        let amountsMob = 0;
        // eslint-disable-next-line no-return-assign
        currAccMob.forEach((el: IReport) => amountsMob += el.amount);
        const color = `#${Math.floor(Math.random() * 16777215)
            .toString(16)}`;

        dataSet.push({
            label: `card ...${allCards[i].slice(-4)}`,
            data: [amountsTrans, amountsTrans, amountsUtil, amountsMob],
            borderColor: color,
            backgroundColor: color,
        });
    }

    return dataSet;
};

export const newGraphic1 = (allData: IReport[]) => {
    const allCards = storage.getItem('allCards');
    const dataSet = [];
    for (let i = 0; i < allCards.length; i++) {
        const dataSet1: number[] = [];
        for (let j = 0; j < allData.length; j++) {
            // eslint-disable-next-line max-len
            allData[j].card === allCards[i].slice(-16) ? dataSet1.push(allData[j].amount) : dataSet1.push(0);
        }
        const color = `#${Math.floor(Math.random() * 16777215)
            .toString(16)}`;
        dataSet.push({
            label: `card ...${allCards[i].slice(-4)}`,
            data: dataSet1,
            borderColor: color,
            backgroundColor: color,
        });
    }

    return dataSet;
};

