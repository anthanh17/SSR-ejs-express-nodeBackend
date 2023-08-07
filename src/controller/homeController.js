import multer from "multer";
import pool from "../configs/connectDB";

let getHomepage = async (req, res) => {
  const [rows, fields] = await pool.execute("select * from users");
  return res.render("index.ejs", { dataUser: rows });
};

let getDetailPage = async (req, res) => {
  let userId = req.params.id;
  let [user] = await pool.execute(`select * from users where id = ?`, [userId]);
  return res.send(JSON.stringify(user));
};

let createNewUser = async (req, res) => {
  // destructuring
  let { firstName, lastName, email, address } = req.body;
  await pool.execute(
    "insert into users(firstName, lastName, email, address) values (?, ?, ?, ?)",
    [firstName, lastName, email, address]
  );
  return res.redirect("/");
};

let deleteUser = async (req, res) => {
  await pool.execute("delete from users where id = ?", [req.body.userId]);
  return res.redirect("/");
};

let getEditUser = async (req, res) => {
  let [user] = await pool.execute("select * from users where id = ?", [
    req.params.id,
  ]);
  return res.render("update.ejs", { dataUser: user[0] });
};

let postUpdateUser = async (req, res) => {
  // destructuring
  let { firstName, lastName, email, address, id } = req.body;
  await pool.execute(
    "update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?",
    [firstName, lastName, email, address, id]
  );
  return res.redirect("/");
};

let getUploadFile = async (req, res) => {
  return res.render("uploadFile.ejs");
};

const upload = multer().single("profile_pic");

let handleUploadFile = async (req, res) => {
  upload(req, res, function (err) {
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send("please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }

    res.send(
      `You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`
    );
  });
};

module.exports = {
  getHomepage,
  getDetailPage,
  createNewUser,
  deleteUser,
  getEditUser,
  postUpdateUser,
  getUploadFile,
  handleUploadFile,
};
