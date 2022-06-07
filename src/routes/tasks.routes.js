const { Router } = require("express");
const {
  getAllTask,
  getTask,
  createTask,
  deleteTask,
  upDateTask,
} = require("../controllers/tasks.controller");

const router = Router();

router.get("/", getAllTask);

router.get("/:id", getTask);

router.post("/task", createTask);

router.delete("/:id", deleteTask);

router.put("/:id", upDateTask);

module.exports = router;
