import React, { useContext } from 'react';
import { CoinContext } from '../CoinContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);

  const currencyHandler = (e) => {
    switch (e.target.value) {
      case "usd":
        setCurrency({ name: "usd", symbol: "$" });
        break;
      case "eur":
        setCurrency({ name: "eur", symbol: "€" });
        break;
      case "sgd":
        setCurrency({ name: "sgd", symbol: "S$" });
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex items-center justify-between p-6 border-b-2 border-gray-200 bg-white shadow-md">
      <ul className="flex gap-10 list-none text-lg font-medium">
        <li>
          <Link to="/" className="hover:text-blue-500 transition duration-300">Home</Link>
        </li>
        <li>
          <Link to="/features" className="hover:text-blue-500 transition duration-300">Features</Link>
        </li>
        <li>
          <Link to="/pricing" className="hover:text-blue-500 transition duration-300">Pricing</Link>
        </li>
        <li>
          <Link to="/blog" className="hover:text-blue-500 transition duration-300">Blog</Link>
        </li>
      </ul>
      <div className="flex items-center gap-4">
        <select onChange={currencyHandler} className="px-3 py-2 rounded-md border-2 border-gray-300 bg-white text-gray-700">
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="sgd">SGD</option>
        </select>
        <button className="py-2 px-5 rounded-2xl text-xl font-medium bg-blue-500 text-white hover:bg-blue-600 transition duration-300">Sign Up</button>
        <a href="https://github.com/DeeeadBeeed/Crypto" target="_blank" rel="noopener noreferrer" className="py-2 px-5 rounded-2xl text-xl font-medium bg-green-500 text-white hover:bg-green-600 transition duration-300">
          View Source Code
        </a>
      </div>
    </div>
  );
};

export default Navbar;
