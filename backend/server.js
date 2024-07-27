import express from 'express';
// module js code 
require('dotenv').config();

const app = express();
const port = process.env.PORT || 7777;


app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

