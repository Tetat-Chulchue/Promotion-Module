import React, { Component } from "react";
import styles from "./Card.module.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import { SERVER } from "../../util/server.json";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: false,
      errorMessage: "",
      dialog: false,
      id: props.data.id,
      method: props.data.method,
      type: props.data.type,
      amount: props.data.amount,
      min: props.data.min,
      max: props.data.max,
      expDate: props.data.expDate,
      description: props.data.description,
      productId: props.data.productId,
      name: props.data.name,
      quantity: props.data.quantity,
    };
  }

  componentWillReceiveProps(newProps) {
    let {
      id,
      method,
      type,
      amount,
      min,
      max,
      expDate,
      description,
      productId,
      name,
      quantity,
    } = newProps.data;
    this.setState({
      id: id,
      method: method,
      type: type,
      amount: amount,
      min: min,
      max: max,
      expDate: expDate,
      description: description,
      productId: productId,
      name: name,
      quantity: quantity,
    });
  }

  handleClickOpen = () => {
    this.setState({
      dialog: true,
    });
  };

  handleClose = () => {
    this.setState({
      dialog: false,
    });
  };

  handleAmount = (e) => {
    this.setState({
      amount: e,
    });
  };

  savePromotion = () => {
    if (
      this.state.amount === 0 ||
      this.state.description === "" ||
      this.state.name === "" ||
      this.state.expDate === "" ||
      this.state.quantity === 0
    ) {
      this.setState({
        alert: true,
        errorMessage: "Enter your information",
      });
      return null;
    }
    if (Number(this.state.min) > Number(this.state.max)) {
      this.setState({
        alert: true,
        errorMessage: "Invalid value",
      });
      return null;
    }
    if (this.state.type === "product" && this.state.productId === "") {
      this.setState({
        alert: true,
        errorMessage: "Enter your product id",
      });
      return null;
    }
  };

  deletePromotion = () => {
    axios
      .delete(SERVER + "/promotion/" + this.state.id)
      .then((res) => {
        console.log(res);
        // if (res.data.status === 200) {
        //   setOpen(true);
        //   setErrorMessage("Create done!!");
        // }
      })
      .catch((err) => {
        // setOpen(true);
        // setErrorMessage("Server error");
      });
  };

  render() {
    return (
      <div className={styles.container}>
        <Snackbar open={this.state.alert} autoHideDuration={2000}>
          <Alert
            // onClose={() => {
            //   this.setState({
            //     alert: false,
            //   });
            // }}
            severity="warning"
          >
            {this.state.errorMessage}!
          </Alert>
        </Snackbar>
        <Dialog
          open={this.state.dialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          onClose={() => {
            console.log("Close");
            this.setState({
              dialog: false,
            });
          }}
        >
          <DialogTitle id="alert-dialog-title">ID: {this.state.id}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    value={this.state.name}
                    onChange={(e) => {
                      this.setState({
                        name: e.target.value,
                      });
                    }}
                    fullWidth
                    style={{ marginTop: 10 }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Min"
                    type="number"
                    value={this.state.min}
                    onChange={(e) => {
                      this.setState({
                        min: e.target.value,
                      });
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
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.method}
                      onChange={(e) => {
                        this.setState({
                          method: e.target.value,
                        });
                      }}
                      fullWidth
                      label="Method"
                      style={{ marginTop: 5 }}
                    >
                      <MenuItem value="percent">Percent</MenuItem>
                      <MenuItem value="diract">Diract</MenuItem>
                    </Select>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Quantity"
                    type="number"
                    value={this.state.quantity}
                    onChange={(e) => {
                      this.setState({
                        quantity: e.target.value,
                      });
                    }}
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: 10 }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Max"
                    type="number"
                    value={this.state.max}
                    onChange={(e) => {
                      this.setState({
                        max: e.target.value,
                      });
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
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.type}
                      onChange={(e) => {
                        this.setState({
                          type: e.target.value,
                        });
                      }}
                      style={{ marginTop: 5 }}
                      fullWidth
                      label="Type"
                    >
                      <MenuItem value="order">Order</MenuItem>
                      <MenuItem value="product">Product</MenuItem>
                    </Select>
                  </div>
                  {this.state.type === "product" ? (
                    <TextField
                      id="outlined-basic"
                      label="Product Id"
                      type="text"
                      value={this.state.productId}
                      onChange={(e) => {
                        this.setState({
                          productId: e.target.value,
                        });
                      }}
                      variant="outlined"
                      fullWidth
                      style={{ marginTop: 13 }}
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
                    value={this.state.amount}
                    onChange={(e) => {
                      this.setState({
                        amount: e.target.value,
                      });
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
                    value={this.state.description}
                    onChange={(e) => {
                      this.setState({
                        description: e.target.value,
                      });
                    }}
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    label="Expire"
                    type="date"
                    style={{ marginTop: 10 }}
                    fullWidth
                    value={this.state.expDate}
                    onChange={(e) => {
                      this.setState({
                        expDate: e.target.value,
                      });
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
            <Button onClick={this.savePromotion} color="primary" autoFocus>
              Save
            </Button>
            <Button onClick={this.handleClose} color="secondary">
              Cancle
            </Button>
          </DialogActions>
        </Dialog>
        <div className={styles.haeder}>
          <h3>ID: {this.state.id}</h3>
          <label>x{this.state.quantity}</label>
        </div>
        <div className={styles.row}>
          <p>
            <span>Name:</span> {this.state.name}
          </p>
        </div>
        <div className={styles.row}>
          <p>
            <span>Method:</span> {this.state.method}
          </p>
        </div>
        <div className={styles.row}>
          <p>
            <span>Type:</span> {this.state.type}
          </p>
        </div>
        <div className={styles.row}>
          <p>
            <span>Min:</span> {this.state.min}
          </p>
        </div>
        <div className={styles.row}>
          <p>
            <span>Max:</span> {this.state.max}
          </p>
        </div>
        <div className={styles.row}>
          <p>
            <span>Amount:</span> {this.state.amount}
          </p>
        </div>
        <div className={styles.row}>
          <p>
            <span>ProductId:</span> {this.state.productId}
          </p>
        </div>
        <div className={styles.description}>
          <p>{this.state.description}</p>
        </div>

        <div className={styles.footer}>
          {/* <Button
            variant="contained"
            color="primary"
            onClick={() => {
              this.handleClickOpen();
            }}
          >
            Edit
          </Button> */}
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              this.props.onDelete(this.state.id);
              this.deletePromotion();
            }}
          >
            Delete
          </Button>
          <div className={styles.exp}>
            <p>EXP: {this.state.expDate.slice(0, 10)}</p>
          </div>
        </div>
      </div>
    );
  }
}
