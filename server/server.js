const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { readdirSync } = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8000;


// routes
readdirSync("./routes").map((r) => app.use('/', require("./routes/" + r)));

// database
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Database connected')).catch(err => console.log(err));

app.listen(8000, (req, res) => {
    console.log(`Server is running on port ${PORT}`);
})



