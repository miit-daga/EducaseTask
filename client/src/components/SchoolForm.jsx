/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';

const SchoolForm = ({ onAddSchool }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Create Axios instance with base URL
    const api = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Use the axios instance created with the base URL
            const response = await api.post('/addSchool', {
                name,
                address,
                latitude,
                longitude
            });
        
            alert('School added successfully!');
            
            if (onAddSchool) onAddSchool(response.data);
            
            // Reset form fields
            setName('');
            setAddress('');
            setLatitude('');
            setLongitude('');
        } catch (error) {
            console.error('Error adding school:', error);
            setError('Failed to add school.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="School Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <input
                type="text"
                placeholder="Latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
            />
            <input
                type="text"
                placeholder="Longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add School'}
            </button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default SchoolForm;
