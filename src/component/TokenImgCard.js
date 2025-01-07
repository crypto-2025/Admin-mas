import React from "react";
import {
  Typography,
  Box,
  makeStyles,
  Avatar,
  Grid,
  Button,
  Link,
} from "@material-ui/core";
import { FaEllipsisV } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { BsClockHistory } from "react-icons/bs";

const useStyles = makeStyles((theme) => ({
  cards: {
    border: "solid 0.5px #e5e3dd",
    background: "linear-gradient(45deg, #6345ED, #DC39FC)",
    padding: "25px",
    borderRadius: "8px",
    boxShadow:'0 0 8px #DC39FC',
    // height:"100%",
    textAlign: "center",
    "& h2": {
      fontSize: "20px",
      color: "white",
      fontWeight: "bold",
      lineHeight: "1.52",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      wordBreak: "break-word",
    },
  },
}));

export default function UsersCard({ image, value }) {
  const classes = useStyles();

  return (
    <Box className={classes.cards}>
      <Typography variant="h2" component="h2" >
        {value && parseFloat(value).toFixed(2)} &nbsp;
        <img src={image} alt="COIN IMAGE" />
      </Typography>
    </Box>
  );
}
