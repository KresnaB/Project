import {
  Grid,
  Paper,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  InputLabel,
  FormControl,
  Alert,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateReport } from "../../../store/actions/conditionReportActions";
import useStyles from "./styles";
import FileBase64 from "../../../component/FileBase64/FileBase64";
import ImageCarousel from "../../../component/ImageCarousel/ImageCarousel";
import { useHistory } from "react-router";
import validation from "../CreateReport/validation";

const initialState = {
  type: "",
  photos: [""],
  title: "",
  description: "",
};

const EditReport = ({ report }) => {
  //props id : pet id
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [formData, setFormData] = useState(report);
  const [errors, setErrors] = useState({});
  const [dataIsCorrect, setDataIsCorrect] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileUpload = (fileArray) => {
    if (fileArray.length > 3) {
      fileArray.length = 3;
    }
    setFormData({ ...formData, photos: fileArray });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validation(formData));
    setDataIsCorrect(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && dataIsCorrect) {
      dispatch(updateReport(report._id, formData, history));
    }
  }, [errors]);

  return (
    <Grid container className={classes.center}>
      <Grid item xs={12} md={8}>
        <Paper className={classes.container} elevation={3}>
          <Typography variant="h5">Edit Laporan</Typography>
          {report === undefined ? (
            <Alert severity="error">Data Hewan Adopsi Tidak Ada</Alert>
          ) : (
            <form
              className={classes.container}
              autoComplete="off"
              noValidate
              onSubmit={handleSubmit}
            >
              <Grid container className={classes.container2}>
                <Grid item xs={12} lg={12}>
                  <Paper className={classes.paper}>
                    <ImageCarousel items={formData.photos}></ImageCarousel>
                    <div className={classes.fileInput}>
                      <FileBase64
                        type="file"
                        className={classes.fileBase}
                        multiple={true}
                        imagePreview
                        onDone={(e) => {
                          const fileName = [];
                          console.log(e);
                          e.forEach((element) => {
                            if (
                              element.type === "image/jpeg" ||
                              element.type === "image/jpg" ||
                              element.type === "image/png"
                            ) {
                              fileName.push(element.base64);
                            }
                          });
                          handleFileUpload(fileName);
                        }}
                      />
                      {errors.photos && (
                        <Typography className={classes.error} variant="body2">
                          {errors.photos}
                        </Typography>
                      )}
                    </div>
                  </Paper>
                </Grid>
              </Grid>

              <Grid container maxWidth="sm">
                <Grid className={classes.item} item xs={12} sm={6}>
                  <FormControl
                    variant="outlined"
                    className={classes.input}
                    required
                  >
                    <InputLabel variant="outlined" id="type-label" size="small">
                      Jenis
                    </InputLabel>
                    <Select
                      labelId="type-label"
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      label="Tipe"
                      size="small"
                      required
                    >
                      <MenuItem value={formData.type}>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={0}>Kesehatan</MenuItem>
                      <MenuItem value={1}>Aktivitas</MenuItem>
                    </Select>
                  </FormControl>
                  {errors.type && (
                    <Typography className={classes.error} variant="body2">
                      {errors.type}
                    </Typography>
                  )}
                </Grid>
                <Grid className={classes.item} item xs={12} sm={6}>
                  <TextField
                    className={classes.input}
                    id="title"
                    name="title"
                    label="Judul"
                    value={formData.title}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    required
                  />
                  {errors.title && (
                    <Typography className={classes.error} variant="body2">
                      {errors.title}
                    </Typography>
                  )}
                </Grid>
                <Grid className={classes.item} item xs={12}>
                  <TextField
                    className={classes.input}
                    id="description"
                    name="description"
                    label="Deskripsi"
                    multiline
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    required
                  />
                  {errors.description && (
                    <Typography className={classes.error} variant="body2">
                      {errors.description}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Kirim
              </Button>
            </form>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default EditReport;
