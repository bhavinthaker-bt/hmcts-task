const tokenValidation = (req, res, next) => {
  // Implement JWT token validation here
  next();
};

const tokenScopeValidation = (req, res, next) => {
  // Implement JWT token scope validation here
  next();
};

module.exports = {
  tokenValidation,
  tokenScopeValidation,
};
