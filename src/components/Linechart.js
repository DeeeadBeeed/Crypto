import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";

const Linechart = ({ historicalData }) => {

  const [data, setData] = useState([["Date", "Prices"]]);

  useEffect(() => {
    if (historicalData.prices) {
      const dataCopy = [["Date", "Prices"]];
      historicalData.prices.forEach((item) => {
        dataCopy.push([new Date(item[0]), item[1]]);
      });
      setData(dataCopy);
    }
  }, [historicalData]);

  return (
    <Chart
      chartType='LineChart'
      data={data}
      height="100%"
      legendToggle
    />
  );
};

export default Linechart;
