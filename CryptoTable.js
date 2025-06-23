
import React, { useEffect, useState } from "react";
import axios from "axios";

const CryptoTable = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'inr',
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: false,
      }
    }).then(res => {
      setCoins(res.data);
    }).catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Top 10 Cryptos</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Name</th><th>Symbol</th><th>Price (₹)</th><th>24h %</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id}>
              <td>{coin.name}</td>
              <td>{coin.symbol.toUpperCase()}</td>
              <td>₹{coin.current_price.toLocaleString()}</td>
              <td className={coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
