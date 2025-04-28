const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

app.get('/api/posts', async (req, res) => {
    try {
        const response = await axios.get('https://forum-proxy.freecodecamp.rocks/latest');
        console.log(response.data); // Log the response here
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching posts');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('Backend server is running. Use /api/posts for forum posts data.');
});