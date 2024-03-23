import { Router } from 'express'
import bodyParser from 'body-parser'

import {
    getTodos,
    getTodo,
    addTodo,
    updateTodo,
    removeTodo
} from '../controllers/todos'

const router = Router()

// initiate body parser untuk parsing/mengamankan pengiriman dokumen
const jsonParser = bodyParser.json()

// endpoint API
// router.get adalah waiter
// /api/todos/ adalah menu
// getTodo adalah koki

// route index todo
router.get('/api/todos', getTodos)

// route detail todo
router.get('api/todos/:id', getTodo)

// route add todo
router.post('/api/add-todo', jsonParser, addTodo)

// route update todo
router.put('/api/update-todo/:id', jsonParser, updateTodo)

//route delet todo
router.delete('/api/remove-todo/:id', jsonParser, removeTodo)

export default router