const db = require('../db');
const { check, validationResult } = require('express-validator');

// Haversine formula to calculate distance between two points on the Earth
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degree) => degree * Math.PI / 180;
    const R = 6371; // Earth's radius in kilometers

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
};

exports.addSchool = [
    // Validation rules
    check('name').isString().notEmpty().withMessage('Name must be a non-empty string.'),
    check('address').isString().notEmpty().withMessage('Address must be a non-empty string.'),
    check('latitude')
        .isFloat({ min: -90, max: 90 })
        .withMessage('Latitude must be a valid number between -90 and 90.'),
    check('longitude')
        .isFloat({ min: -180, max: 180 })
        .withMessage('Longitude must be a valid number between -180 and 180.'),

    // Handler
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, address, latitude, longitude } = req.body;

        try {
            const [result] = await db.execute(
                'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
                [name, address, latitude, longitude]
            );
            res.status(201).json({ message: 'School added successfully!', schoolId: result.insertId });
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'A school with this name and address already exists.' });
            }
            res.status(500).json({ error: 'Database error: ' + error.message });
        }
    }
];

exports.listSchools = async (req, res) => {
    const { latitude, longitude } = req.query;
    if (latitude === undefined || longitude === undefined) {
        return res.status(400).json({ error: 'Latitude and longitude are required.' });
    }

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    const isValidLatitude = (lat) => lat >= -90 && lat <= 90;
    const isValidLongitude = (lon) => lon >= -180 && lon <= 180;

    if (!isValidLatitude(lat) || !isValidLongitude(lon)) {
        return res.status(400).json({ error: 'Invalid latitude or longitude values.' });
    }

    try {
        const [schools] = await db.execute('SELECT * FROM schools');

        const schoolsWithDistance = schools.map(school => {
            const distance = calculateDistance(
                lat,
                lon,
                school.latitude,
                school.longitude
            );
            return { ...school, distance };
        });

        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.status(200).json(schoolsWithDistance);
    } catch (error) {
        res.status(500).json({ error: 'Database error: ' + error.message });
    }
};
