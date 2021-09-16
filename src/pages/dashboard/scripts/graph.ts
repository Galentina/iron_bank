import { Chart, registerables } from 'chart.js';
import { storage } from '../../storage/storage';
import { ICreatedCard } from '../../types/types';
import { myChart, myChart2, myChart3 } from '../../forms/selector';
import { api } from '../../api/api';
// eslint-disable-next-line import/namespace
import {
    newGraphic, newGraphic1, newLabels, newSum,
} from './newLabels';

Chart.register(...registerables);

export const graph = (cards: ICreatedCard[]) => {
    const ctx = myChart.getContext('2d');
    const allCards = storage.getItem('allCards');
    const balanceData: number[] = [];
    const col = [];

    for (let i = 0; i < allCards.length; i++) {
        col.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    }
    cards.forEach((el: ICreatedCard) => balanceData.push(el.balance));
    // @ts-ignore
    const barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: allCards,
            datasets: [
                {
                    label: 'Card balance',
                    backgroundColor: col,
                    backgroundWidth: [4],
                    data: balanceData,
                },
            ],
        },
        options: {},
    });

    return barChart;
};


export const graph2 = async (token: string) => {
    const ctx1 = myChart2.getContext('2d');
    const allCards = storage.getItem('allCards');
    try {
        const allData = await api.getReport(token);
        if (allData) {
            const col = [];
            for (let i = 0; i < allCards.length; i++) {
                col.push(`#${Math.floor(Math.random() * 16777215)
                    .toString(16)}`);
            }
        }
        const allLabels = [
            'Account replenishment', 'Transferring money to a savings account',
            'Utility Bills', 'Mobile phone replenishment',
        ];
        // newLabels(allData);
        const allSum = newSum(allData);
        const graphData = newGraphic(allData);
        const data = {
            labels: allLabels, // titles
            datasets: graphData,
        };
        // @ts-ignore
        const barChart = new Chart(ctx1, {
            type: 'line',
            data,
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Min and Max Settings',
                    },
                },
                scales: {
                    y: {
                        min: -10,
                        max: Math.max(...allSum) + 200,
                    },
                },
            },
        });

        return barChart;
    } catch (error) { console.log(error.message); }
};


export const graph3 = async (token: string) => {
    const ctx2 = myChart3.getContext('2d');
    const allCards = storage.getItem('allCards');
    try {
        const allData = await api.getReport(token);
        if (allData) {
            const col = [];
            for (let i = 0; i < allCards.length; i++) {
                col.push(`#${Math.floor(Math.random() * 16777215)
                    .toString(16)}`);
            }
        }
        const allLabels = newLabels(allData);
        const allSum = newSum(allData);
        const graphData = newGraphic1(allData);
        const data = {
            labels: allLabels, // titles
            datasets: graphData,
        };
        // @ts-ignore
        const barChart = new Chart(ctx2, {
            type: 'bar',
            data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Chart.js Bar Chart',
                    },
                    scales: {
                        y: {
                            min: -10,
                            max: Math.max(...allSum) + 10,
                        },
                    },
                },
            },
        });

        return barChart;
    } catch (error) { console.log(error.message); }
};
