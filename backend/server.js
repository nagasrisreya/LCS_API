const express = require('express');
const cors = require('cors');
const path = require('path');
const { findLCS, findAllCommonSubstrings } = require('./lcs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/lcs', (req, res) => {
    try {
        const { str1, str2 } = req.body;

        if (typeof str1 !== 'string' || typeof str2 !== 'string') {
            return res.status(400).json({ 
                error: 'Both inputs must be strings' 
            });
        }

        const result = findLCS(str1, str2);
        
        res.json({
            success: true,
            result: result
        });
    } catch (error) {
        console.error('Error calculating LCS:', error);
        res.status(500).json({ 
            error: 'Internal server error' 
        });
    }
});

app.post('/api/all-substrings', (req, res) => {
    try {
        const { str1, str2, minLength = 1 } = req.body;

        if (typeof str1 !== 'string' || typeof str2 !== 'string') {
            return res.status(400).json({ 
                error: 'Both inputs must be strings' 
            });
        }

        const result = findAllCommonSubstrings(str1, str2, minLength);
        
        res.json({
            success: true,
            result: result
        });
    } catch (error) {
        console.error('Error finding all substrings:', error);
        res.status(500).json({ 
            error: 'Internal server error' 
        });
    }
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'LCS API is running' });
});

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  POST /api/lcs - Find longest common substring');
    console.log('  POST /api/all-substrings - Find all common substrings');
    console.log('  GET /api/health - Health check');
});

