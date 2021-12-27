import { TextField } from "@material-ui/core";
const MyTextField = (props) => {
  const { label, handleChange, value, id, type } = props;
  return (
    <TextField
      fullWidth
      type={type}
      variant="outlined"
      color="primary"
      label={label}
      onChange={(e) => handleChange(e, id)}
      value={value}
    />
  );
};

export default MyTextField;
