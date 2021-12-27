const emailValidation = (email) => {
  const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (pattern.test(email)) {
    return true;
  }
  return false;
};

export default emailValidation;
