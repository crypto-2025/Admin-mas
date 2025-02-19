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
    borderRadius: "8px",
    boxShadow: " 0px 0 8px #DC39FC",
    padding: "10px 20px 20px 20px",
    // textAlign: 'center',
    "& span": {
      fontSize: "14px",
      color: "#fff",
    },
    "& h2": {
      fontSize: "25px",
      color: "#fff",
      fontWeight: "bold",
      lineHeight: "1.52",
      wordBreak: "break-word",
    },
    // "&:hover": {
    //   background: "linear-gradient(45deg, #DC39FC, #6345ED)",
    // },
  },

}));

export default function UsersCard({ name, value }) {
  const classes = useStyles();

  return (
    <Box className={classes.cards}>
      <Typography variant="body2" component="span">
        {name}
      </Typography>
      <Typography variant="h2" component="h2">
        {value}
      </Typography>
    </Box>
  );
}
