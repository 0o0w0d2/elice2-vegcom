import React from 'react';
import { ResponsiveBar } from '@nivo/bar'


const data = [
  {
      "type": "vegi",
      "value": 1.851724137931034
  },
  {
      "type": "meat",
      "value": 20.6
  },
  {
      "type": "others",
      "value": 8.4
  },
  {
      "type": "fish",
      "value": 8.45
  },
];

const CO2BarGraph = () => {
  return(
    <div className="App">
      <div div className="wrapper">
        <div className="graphContainer">
          <ResponsiveBar
            data={data}
            keys={['value']}
            indexBy="type"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={"#008000"}
            borderColor={{
              from: 'color',
              modifiers: [
                  [
                      'darker',
                      1.6
                  ]
              ]
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Kg CO2',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                  [
                      'darker',
                      1.6
                  ]
              ]
            }}
            
          
        />
      </div>
    </div>
  </div>
  )
};

export default CO2BarGraph;