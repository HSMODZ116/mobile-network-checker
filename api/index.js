const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const axios = require('axios');
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Security Header Guard
app.use((req, res, next) => {
    if (!req.headers['x-requested-with']) {
        return res.status(403).json({ error: "Security Violation: Unauthorized" });
    }
    next();
});

app.get('/api/check-network', async (req, res) => {
    const { phone } = req.query;
    if (!phone) return res.status(400).json({ error: "Phone number is required" });

    try {
        const response = await axios.get(`https://www.easyload.com.pk/dingconnect.php`, {
            params: {
                action: 'GetProviders',
                accountNumber: phone
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Provider API unreachable" });
    }
});

module.exports = app;