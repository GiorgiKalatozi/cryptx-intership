import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontWeight: 700,
    fontSize: 14,
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

function CustomizedTables({ coins }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell>Coin</StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">1h</StyledTableCell>
            <StyledTableCell align="right">24h</StyledTableCell>
            <StyledTableCell align="right">7d</StyledTableCell>
            <StyledTableCell align="right">24h Volume</StyledTableCell>
            <StyledTableCell align="right">Mkt Cap</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coins.map((coin) => (
            <StyledTableRow key={coin.id}>
              <StyledTableCell align="left">
                {coin.market_cap_rank}
              </StyledTableCell>
              <StyledTableCell
                className="img-symbol"
                component="th"
                scope="row"
              >
                <div className="coin-symbol">
                  <img src={coin.image} alt={coin.name} />
                  <p className="coin-name"> {coin.name}</p>
                </div>
              </StyledTableCell>
              <StyledTableCell align="left">
                {coin.symbol.toUpperCase()}
              </StyledTableCell>
              <StyledTableCell align="right">
                ${coin.current_price.toLocaleString()}
              </StyledTableCell>
              <StyledTableCell align="right">
                {coin.price_change_percentage_1h_in_currency.toFixed(2) < 0 ? (
                  <p className="red">
                    {coin.price_change_percentage_1h_in_currency.toFixed(2)}%
                  </p>
                ) : (
                  <p className="green">
                    {coin.price_change_percentage_1h_in_currency.toFixed(2)}%
                  </p>
                )}
              </StyledTableCell>
              <StyledTableCell align="right">
                {coin.price_change_percentage_24h_in_currency.toFixed(2) < 0 ? (
                  <p className="red">
                    {coin.price_change_percentage_24h_in_currency.toFixed(2)}%
                  </p>
                ) : (
                  <p className="green">
                    {coin.price_change_percentage_24h_in_currency.toFixed(2)}%
                  </p>
                )}
              </StyledTableCell>
              <StyledTableCell align="right">
                {coin.price_change_percentage_7d_in_currency.toFixed(2) < 0 ? (
                  <p className="red">
                    {coin.price_change_percentage_7d_in_currency.toFixed(2)}%
                  </p>
                ) : (
                  <p className="green">
                    {coin.price_change_percentage_7d_in_currency.toFixed(2)}%
                  </p>
                )}
              </StyledTableCell>
              <StyledTableCell align="right">
                ${coin.total_volume.toLocaleString()}
              </StyledTableCell>
              <StyledTableCell align="right">
                ${coin.market_cap.toLocaleString()}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomizedTables;
