import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Box,
  Typography,
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Apiconfigs from "src/Apiconfig/Apiconfig";
import axios from "axios";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

const useStyles = makeStyles(() => ({
  bannerSectionBody: {
    padding: "80px 0px",
    minHeight: "770px",
    "& h3": {
      colors: "#000",
    },
  },
  dailogTitle: {
    align: "Center",
    "& h2": {
      color: "#141518",
      fontSize: "23px",
    },
  },
  input_fild2: {
    width: "100%",
    "& input": {
      height: "30px",
      paddingTop: "22px",
    },
  },
  input_fild3: {
    width: "100%",
    "& input": {
      height: "30px",
      paddingTop: "10px",
    },
  },
  UploadBox: {
    padding: '30px 0px',
    border: "solid 0.5px #707070",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "110px",
  },
  input_fild22: {
    width: "100%",
    "& input": {
      height: "45px",
      border: 0,
    },
    "& .MuiInput-underline:before": {
      border: 0,
    },
  },
  newbox: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
  },
}));

export default function AddBackground() {
  const classes = useStyles();
  const history = useHistory();
  const [isSubmit, setIsSubmit] = useState(false);
  const [process, setprocess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [message, setmessage] = useState("");

  const [bannerTitle, setbannerTitle] = useState("");
  const [bannerDescription, setBannerDescription] = useState("");
  const [url, setUrl] = useState("");

  const [bannerMedia, setbannerMedia] = useState("");
  const [bannerMediaType, setbannerMediaType] = useState("");
  const [bannerMediaPreview, setbannerMediaPreview] = useState("");

  const { id } = useParams();

  const accessToken = sessionStorage.getItem("AccessToken");

  const post = async () => {
    setIsSubmit(true);
    const formData = new FormData();
    if (bannerMedia) {
      formData.append("media", bannerMedia);
      formData.append("mediaType", bannerMediaType);
    }

    if (bannerTitle) {
      formData.append("title", bannerTitle);
    }
    if (url) {
      formData.append("url", url);
    }
    if (bannerDescription) {
      formData.append("description", bannerDescription);
    }

    formData.append("_id", id);

    try {
      setmessage("Updating Banner...");
      setprocess(true);

      const onUploadProgress = (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadPercent(percentCompleted);
      };

      const res = await axios({
        method: "PUT",
        url: Apiconfigs.bannerApp,
        headers: {
          token: accessToken,
        },
        data: formData,
        onUploadProgress: onUploadProgress,
      });
      if (res.data.statusCode === 200) {
        setprocess(false);
        history.push("/banners-application");
        toast.success("Banner updated successfully. ");
      }
    } catch (e) {
      setprocess(false);
    }
  };

  const getBannerDetailsHandler = async (id) => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.bannerApp,
        params: {
          _id: id,
        },
      });
      if (res.data.statusCode === 200) {
        setbannerTitle(res.data.result?.title ? res.data.result?.title : "");
        setUrl(res.data.result?.url ? res.data.result?.url : "");
        setbannerMediaPreview(
          res.data.result?.media ? res.data.result?.media : ""
        );
        setbannerMediaType(
          res.data.result?.mediaType ? res.data.result?.mediaType : ""
        );
        setBannerDescription(
          res.data.result?.description ? res.data.result?.description : ""
        );
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBannerDetailsHandler(id);
  }, [id]);

  return (
    <Box className={classes.bannerSectionBody} mt={1}>
      <Container maxWidth="xl">
        <Box>
          <Typography variant="h3">Edit Banner</Typography>

          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <label> Banner Title :</label>
              </Grid>
              <Grid item xs={12} md={9}>
                <TextField
                  id="standard-basic"
                  placeholder="Banner title here"
                  className={classes.input_fild2}
                  value={bannerTitle}
                  onChange={(e) => setbannerTitle(e.target.value)}
                  /*error={isSubmit && bannerTitle === ""}
                                                                                          helperText={
                                                                                            isSubmit &&
                                                                                            bannerTitle === "" &&
                                                                                            "*Please enter valid title"
                                                                                          }*/
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <label> Banner Description :</label>
              </Grid>
              <Grid item xs={12} md={9}>
                <TextField
                  id="standard-basic"
                  placeholder="Description"
                  className={classes.input_fild2}
                  value={bannerDescription}
                  onChange={(e) => setBannerDescription(e.target.value)}
                  /*error={isSubmit && bannerDescription === ""}
                                                                                          helperText={
                                                                                            isSubmit &&
                                                                                            bannerDescription === "" &&
                                                                                            "*Please enter valid description"
                                                                                          }*/
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <label>URL :</label>
              </Grid>
              <Grid item xs={12} md={9}>
                <TextField
                  fullWidth
                  type="text"
                  placeholder="Enter url"
                  className={classes.input_fild3}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <label>Banner media and background (Upload photo/video):</label>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className={classes.UploadBox}>
                <input
                  id="upload-media"
                  accept=".png, .jpg, .jpeg, .mp4, .avi, .mkv, .mov, .wmv, .flv, .webm, .svg, .gif"
                  style={{ display: "none" }}
                  className={classes.input}
                  onChange={(e) => {
                    setbannerMedia(e.target.files[0]);
                    setbannerMediaPreview(
                      URL.createObjectURL(e.target.files[0])
                    );
                    const fileExtention = e.target.files[0].name
                      .split(".")
                      .pop();
                    const fileType = ["png", "jpg", "jpeg", "gif"].includes(
                      fileExtention
                    )
                      ? "image"
                      : "video";

                    setbannerMediaType(fileType);
                  }}
                  type="file"
                />
                {bannerMediaPreview ? (
                  <>
                    {bannerMediaType === "video" ? (
                      <video
                        controls="false"
                        autoPlay="true"
                        loop
                        muted
                        playsinline="true"
                        width="400px"
                        height="200px"
                      >
                        <source src={bannerMediaPreview} type={`video/mp4`} />
                      </video>
                    ) : (
                      <img
                        src={bannerMediaPreview}
                        alt=""
                        width="400px"
                        height="200px"
                      />
                    )}
                    <Box align="center" width="100%">
                      <Button
                        variant="outined"
                        color="primary"
                        component="span"
                        onClick={() => {
                          setbannerMedia("");
                          setbannerMediaPreview("");
                        }}
                      >
                        Remove {bannerMediaType}
                      </Button>
                    </Box>
                  </>
                ) : (
                  <label htmlFor="upload-media">
                    <Button variant="outined" color="primary" component="span">
                      Upload Banner media &nbsp;
                      <CloudUploadIcon />
                    </Button>
                    <p style={{textAlign: 'center'}}>(400px * 200px)</p>
                  </label>
                )}
              </Box>
              {/*{isSubmit && bannerMediaPreview === "" && (
                <FormHelperText error>
                  *Please select valid media file
                </FormHelperText>
              )}*/}
            </Grid>
          </Grid>
        </Box>

        <Box className={classes.newbox}>
          <Box>
            {" "}
            <Button
              variant="contained"
              size="large"
              color="secondary"
              className="ml-10"
              onClick={() => history.push("/banners-application")}
              disabled={process}
            >
              Cancel
            </Button>
          </Box>
          <Box>
            {" "}
            <Button
              variant="contained"
              size="large"
              color="secondary"
              className="ml-10"
              onClick={post}
            >
              {!process ? "Save" : message}{" "}
              {process && <ButtonCircularProgress />}
            </Button>
          </Box>
        </Box>
        {uploadPercent > 0 && (
          <Box className={classes.newbox} style={{ marginTop: 20 }}>
            Uploading {uploadPercent} %
          </Box>
        )}
      </Container>
    </Box>
  );
}
