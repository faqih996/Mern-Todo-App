// membuat schema atau model, berisi aturan untuk input data ke database mongoose

import { model, Schema } from 'mongoose'

// ambil dari folder src/Types 
import { Todo } from '../types/todo'

const todoSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

export default model<Todo>('Todo', todoSchema)