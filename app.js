const app = require('./index')
const { mongoDB } = require("./db");
require("dotenv").config();
const PORT = process.env.PORT 

mongoDB();

app.listen(PORT, () => {
    console.log('Server is listening on, ', PORT)
})