'use client';

import Card from "./Card";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
}from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


export default function LineGraph() {
    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Days'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Views'
                }
            }
        }
    };

    const data = {
        labels: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ],
        datasets: [
            {
                label: 'Job Views',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.3
            }
        ]
    };

    return (
        <Card className="bg-white dark:dark-gradient">
            <Card.Header>
                <h2 className="text-base font-bold">
                    Job Views
                </h2>
            </Card.Header>
            <Card.Content className="lg:h-[450px] w-full">
                <Line className="!h-full !w-full" options={options} data={data} />
            </Card.Content>
        </Card>
    )
}