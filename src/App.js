import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Heading from "./Components/Heading";
import Table from "./Components/Table";
import Cards from "./Components/Cards";
import Filters from "./Components/Filters";

const url =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setCoins(response.data);
        console.log(response.data[0]);
      })
      .catch((error) => console.log(error));
  }, []);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLocaleLowerCase()) ||
      coin.current_price.toString().includes(search.toLocaleString())
  );

  return (
    <div className="">
      <Heading />
      <Cards coins={filteredCoins} />
      <Filters coins={filteredCoins} setSearch={setSearch} />
      <Table coins={filteredCoins} setCoins={setCoins} />
    </div>
  );
}

export default App;
