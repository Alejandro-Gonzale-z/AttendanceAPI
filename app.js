import express from 'express'

import {getNotes, getNote, createNote} from './database.js'

const app = express()

app.use(express.json())


app.get("/teacher/:id", async (req,res) => {
    const teacher = await getTeacher()
    res.send(teacher)
})

//examples of get requests
// app.get("/note/:id", async (req,res) => {
//     const id = req.params.id
//     const notes = await getNote(id)
//     res.send(notes)
// })
// app.get("/notes", async (req,res) => {
//     const notes = await getNotes()
//     res.send(notes)
// })

// EXAMPLE OF POST REQUEST
// app.post("/notes", async (req,res) => {
//     const {title, content} = req.body
//     const note = await createNote(title, content)
//     res.status(201).send(note)
// })

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})