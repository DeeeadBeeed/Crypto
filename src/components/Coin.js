import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { CoinContext } from '../CoinContext';
import Linechart from './Linechart';

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null); 
  const [historicalData, setHistoricalData] = useState(null);
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-4ZEFuvYhrvzNw95P2P1cUPfw' }
    };

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options);
      const data = await response.json();
      setCoinData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-4ZEFuvYhrvzNw95P2P1cUPfw'
      }
    };

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10`, options);
      const data = await response.json();
      setHistoricalData(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency, coinId]);

  if (coinData && historicalData) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center space-x-4">
          <img src={coinData.image.large} alt={coinData.name} className="w-16 h-16" />
          <h1 className="text-2xl font-bold">{coinData.name}</h1>
        </div>
        <div className="my-4">
          <Linechart historicalData={historicalData} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 border rounded-md">
            <h2 className="text-xl font-semibold">Current Price</h2>
            <p>{currency.symbol}{coinData.market_data.current_price[currency.name]}</p>
          </div>
          <div className="p-4 border rounded-md">
            <h2 className="text-xl font-semibold">Market Cap</h2>
            <p>{currency.symbol}{coinData.market_data.market_cap[currency.name]}</p>
          </div>
          <div className="p-4 border rounded-md">
            <h2 className="text-xl font-semibold">Total Volume</h2>
            <p>{currency.symbol}{coinData.market_data.total_volume[currency.name]}</p>
          </div>
          <div className="p-4 border rounded-md">
            <h2 className="text-xl font-semibold">24H High</h2>
            <p>{currency.symbol}{coinData.market_data.highgit_24h[currency.name]}</p>
          </div>
          <div className="p-4 border rounded-md">
            <h2 className="text-xl font-semibold">24H Low</h2>
            <p>{currency.symbol}{coinData.market_data.low_24h[currency.name]}</p>
          </div>
          <div className="p-4 border rounded-md">
            <h2 className="text-xl font-semibold">Price Change 24H</h2>
            <p>{coinData.market_data.price_change_percentage_24h}%</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="grid">
        Loading...
      </div>
    );
  }
};

export default Coin;
