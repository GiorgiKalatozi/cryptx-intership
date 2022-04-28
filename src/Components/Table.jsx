import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";

import { visuallyHidden } from "@mui/utils";

function createData(name) {
  return {
    name,
  };
}

const rows = [
  createData("#"),
  createData("Coin"),
  createData(""),
  createData("Price"),
  createData("1h"),
  createData("24h"),
  createData("7d"),
  createData("24h Volume	"),
  createData("Mkt Cap"),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "market_cap_rank",
    numeric: false,
    disablePadding: true,
    label: "#",
  },
  {
    id: "name",
    numeric: true,
    disablePadding: false,
    label: "Coin",
  },
  {
    id: "symbol",
    numeric: true,
    disablePadding: false,
    label: "",
  },
  {
    id: "current_price",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "price_change_percentage_1h_in_currency",
    numeric: true,
    disablePadding: false,
    label: "1h",
  },
  {
    id: "price_change_percentage_24h_in_currency",
    numeric: true,
    disablePadding: false,
    label: "24h",
  },
  {
    id: "price_change_percentage_7d_in_currency",
    numeric: true,
    disablePadding: false,
    label: "7d",
  },
  {
    id: "total_volume",
    numeric: true,
    disablePadding: false,
    label: "24h Volume",
  },
  {
    id: "market_cap",
    numeric: true,
    disablePadding: false,
    label: "Mkt Cap",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">#</TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            style={{ fontWeight: "bolder" }}
            key={headCell.id}
            // align={headCell.numeric ? "right" : "left"}
            align="left"
            // padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable({ coins }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [selected, setSelected] = useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(coins, getComparator(order, orderBy)).map(
                (coin, index) => {
                  const isItemSelected = isSelected(coin.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, coin.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={coin.name}
                      selected={isItemSelected}
                    >
                      <TableCell
                        align="left"
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {coin.market_cap_rank}
                      </TableCell>
                      <TableCell
                        align="left"
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <div className="coin-symbol">
                          <img src={coin.image} alt={coin.name} />
                          <p className="coin-name"> {coin.name}</p>
                        </div>
                      </TableCell>
                      <TableCell
                        align="left"
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {coin.symbol.toUpperCase()}
                      </TableCell>
                      <TableCell
                        align="left"
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        ${coin.current_price.toLocaleString()}
                      </TableCell>
                      <TableCell
                        align="left"
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {coin.price_change_percentage_1h_in_currency.toFixed(
                          2
                        ) < 0 ? (
                          <p className="red">
                            {coin.price_change_percentage_1h_in_currency.toFixed(
                              2
                            )}
                            %
                          </p>
                        ) : (
                          <p className="green">
                            {coin.price_change_percentage_1h_in_currency.toFixed(
                              2
                            )}
                            %
                          </p>
                        )}
                      </TableCell>
                      <TableCell
                        align="left"
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {coin.price_change_percentage_24h_in_currency.toFixed(
                          2
                        ) < 0 ? (
                          <p className="red">
                            {coin.price_change_percentage_24h_in_currency.toFixed(
                              2
                            )}
                            %
                          </p>
                        ) : (
                          <p className="green">
                            {coin.price_change_percentage_24h_in_currency.toFixed(
                              2
                            )}
                            %
                          </p>
                        )}
                      </TableCell>
                      <TableCell
                        align="left"
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {coin.price_change_percentage_7d_in_currency.toFixed(
                          2
                        ) < 0 ? (
                          <p className="red">
                            {coin.price_change_percentage_7d_in_currency.toFixed(
                              2
                            )}
                            %
                          </p>
                        ) : (
                          <p className="green">
                            {coin.price_change_percentage_7d_in_currency.toFixed(
                              2
                            )}
                            %
                          </p>
                        )}
                      </TableCell>
                      <TableCell
                        align="left"
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        ${coin.total_volume.toLocaleString()}
                      </TableCell>
                      <TableCell
                        align="left"
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        ${coin.market_cap.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
