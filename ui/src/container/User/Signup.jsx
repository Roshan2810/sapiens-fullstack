import { Card, Grid, Link, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { useState } from "react";
import Button from "../../components/Button";
import MyTextField from "../../components/TextField";
import GlobalStyles from "../../styles/GlobalStyles";
import emailValidation from "../../utils/EmailValidation";
import SnackBar from "../../components/SnackBar";
import { useHistory } from "react-router-dom";

const Signup = (props) => {
  const { classes } = props;
  const history = useHistory();
  const [user, setUserDetails] = useState({
    userName: "",
    password: "",
    dob: "",
  });
  const handleChange = (e, prop) => {
    setUserDetails({ ...user, [prop]: e.target.value });
  };

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    variant: null,
    timeOut: 6000,
  });

  const makeSignupAPICall = () => {
    fetch(`http://localhost:5001/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: user.userName,
        password: user.password,
        dob: user.dob,
      }),
    }).then(async (res) => {
      let rsp_data = await res.json();
      if (res.ok) {
        setSnackbar({
          message: rsp_data.message,
          open: true,
          variant: "success",
        });
        setTimeout(
          () => history.push(`${process.env.PUBLIC_URL}/user/login`),
          3000
        );
      } else {
        setSnackbar({
          message: rsp_data.message,
          open: true,
          variant: "error",
        });
      }
    });
  };

  const handleClick = () => {
    const { userName, password, dob } = user;
    if (!userName || !password || !dob) {
      setSnackbar({
        message: "Please enter all the details",
        open: true,
        variant: "error",
      });
    } else if (!emailValidation(userName)) {
      setSnackbar({
        message: "Invalid email format, please enter correct email",
        open: true,
        variant: "error",
      });
    } else {
      makeSignupAPICall();
    }
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Card className={classes.card}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h4">Sign Up</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <MyTextField
              label="Username"
              value={user.userName}
              handleChange={handleChange}
              id="userName"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <MyTextField
              label="Password"
              type="password"
              value={user.password}
              handleChange={handleChange}
              id="password"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <MyTextField
              type="date"
              value={user.dob}
              handleChange={handleChange}
              id="dob"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Button handleClick={handleClick} label="Sign Up" />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Link href="/">
              <Typography variant="caption" className={classes.typography}>
                Already an user? Please login
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Card>
      {snackbar.open && (
        <SnackBar
          message={snackbar.message}
          variant={snackbar.variant}
          handleClose={handleClose}
          open={snackbar.open}
        />
      )}
    </>
  );
};

export default withStyles(GlobalStyles)(Signup);
