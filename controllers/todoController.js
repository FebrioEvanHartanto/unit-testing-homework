const {Todo} = require("../models")

class todoController  {

  static findTodo = async (req, res, next) => {
    try {

      const todos = await Todo.findAll();

      if(!todos) {
        res.status(404).json({name: "Error Not Found!", message: "There are no things to do!"})
      } else {
        res.status(200).json({data: todos});
      }

    } catch (err) {
        next(err);
      }
  }

  static findTodoById = async (req, res, next) => {
    try {

      const {id} = req.params;
      const todo = await Todo.findOne({
        where: {
          id
        },
      });

      if (!todo) {
        res.status(404).json({name: "Error Not Found!", message: "Can't find the to do with that ID!"})
      } else {
        res.status(200).json({data: todo})
      }

    } catch (err) {
        next(err);
      }
  }

  static createTodo = async (req, res, next) => {
    try {
      
        const todo = await Todo.create(req.body);
        res.status(201).json({message: "Added a new thing to do!", data: todo})
        
      } catch (err) {
         next(err);
      }
  }

  static updateTodo = async (req, res, next) => {
    try {

      const {id} = req.params;
      const todo = await Todo.findOne({
        where: {
          id
        }
      });

      if(!todo) {
        res.status(404).json({name: "Error Not Found!", message: "Can't find the to do with that ID!"})
    }
        await todo.update(req.body)
        //Cari lagi todo yang sudah di update
        const updatedTodo = await Todo.findByPk(id)
    
      res.status(200).json({message: "Updated to do list successfully!", data: updatedTodo})

    } catch (err) {
        next(err);
      } 
  }

  static deleteTodo = async (req, res, next) => {
    try {

      const {id} = req.params
      const todo = await Todo.findOne({
        where: {
          id
        }
      })

      if(!todo) {
          res.status(404).json({name: "Error Not Found!", message: "Can't find the to do with that ID!"})
      } else {
          await todo.destroy();
      }

      res.status(200).json({message: "To do has been removed successfully!"})

    } catch (err) {
        next(err);
      }
  }

}

module.exports = todoController;