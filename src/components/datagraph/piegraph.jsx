import React from 'react'
import { ResponsivePie } from '@nivo/pie'


const sum = 5709.07 + 548.63 + 5944.84 + 6141.64 + 8800.82 + 297.57;

const data = [
    {
        "id": "농업",
        "label": "농업",
        "value": (5709.07/sum * 100).toFixed(2),
        "color": "hsl(122, 70%, 50%)"
    },
    {
        "id": "산업공정",
        "label": "산업공정",
        "value": (548.63/sum * 100).toFixed(2),
        "color": "hsl(124, 70%, 50%)"
    },
    {
        "id": "에너지",
        "label": "에너지",
        "value": (5944.84/sum * 100).toFixed(2),
        "color": "hsl(122, 70%, 50%)"
    },
    {
        "id": "축산업",
        "label": "축산업",
        "value": (6141.64/sum * 100).toFixed(2),
        "color": "hsl(126, 70%, 50%)"
    },
    {
        "id": "폐기물",
        "label": "폐기물",
        "value": (8800.82/sum * 100).toFixed(2),
        "color": "hsl(123, 70%, 50%)"
    },
    {
        "id": "LULUCF",
        "label": "LULUCF",
        "value": (297.57/sum * 100).toFixed(2),
        "color": "hsl(122, 70%, 50%)"
    }
];

const PieGraph = () => {
  return (
    
      <div className="App2" >
        <div className="wrapper2" >
          <div className="graphContainer2" >
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
            legends={[]}
            />
          </div>
        </div>
      </div>
      
      
  );
    
};

export default PieGraph;
