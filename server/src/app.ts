import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import routes from './routes'

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

// untuk mongoose connect from documentation
const options = { useNewUrlParser: true, UseUnifiedTopology: true }

// activation cors to open access from cors policy
app.use(cors())
app.use(routes)

// memberikan option use modify true
mongoose.set('useFindAndModify', true)

// mengambil url route diatas
mongoose.connect(uri, options)
    .then(() => {
        app.listen(PORT, () => {
            console.info(`App is listening at http://localhost:${PORT}`)
        })
    })
    .catch((error) => {
        throw error
    })

