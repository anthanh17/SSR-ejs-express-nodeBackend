import connection from "../configs/connectDB";

let getHomepage = (req, res) => {
  // logic handler database
  let data = [];
  connection.query("select * from `users`", function (err, results, fields) {
    console.log("check mysql");
    console.log(results);
    results.map((row) => {
      data.push({
        id: row.id,
        email: row.email,
        address: row.address,
        firstName: row.firstName,
        lastName: row.lastName,
      });
    });
    res.render("index.ejs", { dataUser: data });
  });
};

module.exports = {
  getHomepage,
};
