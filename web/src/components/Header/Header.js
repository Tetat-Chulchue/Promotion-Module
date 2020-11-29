import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import { SERVER } from "../../util/server.json";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Header() {
  const classes = useStyles();
  const [dialog, setDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState({
    method: "percent",
    type: "order",
    amount: "",
    min: 0,
    max: 0,
    expDate: "",
    description: "",
    productId: "",
    quantity: 0,
    name: "",
  });

  const handleClose = () => {
    setDialog(false);
  };
  const handleAlertClose = () => {
    setOpen(false);
  };

  const createPromotion = () => {
    if (
      data.amount === 0 ||
      data.description === "" ||
      data.name === "" ||
      data.expDate === "" ||
      data.quantity === 0
    ) {
      setOpen(true);
      setErrorMessage("Enter your information");
      return null;
    }
    if (Number(data.min) >= Number(data.max)) {
      setOpen(true);
      setErrorMessage("Invalid value");
      return null;
    }
    if (data.type === "product" && data.productId === "") {
      setOpen(true);
      setErrorMessage("Enter your product id");
      return null;
    }
    if (data.type === "product") {
      let body = {
        name: data.name,
        method: data.method,
        type: data.type,
        amount: data.amount,
        min: data.min,
        max: data.max,
        description: data.description,
        quantity: data.quantity,
        expDate: data.expDate,
        productId: data.productId,
      };
      let config = {
        headers: { "Access-Control-Allow-Origin": "*" },
      };
      console.log(body);
      axios
        .post(SERVER + "/promotion/product", body, config)
        .then((res) => {
          console.log(res);
          if (res.data.status === 200) {
            setOpen(true);
            setErrorMessage("Create done!!");
          }
        })
        .catch((err) => {
          setOpen(true);
          setErrorMessage("Server error");
        });
    } else {
      let body = {
        name: data.name,
        method: data.method,
        type: data.type,
        amount: data.amount,
        min: data.min,
        max: data.max,
        description: data.description,
        quantity: data.quantity,
        expDate: data.expDate,
      };
      let config = {
        headers: { "Access-Control-Allow-Origin": "*" },
      };
      console.log(body);
      axios
        .post(SERVER + "/promotion", body, config)
        .then((res) => {
          console.log(res);
          if (res.data.status === 200) {
            setOpen(true);
            setErrorMessage("Create done!!");
          }
        })
        .catch((err) => {
          setOpen(true);
          setErrorMessage("Server error");
        });
    }
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={2000}>
        <Alert onClose={handleAlertClose} severity="warning">
          {errorMessage}!
        </Alert>
      </Snackbar>
      <Dialog
        open={dialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={() => {
          console.log("Close");
          setDialog(false);
        }}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  value={data.name}
                  onChange={(e) => {
                    setData({ ...data, name: e.target.value });
                  }}
                  fullWidth
                  style={{ marginTop: 10 }}
                />
                <TextField
                  id="outlined-basic"
                  label="Min"
                  type="number"
                  value={data.min + ""}
                  onChange={(e) => {
                    setData({ ...data, min: Number(e.target.value) });
                  }}
                  variant="outlined"
                  fullWidth
                  style={{ marginTop: 10 }}
                />
                <div>
                  <InputLabel
                    htmlFor="filled-age-native-simple"
                    style={{ marginTop: 10, fontSize: 13 }}
                  >
                    Method
                  </InputLabel>
                  <Select
                    value={data.method}
                    onChange={(e) => {
                      setData({ ...data, method: e.target.value });
                    }}
                    fullWidth
                    label="Method"
                    style={{ marginTop: 5 }}
                  >
                    <MenuItem value="percent" selected>
                      Percent
                    </MenuItem>
                    <MenuItem value="diract">Diract</MenuItem>
                  </Select>
                </div>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  label="Quantity"
                  type="number"
                  value={data.quantity + ""}
                  onChange={(e) => {
                    setData({ ...data, quantity: Number(e.target.value) });
                  }}
                  variant="outlined"
                  fullWidth
                  style={{ marginTop: 10 }}
                />
                <TextField
                  id="outlined-basic"
                  label="Max"
                  type="number"
                  value={data.max + ""}
                  onChange={(e) => {
                    setData({ ...data, max: Number(e.target.value) });
                  }}
                  variant="outlined"
                  fullWidth
                  style={{ marginTop: 10 }}
                />
                <div>
                  <InputLabel
                    htmlFor="filled-age-native-simple"
                    style={{ marginTop: 10, fontSize: 13 }}
                  >
                    Type
                  </InputLabel>
                  <Select
                    value={data.type}
                    onChange={(e) => {
                      setData({ ...data, type: e.target.value });
                    }}
                    fullWidth
                    label="Method"
                    style={{ marginTop: 5 }}
                  >
                    <MenuItem value="order" selected>
                      Order
                    </MenuItem>
                    <MenuItem value="product">Product</MenuItem>
                  </Select>
                </div>
                {data.type === "product" ? (
                  <TextField
                    id="outlined-basic"
                    label="Product ID"
                    value={data.productId}
                    onChange={(e) => {
                      setData({ ...data, productId: e.target.value });
                    }}
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: 10 }}
                  />
                ) : (
                  <></>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Amount"
                  type="number"
                  value={data.amount}
                  onChange={(e) => {
                    setData({ ...data, amount: e.target.value });
                  }}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Description"
                  multiline
                  value={data.description}
                  onChange={(e) => {
                    setData({ ...data, description: e.target.value });
                  }}
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  label="Expire"
                  type="date"
                  style={{ marginTop: 10 }}
                  fullWidth
                  value={data.expDate}
                  onChange={(e) => {
                    setData({ ...data, expDate: e.target.value });
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={createPromotion} color="primary" autoFocus>
            Save
          </Button>
          <Button onClick={handleClose} color="secondary">
            Cancle
          </Button>
        </DialogActions>
      </Dialog>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Promotion
          </Typography>
          <Button
            variant="contained"
            style={{ backgroundColor: "#31ac31", color: "#fff" }}
            onClick={() => {
              setDialog(true);
            }}
          >
            New Promotion
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
