import { Card, CardContent, Grid, Link, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { useState } from "react";
import Button from "../../components/Button";
import MyTextField from "../../components/TextField";
import GlobalStyles from "../../styles/GlobalStyles";
import SnackBar from "../../components/SnackBar";
import emailValidation from "../../utils/EmailValidation";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const Login = (props) => {
  const { classes } = props;
  const history = useHistory();
  const [userDetails, setUserDetails] = useState({
    userName: "",
    password: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    variant: null,
    timeOut: 6000,
  });

  useEffect(() => console.log("loaded"));

  const makeLoginAPICall = () => {
    fetch(`http://localhost:5001/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: userDetails.userName,
        password: userDetails.password,
      }),
    }).then(async (res) => {
      let rsp_data = await res.json();
      if (res.ok) {
        history.push(`${process.env.PUBLIC_URL}/products/getList`);
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
    if (!userDetails.userName || !userDetails.password) {
      setSnackbar({
        message: "Please enter username and password",
        open: true,
        variant: "error",
      });
    } else if (!emailValidation(userDetails.userName)) {
      setSnackbar({
        message: "Invalid email format, please enter correct email",
        open: true,
        variant: "error",
      });
    } else {
      makeLoginAPICall();
    }
  };

  const handleChange = (e, property) => {
    setUserDetails({ ...userDetails, [property]: e.target.value });
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <MyTextField
                label="Username"
                value={userDetails.userName}
                id="userName"
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <MyTextField
                label="Password"
                value={userDetails.password}
                id="password"
                type="password"
                handleChange={handleChange}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Button label="Login" handleClick={handleClick} />
        <Link href="/user/signup">
          <Typography className={classes.typography} variant="caption">
            New User? Please signup first
          </Typography>
        </Link>
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

export default withStyles(GlobalStyles)(Login);
