/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import SchoolForm from './components/SchoolForm';
import SchoolList from './components/SchoolList';

const App = () => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    return (
        <div>
            <h1>School Management</h1>
            <SchoolForm onAddSchool={() => {}} />
            <div>
                <input
                    type="text"
                    placeholder="Your Latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Your Longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                />
                <SchoolList latitude={latitude} longitude={longitude} />
            </div>
        </div>
    );
};

export default App;
