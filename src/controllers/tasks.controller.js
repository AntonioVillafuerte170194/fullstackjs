const pool = require("../dataBase");

const getAllTask = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM task");
    console.log(result);
    res.send(result.rows);
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM task WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ messenge: "no se encontro tarea" });
    }
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );
    console.log(result);
    res.send(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("DELETE FROM task WHERE id = $1", [id]);
  if (result.rowsCount === 0) {
    return res.status(404).json({ messege: "no se encontro tarea" });
  }
  res.status(200).json({ message: "tarea eliminada" });
};

const upDateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const result = await pool.query(
      "UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *",
      [title, description, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "task not found",
      });
    }
    console.log(result.rows);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTask,
  getTask,
  createTask,
  deleteTask,
  upDateTask,
};
