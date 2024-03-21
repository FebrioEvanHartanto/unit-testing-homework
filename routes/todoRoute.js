const express = require("express");
const router = express.Router();
const TodoController = require("../controllers/todoController.js")

router.get("/", TodoController.findTodo);
router.get("/:id", TodoController.findTodoById);
router.post("/", TodoController.createTodo);
router.put("/:id", TodoController.updateTodo);
router.delete("/:id", TodoController.deleteTodo);

module.exports = router;