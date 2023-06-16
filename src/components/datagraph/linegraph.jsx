import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import './linegraph.css';

const data1 = [
    {
        id: 'livestockemission',
        data: [],
    },
];
const data2 = [
    {
        id: 'totalemission',
        data: [],
    },
];

const years = [
    '1990',
    '1991',
    '1992',
    '1993',
    '1994',
    '1995',
    '1996',
    '1997',
    '1998',
    '1999',
    '2000',
    '2001',
    '2002',
    '2003',
    '2004',
    '2005',
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
];
const livestockEmissions = [
    3764.03, 3969.86, 4248.63, 4677.2699999999995, 4940.88, 5125.01, 5466.650000000001, 5519.110000000001, 5393.03,
    4809.469999999999, 4515.45, 4305.82, 4298.97, 4286.96, 4381.68, 4490.43, 4665.53, 4851.04, 5010.27, 5227.88, 5540.44,
    5337.530000000001, 5633.99, 5645.370000000001, 5784.5, 5662.78, 5647.599999999999, 5759.73, 5863.24, 5991.69,
    6141.639999999999,
];
const totalEmissions = [
    30242.05, 30196.96, 29653.23, 29119.93, 29179.85, 28855.35, 29147.13, 29386.03, 28183.31, 27901.33, 27901.53, 28261.88,
    28450.51, 28447.17, 27515.22, 27523.01, 27369.15, 27204.05, 27144.6, 27173.59, 27784.33, 27860.0, 27728.88, 27537.08,
    27360.11, 27323.41, 27389.97, 27839.97, 28009.11, 27248.79, 27145.0,
];

for (let i = 0; i < years.length; i++) {
    data1[0].data.push({
        x: years[i],
        y: livestockEmissions[i],
    });
    data2[0].data.push({ x: years[i], y: totalEmissions[i] });
}

const SecondGraph = () => {
    return (
        <ResponsiveLine
            data={data2}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 26500,
                max: 32500,
                stacked: true,
                reverse: false,
            }}
            axisTop={null}
            axisLeft={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'year',
                legendOffset: 36,
                legendPosition: 'middle',
            }}
            axisRight={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'emissions',
                legendOffset: -40,
                legendPosition: 'middle',
            }}
            colors={{ scheme: 'accent' }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 50,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1,
                            },
                        },
                    ],
                },
            ]}
        />
    );
};

function LineGraph() {
    return (
        <div className="App">
            <div className="wrapper">
                <div className="graphContainer">
                    <ResponsiveLine
                        data={data1}
                        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                        xScale={{ type: 'point' }}
                        yScale={{
                            type: 'linear',
                            min: 3600,
                            max: 6000,
                            stacked: true,
                            reverse: false,
                        }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={null}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'emissions',
                            legendOffset: -40,
                            legendPosition: 'middle',
                        }}
                        pointSize={10}
                        pointColor={{ theme: 'background' }}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: 'serieColor' }}
                        pointLabelYOffset={-12}
                        useMesh={true}
                        colors={{ scheme: 'set1' }}
                        legends={[
                            {
                                anchor: 'bottom-left',
                                direction: 'column',
                                justify: false,
                                translateX: -30,
                                translateY: 0,
                                itemsSpacing: 0,
                                itemDirection: 'left-to-right',
                                itemWidth: 80,
                                itemHeight: 20,
                                itemOpacity: 0.75,
                                symbolSize: 12,
                                symbolShape: 'circle',
                                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemBackground: 'rgba(0, 0, 0, .03)',
                                            itemOpacity: 1,
                                        },
                                    },
                                ],
                            },
                        ]}
                    />
                </div>
                <div className="secondGraph">
                    <SecondGraph />
                </div>
            </div>
        </div>
    );
}

export default LineGraph;
