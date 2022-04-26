import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function Filters({ setSearch, setPriceTo }) {
  const handleChange = (e) => {
    e.preventDefault();
    const reg = /^([^0-9$%]*)$/;
    if (reg.test(e.target.value)) {
      setSearch(e.target.value);
    }
  };
  const handleChangeFrom = (e) => {
    e.preventDefault();

    setSearch(e.target.value);
    // console.log(e.target.value);
  };
  const handleChangeTo = (e) => {
    e.preventDefault();

    setPriceTo(e.target.value);
    console.log(e.target.value);
  };

  const handleSort = (e) => {
    e.preventDefault();
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        style={{ width: "200px" }}
        size="small"
        id="outlined-name"
        label="Search by coin"
        type="text"
        onChange={handleChange}
      />
      <TextField
        style={{ width: "150px" }}
        size="small"
        id="outlined-name"
        type="number"
        label="Price from"
        onChange={handleChangeFrom}
      />
      <TextField
        style={{ width: "150px" }}
        size="small"
        id="outlined-name"
        label="Price to"
        type="number"
        // value={name}
        onChange={handleChangeTo}
      />
    </Box>
  );
}

export default Filters;
