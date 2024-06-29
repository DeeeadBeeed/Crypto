import React, { useContext, useEffect, useMemo, useState } from 'react';
import { CoinContext } from '../CoinContext';
import { Link } from 'react-router-dom';
import { useTable } from 'react-table';

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState('');

  const inputHandler = (event) => {
    setInput(event.target.value);
  };

  const searchHandler = async (event) => {
    event.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  const columns = useMemo(
    () => [
      {
        Header: 'Rank',
        accessor: 'market_cap_rank',
      },
      {
        Header: 'Image',
        accessor: 'image',
        Cell: ({ cell: { value } }) => <img src={value} alt="coin" className="w-8 h-8" />,
      },
      {
        Header: 'Name',
        accessor: 'name',
        Cell: ({ row }) => (
          <Link to={`/coin/${row.original.id}`} className="text-blue-500">
            {row.original.name}
          </Link>
        ),
      },
      {
        Header: 'Price',
        accessor: 'current_price',
        Cell: ({ cell: { value } }) => `${currency.symbol}${value}`,
      },
      {
        Header: '24H Change',
        accessor: 'price_change_percentage_24h',
        Cell: ({ cell: { value } }) => `${value}%`,
      },
      {
        Header: 'Market Cap',
        accessor: 'market_cap',
      },
    ],
    [currency]
  );

  const data = useMemo(() => displayCoin.slice(0, 10), [displayCoin]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className="px-6 pb-20">
      <div className="my-20 flex flex-col items-center text-center gap-7">
        <h1 className="text-3xl font-bold">Crypto Price Tracking</h1>
        <p className="leading-6 text-lg">Welcome</p>
      </div>
      <form onSubmit={searchHandler} className="p-4 bg-white rounded-md text-sm flex justify-center items-center gap-4 shadow-md">
        <input
          onChange={inputHandler}
          list="coinlist"
          value={input}
          type="text"
          placeholder="Search Crypto"
          className="p-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <datalist id="coinlist">
          {allCoin.map((item, index) => (
            <option key={index} value={item.name} />
          ))}
        </datalist>
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
          Search
        </button>
      </form>
      <table {...getTableProps()} className="min-w-full bg-white mt-10 shadow-md rounded-lg">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="border-b">
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="px-5 py-5 text-sm">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
