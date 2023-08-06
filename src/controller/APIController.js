import pool from "../configs/connectDB";

let getAllUsers = async (req, res) => {
  const [rows, fields] = await pool.execute("select * from users");
  return res.status(200).json({
    message: "ok",
    data: rows,
  });
};

let createNewUser = async (req, res) => {
  // destructuring
  let { firstName, lastName, email, address } = req.body;

  if (!firstName || !lastName || !email || !address) {
    return res.status(200).json({
      message: "missing required params",
    });
  }

  await pool.execute(
    "insert into users(firstName, lastName, email, address) values (?, ?, ?, ?)",
    [firstName, lastName, email, address]
  );

  return res.status(200).json({
    message: "ok, create new user",
  });
};

let updateUser = async (req, res) => {
  // destructuring
  let { firstName, lastName, email, address, id } = req.body;

  if (!firstName || !lastName || !email || !address || !id) {
    return res.status(200).json({
      message: "missing required params",
    });
  }

  await pool.execute(
    "update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?",
    [firstName, lastName, email, address, id]
  );

  return res.status(200).json({
    message: "ok, update user",
  });
};

let deleteUser = async (req, res) => {
  let userId = req.params.id;
  if (!userId) {
    return res.status(200).json({
      message: "missing required params",
    });
  }

  await pool.execute("delete from users where id = ?", [userId]);

  return res.status(200).json({
    message: "ok, delete user",
  });
};
module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
