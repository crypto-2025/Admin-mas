import React, { useContext, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  Button,
  makeStyles,
  Input,
  InputAdornment,
  IconButton,
  Typography,
} from "@material-ui/core";
import { AuthContext } from "src/context/Auth";
import { Link } from "react-router-dom";
import DashboardCard from "src/component/DashboardCard";
import TokenImgCard from "src/component/TokenImgCard";
import { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import BalanceBox from "src/component/BalanceBox";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import axios from "axios";
import { toast } from "react-toastify";
import Apiconfigs from "src/Apiconfig/Apiconfig";
const Dashboardcard = [
  {
    title: "unique wallets connected",
    data: "3000",
  },
];
const useStyles = makeStyles((theme) => ({
  LoginBox: {
    marginTop: "3rem",
    padding: "150px 30px 100px",
    minHeight: "780px",
    "& h6": {
      fontWeight: "bold",
      marginBottom: "10px",
    },
  },
  TokenBox: {
    boxShadow: "0 0 10px #cec4ff",
    borderRadius: "8px",
    padding: "20px 10px",
  },
  tok: {
    fontFamily: "Poppins",
    color: "#6345ED",
    letterSpacing: "1px",
  },
  btnPro: {
    marginLeft: "1rem",
    color: "white",
    borderRadius: "10px",
    background: "linear-gradient(45deg, #6345ED, #DC39FC)",
    transition: "background  .6s",
    "&:hover": {
      background: "linear-gradient(45deg, #DC39FC, #6345ED)",
    },
  },
  btnOutPro: {
    border: "#6345ED 1px solid",
    color: "#6345ED",
    "&:hover": {
      background: "linear-gradient(45deg, #6345ED, #DC39FC) !important",
      color: "white",
      border: "none",
    },
  },
}));

export default function Login() {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  console.log(auth?.platformBalance);
  const [handleSubmit, sethandleSubmit] = useState();
  const [walletAddress, setWalletAddress] = useState("");
  const [handleInputChange, sethandleInputChange] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const WalletAddressInput = () => {
    const [walletAddress, setWalletAddress] = useState("");

    const [error, setError] = useState("");

    const handleInputChange = (event) => {
      setWalletAddress(event.target.value);
      setError(""); // Clear any previous errors when the input changes
    };

    const handleSubmit = async (event) => {
      event.preventDefault();

      // Simple validation check
      if (!walletAddress.trim()) {
        setError("Wallet address cannot be empty");
        return;
      }

      // Additional validation or actions can be performed here

      try {
        // Hypothetical function to send data to the server
        await sendToServer(walletAddress);
        console.log("Submitted wallet address:", walletAddress);
      } catch (error) {
        console.error("Error submitting wallet address:", error.message);
      }
    };

    const sendToServer = async (address) => {
      // Hypothetical function to send data to the server
      // Replace this with your actual server communication logic
      console.log("Sending wallet address to the server:", address);
      // Simulate a delay or async operation (replace with your actual async logic)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Throw an error for simulation purposes
      throw new Error("Server error"); // Comment or remove this line in a real application
    };
  };
  const sendTokens = async () => {
    try {
      console.log("Button clicked");
      console.log("Sending tokens...");
      const response = await axios({
        method: "POST",
        url: Apiconfigs.sendTokens,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });

      console.log("Response:", response);

      if (response.data.statusCode === 200) {
        toast.success("Token sent Successfully");
      } else {
        toast.error(response.data.responseMessage);
      }
    } catch (error) {
      console.error("Error sending tokens:", error);

      if (error.response) {
        toast.error(error.response.data.responseMessage);
      } else {
        toast.error(error.message);
      }

      setIsloading(true);

      setTimeout(() => {
        setIsloading(false);
      }, 2000);
    }
  };
  return (
    <Box className={classes.LoginBox}>
      <Box
        className={classes.btnsec}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h3"
          style={{ color: "#6345ED", fontWeight: "700", fontSize: "2rem" }}
        >
          Tokens Management
        </Typography>
      </Box>
      <Container maxWidth="xl">
        <Box mt={5} pt={5}>
          <Typography variant="h6" className={classes.tok}>
            Tokens in the platform wallet:
          </Typography>
          <Box className={classes.TokenBox} mb={4}>
            <Grid
              container
              spacing={4}
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <Grid item xs={12} md={12} lg={2} className="">
                <TokenImgCard
                  image="images/tokens/1.png"
                  value={
                    auth?.platformBalance?.masBalance
                      ? auth?.platformBalance?.masBalance
                      : "0"
                  }
                />
              </Grid>
              <Grid item xs={12} md={12} lg={2}>
                <TokenImgCard
                  image="images/tokens/2.png"
                  value={
                    auth?.platformBalance?.bnbBalance
                      ? auth?.platformBalance?.bnbBalance
                      : "0"
                  }
                />
              </Grid>
              <Grid item xs={12} md={12} lg={2}>
                <TokenImgCard
                  image="images/tokens/6.png"
                  value={
                    auth?.platformBalance?.busdBalance
                      ? auth?.platformBalance?.busdBalance
                      : "0"
                  }
                />
              </Grid>
              <Grid item xs={12} md={12} lg={2}>
                <TokenImgCard
                  image="images/tokens/3.png"
                  value={
                    auth?.platformBalance?.usdtBalance
                      ? auth?.platformBalance?.usdtBalance
                      : "0"
                  }
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Box mt={3} display="flex" justifyContent="center"></Box>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form onSubmit={sendTokens} style={{ margin: "2rem" }}>
          <Typography
            variant="h3"
            style={{ color: "#6345ED", margin: "1rem 0" }}
          >
            Enter Wallet Address to take Tokens:
          </Typography>
          <input
            type="text"
            value={walletAddress}
            onChange={sendTokens}
            placeholder="Enter your wallet address"
            style={{
              margin: " 0 1rem",
              padding: "10px",
              fontSize: "16px",
              boxShadow: "0 0 10px #6345ED",
              borderRadius: "8px",
              border: "1px solid #6345ED",
              borderRadius: "5px",
              outline: "none",
            }}
          />
          <Button
            buttonText="sendTokens"
            onClick={sendTokens}
            color="secondary"
            variant="contained"
            disabled={isLoading}
            className={classes.btnPro}
          >
            {isLoading ? "sendTokens..." : "sendTokens"}
          </Button>
        </form>
      </div>
      <Box />
      <Box
        className={classes.btnsec}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" style={{ color: "#6345ED" }}>
          Total earnings Management
        </Typography>
      </Box>
      <Container maxWidth="xl">
        <Box mt={5} pt={5}>
          <Typography variant="h6" className={classes.tok}>
            Total earnings of the platform:
          </Typography>
          <Box className={classes.TokenBox} mb={4}>
            <Grid
              container
              spacing={4}
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <Grid item xs={12} md={12} lg={2} className="">
                <TokenImgCard
                  image="images/tokens/1.png"
                  value={
                    auth?.adminTotalEarnings?.masBalance
                      ? auth?.adminTotalEarnings?.masBalance
                      : "0"
                  }
                />
              </Grid>
              <Grid item xs={12} md={12} lg={2}>
                <TokenImgCard
                  image="images/tokens/2.png"
                  value={
                    auth?.adminTotalEarnings?.bnbBalance
                      ? auth?.adminTotalEarnings?.bnbBalance
                      : "0"
                  }
                />
              </Grid>
              <Grid item xs={12} md={12} lg={2}>
                <TokenImgCard
                  image="images/tokens/6.png"
                  value={
                    auth?.adminTotalEarnings?.busdBalance
                      ? auth?.adminTotalEarnings?.busdBalance
                      : "0"
                  }
                />
              </Grid>
              <Grid item xs={12} md={12} lg={2}>
                <TokenImgCard
                  image="images/tokens/3.png"
                  value={
                    auth?.adminTotalEarnings?.usdtBalance
                      ? auth?.adminTotalEarnings?.usdtBalance
                      : "0"
                  }
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Box
        className={classes.btnsec}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" style={{ color: "#6345ED" }}>
          Wallet Address:
        </Typography>
      </Box>
      <Box mt={3} display="flex" justifyContent="center"></Box>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form onSubmit={handleSubmit} style={{ textAlign:'center' }}>
          <Typography
            variant="h3"
            style={{ color: "#6345ED", margin: "1rem 0" }}
          >
            Enter Wallet Address to take Total earnings:
          </Typography>
          <input
            type="text"
            value={walletAddress}
            onChange={handleInputChange}
            placeholder="Enter your wallet address"
            style={{
              margin: " 0 1rem",
              padding: "10px",
              fontSize: "16px",
              boxShadow: "0 0 10px #6345ED",
              borderRadius: "8px",
              border: "1px solid #6345ED",
              borderRadius: "5px",
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              marginLeft: "10px",
              padding: "10px",
              fontSize: "16px",
              cursor: "pointer",
              border: "none",
              fontWeight:'700'
            }}
            className={classes.btnPro}

          >
            Submit
          </button>
        </form>
      </div>
      <Box />
      <Box mt={3} display="flex" justifyContent="center">
        <Button
          variant="contained"
          size="medium"
          color="primary"
          component={Link}
          to="/user"
          className={classes.btnPro}
          style={{ padding:'.5rem 10rem' }}
        >
          back
        </Button>
      </Box>
    </Box>
  );
}
