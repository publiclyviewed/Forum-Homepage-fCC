const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/posts', async (req, res) => {
    try {
        const response = await axios.get('https://forum-proxy.freecodecamp.rocks/latest');
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching posts');
    }
});

module.exports = router;