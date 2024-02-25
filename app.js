import express from 'express'
const app = express()
app.use(express.json())

import { fetchNote, createNote, fetchData } from './database.js'

app.get('/notes',async  (req, res) => {
    const notes = await fetchData()
    res.send(notes)
})

app.get('/notes/:id', async (req, res) => {
    const id = req.params.id 
    const note = await fetchNote(id)
    res.send(note)
})

app.post('/notes', async (req, res) => {
    const {title, contents} = req.body
    const note = await createNote(title, contents)
    res.status(201).send(note)
})

app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})