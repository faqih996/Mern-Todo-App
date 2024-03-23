import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from 'cors';

const app = express()
const PORT = 8080

// call from nodemon
const {
    MONGODB_ATLAS_USERNAME,
    MONGODB_ATLAS_PASSWORD,
    MONGODB_ATLAS_DBNAME,
} = process.env

// link from mongoose
const uri = `mongodb+srv://${MONGODB_ATLAS_USERNAME}:${MONGODB_ATLAS_PASSWORD}@clustertodo.einasjd.mongodb.net/${MONGODB_ATLAS_DBNAME}?retryWrites=true&w=majority`

const options = { useNew }


app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!')
})

app.get('/about', (req: Request, res: Response) => {
    res.send('This is about route!')
})

app.listen(PORT, () => {
    console.info(`App is listening at http://localhost:${PORT}`)
})