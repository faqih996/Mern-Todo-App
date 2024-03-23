import { Document } from 'mongoose'


// membuat interface Todo di extends dengan Document
// Mongoose document berisi properti object dari moongose secara otomatis
export interface Todo extends Document {
    title: string
    status: 'completed' | 'uncompleted'
}
