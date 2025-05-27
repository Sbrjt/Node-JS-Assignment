import dotenv from 'dotenv'
import express from 'express'
import addSchool from './controller/addSchool.js'
import listSchools from './controller/listSchools.js'

dotenv.config()

const app = express()
app.use(express.json())

const port = process.env.PORT
const url = process.env.PUBLIC_URL || `http://localhost:${port}`

app.get('/', async (req, res) => {
	res.send('Hello 👋')
})

app.post('/addSchool', addSchool)
app.get('/listSchools', listSchools)

app.listen(port, () => {
	console.log(`Server: ${url}`)
})
