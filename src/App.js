import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Heading from "./Components/Heading";
import Table from "./Components/Table";
import Cards from "./Components/Cards";

const url =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d";

function App() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setCoins(response.data);
        console.log(response.data[0]);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="">
      <Heading />
      <Cards coins={coins} />
      <Table coins={coins} setCoins={setCoins} />
    </div>
  );
}

export default App;
