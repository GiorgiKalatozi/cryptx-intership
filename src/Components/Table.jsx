import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(id, name, price, h1, h24, d7, h24_volume, mkt_cap) {
  return { id, name, price, h1, h24, d7, h24_volume, mkt_cap };
}

const rows = [
  createData(1, "BTC", 58000, 10, 24, 100, 22424, 121313),
  createData(2, "Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData(3, "Eclair", 262, 16.0, 24, 6.0),
  createData(4, "Cupcake", 305, 3.7, 67, 4.3),
  createData(5, "Solana", 356, 16.0, 49, 3.9),
  createData(6, "Bitcoin", 356, 16.0, 49, 3.9),
  createData(7, "Etherium", 356, 16.0, 49, 3.9),
  createData(8, "dog", 356, 16.0, 49, 3.9),
];

const url =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d";

function CustomizedTables() {
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

  // const filteredCoins = coins.filter(
  //   (coin) =>
  //     coin.name.toLowerCase().includes(search.toLowerCase()) ||
  //     coin.symbol.toLowerCase().includes(search.toLocaleLowerCase()) ||
  //     coin.current_price.toString().includes(search.toLocaleString())
  // );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell>Coin</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">1h</StyledTableCell>
            <StyledTableCell align="right">24h</StyledTableCell>
            <StyledTableCell align="right">7d</StyledTableCell>
            <StyledTableCell align="right">24h Volume</StyledTableCell>
            <StyledTableCell align="right">Mkt Cap</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="left">{row.id}</StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.price}</StyledTableCell>
              <StyledTableCell align="right">{row.h1}</StyledTableCell>
              <StyledTableCell align="right">{row.h24}</StyledTableCell>
              <StyledTableCell align="right">{row.d7}</StyledTableCell>
              <StyledTableCell align="right">{row.h24_volume}</StyledTableCell>
              <StyledTableCell align="right">{row.mkt_cap}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomizedTables;
