import { Router } from "express";

const router = Router()

// endpoint API
// router.get adalah waiter
// /api/todos/ adalah menu
// getTodo adalah koki

// route index todo
router.get('/api/todos', getTodos)

// route detail todo
router.get('api/todos/:id', getTodo)

// route add todo
router.post('/api/add-todo', addTodo)

// route update todo
router.put('/api/update-todo/:id', updateTodo)

//route delet todo
router.delete('/api/remove-todo/:id', removeTodo)

export default router