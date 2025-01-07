import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  Input,
  TextField,
  Typography,
} from "@material-ui/core";
import Page from "src/component/Page";
import React, { useState } from "react";
import Loader from "src/component/Loader";
import { useFieldArray, useForm } from "react-hook-form";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { toast, ToastContainer } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfig";

const handleSection = () => {
  /* material-ui Styles */
  const classes = useStyles();

  /* React Routes */
  const history = useHistory();
  const location = useLocation();
  const sectionData = location.state?.data;
  const componentCall = location.state?.componentCall;
  const isView = componentCall === "view";
  const isEdit = componentCall === "edit";

  /* Use State Variables */
  const [state, setState] = useState({
    isFetchingData: false,
    mediaUrl: isEdit || isView ? sectionData?.contentFile : "",
    backgroundUrl: isEdit || isView ? sectionData?.background : "",
    isLoading: false,
  });
  const { isFetchingData, mediaUrl, backgroundUrl, isLoading } = state;
  const updateState = (data) =>
    setState((prevState) => ({ ...prevState, ...data }));

  /* React Hook Form */
  const { register, handleSubmit, setValue, control } = useForm({
    defaultValues: {
      title: isEdit || isView ? sectionData?.title : "",
      contentFile: null,
      background: null,
      description: isEdit || isView ? sectionData?.description : "",
      contents:
        isEdit || isView
          ? sectionData?.contents.map((i) => ({
              heading: i.heading,
              contentDescription: i.contentDescription,
            }))
          : [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contents",
  });

  /* Main Return */

  return (
    <Container maxWidth="xl" style={{ marginTop: "88px", minHeight: "88vh" }}>
      <Page title="Edit Our Solutions Section">
        {Title()}
        <Box>
          {isFetchingData ? (
            <Loader />
          ) : (
            <FormControl style={{ width: "100%" }}>
              <Grid container spacing={3}>
                {TitleInput()}
                {MediaContainer()}
                {sectionData?.type !== "static" && Description()}
                {sectionData?.type !== "static" && Contents()}
                {!isView && FormButtons()}
              </Grid>
            </FormControl>
          )}
          <ToastContainer />
        </Box>
      </Page>
    </Container>
  );

  /* Main Return */

  function FormButtons() {
    const onSubmit = handleSubmit((data) =>
      isEdit ? editContent(data) : createContent(data)
    );
    return (
      <Grid item md={12} xs={12} className={classes.formButtonContainer}>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          style={{ marginRight: "10px" }}
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? <ButtonCircularProgress /> : "Submit"}
        </Button>
        <Button
          onClick={() => history.push("/landing-sections")}
          variant="contained"
          color="secondary"
          size="medium"
          disabled={isLoading}
        >
          Cancel
        </Button>
      </Grid>
    );
  }

  function Contents() {
    const addItem = () => append({ heading: "", contentDescription: "" });
    return (
      <Grid item md={12} sm={12} xs={12}>
        <Typography variant="body2">
          <strong>Contents:</strong>
        </Typography>
        <Box mb={2} className={classes.contentsContainer}>
          {fields.map((item, index) => (
            <div key={item.id}>
              <div>
                <label>Content {index + 1}:</label>
              </div>
              <div>
                <TextField
                  {...register(`contents.${index}.heading`)}
                  variant="outlined"
                  fullWidth
                  type="text"
                  placeholder="Heading"
                  style={{ marginBottom: "10px" }}
                  disabled={isView}
                />
                <TextField
                  {...register(`contents.${index}.contentDescription`)}
                  variant="outlined"
                  fullWidth
                  type="text"
                  placeholder="Description"
                  disabled={isView}
                />
              </div>
              {!isView && (
                <div
                  className={classes.contentsButton}
                  style={{ marginTop: 5, cursor: "pointer" }}
                  onClick={() => remove(index)}
                >
                  <DeleteIcon color={"error"} />
                </div>
              )}
            </div>
          ))}
          {!isView && (
            <div className={classes.contentsButton}>
              <Button
                color="primary"
                size="medium"
                variant={"outlined"}
                onClick={addItem}
              >
                Add Content
              </Button>
            </div>
          )}
        </Box>
      </Grid>
    );
  }

  function Description() {
    return (
      <Grid item md={12} sm={12} xs={12}>
        <Typography variant="body2" style={{ margin: "10px 0px" }}>
          <strong>Description: </strong>
        </Typography>
        <Input
          {...register("description")}
          variant="outlined"
          type="text"
          fullWidth
          multiline
          disabled={isView}
        />
      </Grid>
    );
  }

  function MediaContainer() {
    const updateMediaUrl = (url) => updateState({ mediaUrl: url });
    const updateBackgroundUrl = (url) => updateState({ backgroundUrl: url });
    return (
      <Grid item md={12} sm={12} xs={12}>
        <Grid container spacing={2}>
          {sectionData?.type !== "static" && MediaInput("contentFile", mediaUrl, updateMediaUrl)}
          {MediaInput("background", backgroundUrl, updateBackgroundUrl)}
        </Grid>
      </Grid>
    );
  }

  function MediaInput(name, url, updateMedia) {
    return (
      <Grid item xs={12} md={6}>
        <Box className={classes.UploadBox}>
          <label>
            <input
              onChange={(e) => {
                setValue(name, e.target.files[0]);
                updateMedia(URL.createObjectURL(e.target.files[0]));
              }}
              accept="image/*"
              style={{ display: "none" }}
              className={classes.input}
              id={`file-${name}-bun`}
              multiple
              type="file"
              disabled={isView}
            />
          </label>
          {url !== "" ? (
            <Box textAlign="center">
              <img src={url} alt="" width="300px" height={"250px"} />
              {!isView && (
                <label>
                  <Button
                    variant="outined"
                    color="primary"
                    component="span"
                    onClick={() => {
                      setValue(name, null);
                      updateMedia("");
                    }}
                  >
                    Remove
                  </Button>
                </label>
              )}
            </Box>
          ) : (
            <label
              htmlFor={`file-${name}-bun`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button variant="outined" color="primary" component="span">
                {isView ? "No" : "Upload"}{" "}
                {name === "contentFile" ? "Media" : "Background"} &nbsp;
                {!isView && <CloudUploadIcon />}
              </Button>
              {!isView && (
                <p style={{ margin: 0, textAlign: "center" }}>
                  (500px * {name === "contentFile" ? "500px" : "auto"})
                </p>
              )}
            </label>
          )}
        </Box>
      </Grid>
    );
  }

  function TitleInput() {
    return (
      <Grid item md={12} sm={12} xs={12}>
        <Typography variant="body2" style={{ margin: "10px 0px" }}>
          <strong>Title:</strong>
        </Typography>
        <TextField
          {...register("title")}
          variant="outlined"
          fullWidth
          type="text"
          disabled={isView || sectionData?.type === 'static'}
        />
      </Grid>
    );
  }

  function Title() {
    return (
      <Box mb={1}>
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h3" style={{ marginBottom: "8px" }}>
            <strong> Our Solutions</strong>
          </Typography>
        </Box>
        <Divider />
      </Box>
    );
  }

  async function editContent(data) {
    updateState({ isLoading: true });
    try {
      const formData = new FormData();
      formData.append("_id", sectionData?._id);
      formData.append("description", data.description);
      formData.append("title", data.title);
      formData.append("contents", JSON.stringify(data.contents));
      if (data.contentFile) {
        formData.append("contentFile", data.contentFile);
      } else {
        formData.append("contentFile", mediaUrl);
      }
      if (data.background) {
        formData.append("background", data.background);
      } else {
        formData.append("background", backgroundUrl);
      }
      const response = await axios({
        method: "PUT",
        url: Apiconfigs.content,
        headers: {
          token: window.sessionStorage.getItem("AccessToken"),
        },
        data: formData,
      });
      if (response.data.statusCode === 200) {
        history.push("/landing-sections");
        toast.success("Landing section has been updated successfully.");
      }
    } catch (error) {
      console.log(error);
    }
    updateState({ isLoading: false });
  }

  async function createContent(data) {
    updateState({ isLoading: true });
    try {
      const formData = new FormData();
      formData.append("type", "flexible");
      formData.append("description", data.description);
      formData.append("title", data.title);
      formData.append("contents", JSON.stringify(data.contents));
      if (data.contentFile) {
        formData.append("contentFile", data.contentFile);
      } else {
        formData.append("contentFile", mediaUrl);
      }
      if (data.background) {
        formData.append("background", data.background);
      } else {
        formData.append("background", backgroundUrl);
      }
      const response = await axios({
        method: "POST",
        url: Apiconfigs.content,
        headers: {
          token: window.sessionStorage.getItem("AccessToken"),
        },
        data: formData,
      });
      if (response.data.statusCode === 200) {
        history.push("/landing-sections");
        toast.success("Landing section has been created successfully.");
      }
    } catch (error) {
      console.log(error);
    }
    updateState({ isLoading: false });
  }
};

export default handleSection;

const useStyles = makeStyles({
  texbox: {
    rows: "5",
    overflow: "hidden",
    height: "auto",
    resize: "none",
  },
  UploadBox: {
    border: "solid 0.5px #bdbdbd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "370px",
    borderRadius: "6px",
  },
  input_fild22: {
    width: "100%",
    padding: "17px",
    "& input": {
      height: "45px",
      border: 0,
    },
    "& .MuiInput-underline:before": {
      border: 0,
    },
  },
  contentsContainer: {
    border: "1px solid #777",
    borderRadius: 5,
    margin: "30px 0px",
    padding: "30px 10px",
  },
  contentsButton: {
    marginTop: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  formButtonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
