const getHome = async (req, res) => {
  res.render("main/master");
};

module.exports = { getHome };
