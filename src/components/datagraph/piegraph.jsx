import React from 'react'
import { ResponsivePie } from '@nivo/pie'


const data = [
    {
        "id": "농업",
        "label": "농업",
        "value": 5709.07,
        "color": "hsl(122, 70%, 50%)"
    },
    {
        "id": "산업공정",
        "label": "산업공정",
        "value": 548.63,
        "color": "hsl(124, 70%, 50%)"
    },
    {
        "id": "에너지",
        "label": "에너지",
        "value": 5944.84,
        "color": "hsl(122, 70%, 50%)"
    },
    {
        "id": "축산업",
        "label": "축산업",
        "value": 6141.64,
        "color": "hsl(126, 70%, 50%)"
    },
    {
        "id": "폐기물",
        "label": "폐기물",
        "value": 8800.82,
        "color": "hsl(123, 70%, 50%)"
    },
    {
        "id": "LULUCF",
        "label": "LULUCF",
        "value": 297.57,
        "color": "hsl(122, 70%, 50%)"
    }
];

const PieGraph = () => {
  return (
    
      <div className="App">
        <div className="wrapper">
          <div className="graphContainer">
            <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.2
                    ]
                ]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: '농업'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: '산업공정'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: '에너지'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: '축산업'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: '폐기물'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'LULUCF'
                    },
                    id: 'lines'
                }
            ]}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
              ]}
            />
          </div>
        </div>
      </div>
      
      
  );
    
};

export default PieGraph;
