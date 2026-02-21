require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// The accepted distance for 2 Marhalah in Malaysia
const MUSAFIR_THRESHOLD_KM = 81; 

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // This is where we will put your HTML/CSS UI later

// --- THE CALCULATION API ---
app.post('/api/check-musafir', async (req, res) => {
    const { origin, destination } = req.body;
    
    if (!origin || !destination) {
        return res.status(400).json({ error: 'Origin and destination are required.' });
    }

    try {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        // Call the Google Distance Matrix API
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
        
        const response = await axios.get(url);
        const data = response.data;

        // Check if Google successfully found a driving route
        if (data.status !== 'OK' || data.rows[0].elements[0].status !== 'OK') {
            return res.status(400).json({ error: 'Could not calculate driving route. Please check the locations.' });
        }

        // Google returns distance in meters, so we divide by 1000
        const distanceMeters = data.rows[0].elements[0].distance.value;
        const distanceKm = distanceMeters / 1000;
        
        // The core logic
        const isEligible = distanceKm >= MUSAFIR_THRESHOLD_KM;

        res.json({
            distanceKm: distanceKm.toFixed(2),
            isEligible: isEligible,
            message: isEligible 
                ? `Alhamdulillah. Your journey is ${distanceKm.toFixed(2)} km. You are eligible for Jamak/Qasar.`
                : `Your journey is ${distanceKm.toFixed(2)} km. This is under the ${MUSAFIR_THRESHOLD_KM} km threshold.`
        });

    } catch (error) {
        console.error("❌ API Error:", error.message);
        res.status(500).json({ error: 'Internal server error while contacting Google Maps.' });
    }
});

app.get('/api/maps-key', (req, res) => {
    res.json({ key: process.env.GOOGLE_MAPS_API_KEY });
});

app.listen(PORT, () => {
    console.log(`🚀 Musafir App Backend running on http://localhost:${PORT}`);
});
