import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../App.css";

function OutlinedCard({ coins }) {
  const market_cap = coins.reduce((sum, coins) => coins.market_cap + sum, 0);

  const trading_volume = coins.reduce(
    (sum, coins) => coins.total_volume + sum,
    0
  );

  const coins_sum = coins.reduce((sum, coins) => coins.name + sum, 0);

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography variant="h5" component="div">
          ${market_cap.toLocaleString()}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Market Capitalization
        </Typography>
      </CardContent>
    </React.Fragment>
  );
  const card2 = (
    <React.Fragment>
      <CardContent>
        <Typography variant="h5" component="div">
          ${trading_volume.toLocaleString()}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          24h Trading Volume
        </Typography>
      </CardContent>
    </React.Fragment>
  );
  const card3 = (
    <React.Fragment>
      <CardContent>
        <Typography variant="h5" component="div">
          {coins_sum.length}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          # of Coins
        </Typography>
      </CardContent>
    </React.Fragment>
  );

  return (
    <Box className="cards" sx={{ minWidth: 50 }}>
      <Card
        style={{ borderRadius: "20px" }}
        sx={{ width: 300, height: 100 }}
        variant="outlined"
      >
        {card}
      </Card>
      <Card
        style={{ borderRadius: "20px" }}
        sx={{ width: 300, height: 100 }}
        variant="outlined"
      >
        {card2}
      </Card>
      <Card
        style={{ borderRadius: "20px" }}
        sx={{ width: 300, height: 100 }}
        variant="outlined"
      >
        {card3}
      </Card>
    </Box>
  );
}

export default OutlinedCard;
