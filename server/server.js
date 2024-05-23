const express = require('express')
const app = express()

const port = 5000

app.get('/api', (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree", "userFour"] })
})


app.listen(5000, () => {
    console.log(`Server is running on port: ${port}`)
})