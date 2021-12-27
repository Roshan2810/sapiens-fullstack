import { Button } from "@material-ui/core";

const MyButton = (props) => {
  const { label, handleClick } = props;
  return (
    <Button fullWidth variant="contained" color="primary" onClick={handleClick}>
      {label}
    </Button>
  );
};

export default MyButton;
