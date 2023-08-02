let getHomepage = (req, res) => {
  // logic handler database
  res.render("index.ejs");
};

module.exports = {
  getHomepage,
};
