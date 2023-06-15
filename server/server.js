const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
 

const app = express()
app.use(express.static('public'))
app.use(bodyparser.urlencoded)