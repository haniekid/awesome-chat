const getLoginRegister = async (req, res) => {
  return res.render("auth/master");
};

const getLogout = async (req, res) => {};

module.exports = {
  getLoginRegister,
  getLogout,
};
