import { AppBar, Toolbar, Button, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/");
  };

  return (
    <AppBar color="default" position="static">
      <Toolbar>
        <Grid container>
          <Grid item xs={11} sm={11} md={11} lg={11} xl={11}></Grid>
          <Grid item>
            <Button onClick={handleClick} variant="contained" color="primary">
              Logout
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
