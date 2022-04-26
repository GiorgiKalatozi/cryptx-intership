import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function Filters({ coins, setSearch }) {
  // const [name, setName] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    // console.log(name);
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
        id="outlined-name"
        label="Search by coin"
        // value={name}
        onChange={handleChange}
      />
    </Box>
  );
}
export default Filters;
