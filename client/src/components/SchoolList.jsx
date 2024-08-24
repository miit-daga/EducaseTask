/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';

const SchoolList = ({ latitude, longitude }) => {
    const [schools, setSchools] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchSchools = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get('http://localhost:3000/api/listSchools', {
                params: { latitude, longitude }
            });

            if (Array.isArray(response.data)) {
                setSchools(response.data);
            } else {
                throw new Error('Unexpected response format');
            }
        } catch (error) {
            console.error('Error fetching schools:', error);
            setError('Failed to fetch schools. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Nearby Schools</h2>
            <button onClick={fetchSchools} disabled={loading}>
                {loading ? 'Loading...' : 'Fetch Schools'}
            </button>
            {error && <p>{error}</p>}
            <ul>
                {Array.isArray(schools) && schools.length > 0 ? (
                    schools.map((school) => (
                        <li key={school.id}>
                            {school.name} - {school.address} (Distance: {school.distance.toFixed(2)} km)
                        </li>
                    ))
                ) : (
                    <p>No schools available or click the button to fetch.</p>
                )}
            </ul>
        </div>
    );
};

export default SchoolList;
