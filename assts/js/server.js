const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 3001;

app.get('/api', async (req, res) => {
    const apiKey = '8418a1a54546427ca1bce1bd0c1f8d40'
    const { area, year, city, priceClassigication } = req.query;
    let apiUrl = `https://www.reinfolib.mlit.go.jp/ex-api/external/XIT001?area=${area}&year=${year}&city=${city}`;
    if (priceClassigication) {
        apiUrl += '&priceClassigication=02';
    }

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'Ocp-Apim-Subscription-Key': apiKey,
            }
        });

        const responseData = response.data;

        res.json({ data: responseData });
    } catch (error) {
        console.error('Error in API request:', error.message);
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});