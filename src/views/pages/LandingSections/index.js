import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Divider,
  Box,
  Typography,
  Button,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Table,
} from "@material-ui/core";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfig";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";

import Page from "src/component/Page";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "src/component/Loader";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles({
  table: {
    minWidth: 320,
  },
  pdbt: {
    paddingBottom: 68,
    minWidth: "1050px",
    width: "auto",
  },

  button: {
    background: "linear-gradient(0deg, #6345ED, #DC39FC)",
    minWidth: "initial",
    padding: "6px",
    marginLeft: "7px",
    "&hover": {
      background: "linear-gradient(0deg, #DC39FC, #6345ED) !important",
    },
  },
  mainbox: {
    minHeight: "calc(100vh - 41px)",
    paddingBottom: "1rem",
  },
  table: {
    border: "1px solid #e5e3dd",
    "& th": {
      border: "1px solid #e5e3dd",
      padding: "14px !important",
    },
    "& td": {
      border: "1px solid #e5e3dd",
      padding: "10px !important",
    },
  },
  Paper: {
    boxShadow: "none",
  },
  btnPro: {
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
});
export default function LandingSections() {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [contentList, setContentList] = useState([]);

  useEffect(() => {
    const getSections = async () => {
      try {
        setIsLoading(true);
        const res = await axios({
          method: "GET",
          url: Apiconfigs.landingContentList,
        });
        if (res.data.statusCode === 200) {
          setContentList(res.data.result);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getSections();
  }, []);

  return (
    <Page title="Landing page Sections Management">
      <Box className={classes.mainbox}>
        <Container maxWidth="xl" style={{ marginTop: "12rem" }}>
          <Box mb={5}>
            <Typography variant="h3" style={{ marginBottom: "8px" }}>
              <strong style={{ color: "#6345ED" }}>
                {" "}
                Landing Page Management
              </strong>
            </Typography>
            <Divider />
          </Box>

          <>
            <TableContainer className={classes.Paper} component={Paper}>
              <Table
                className={classes.table}
                aria-label="simple table"
                id="user_list"
              >
                <TableHead>
                  <TableRow
                    style={{
                      background:
                        "linear-gradient(180deg, #c04848 0%, #480048 100%)",
                    }}
                  >
                    <TableCell
                      style={{
                        color: "white",
                        background: "linear-gradient(0deg, #6345ED, #DC39FC)",
                      }}
                    >
                      Sr.No
                    </TableCell>
                    <TableCell
                      style={{
                        color: "white",
                        background: "linear-gradient(0deg, #6345ED, #DC39FC)",
                      }}
                      align="center"
                    >
                      Title
                    </TableCell>
                    <TableCell
                      style={{
                        color: "white",
                        background: "linear-gradient(0deg, #6345ED, #DC39FC)",
                      }}
                      align="center"
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ width: "80px" }}
                    >
                      1
                    </TableCell>
                    <TableCell align="center">
                      {contentList[0]?.title}
                    </TableCell>
                    <TableCell style={{ width: "80px" }} align="right">
                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          variant="contained"
                          className={classes.button}
                          onClick={() =>
                            history.push({
                              pathname: "/oursolutions/" + contentList[0]?._id,
                              state: { componentCall: "View" },
                            })
                          }
                        >
                          <VisibilityIcon style={{ fontSize: "15px" }} />
                        </Button>
                        <Button
                          variant="contained"
                          className={classes.button}
                          onClick={() =>
                            history.push({
                              pathname: "/oursolutions/" + contentList[0]?._id,
                              state: { componentCall: "Edit" },
                            })
                          }
                        >
                          <EditIcon
                            fontSize="small"
                            style={{ fontSize: "15px" }}
                          />
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ width: "80px" }}
                    >
                      2
                    </TableCell>
                    <TableCell align="center">
                      {contentList[1]?.title}
                    </TableCell>
                    <TableCell style={{ width: "80px" }} align="right">
                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          variant="contained"
                          className={classes.button}
                          onClick={() =>
                            history.push({
                              pathname: "/how-it-works/" + contentList[1]?._id,
                              state: { componentCall: "View" },
                            })
                          }
                        >
                          <VisibilityIcon style={{ fontSize: "15px" }} />
                        </Button>
                        <Button
                          variant="contained"
                          className={classes.button}
                          onClick={() =>
                            history.push({
                              pathname: "/how-it-works/" + contentList[1]?._id,
                              state: { componentCall: "Edit" },
                            })
                          }
                        >
                          <EditIcon
                            fontSize="small"
                            style={{ fontSize: "15px" }}
                          />
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {isLoading && <Loader />}
            </TableContainer>
          </>
        </Container>
      </Box>
    </Page>
  );
}
