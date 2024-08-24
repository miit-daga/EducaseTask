/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  VStack,
  Heading,
  Text,
  List,
  ListItem,
  useToast,
} from '@chakra-ui/react';

const SchoolList = ({ latitude, longitude }) => {
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const toast = useToast();

    const api = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
    });

    const fetchSchools = async () => {
        setLoading(true);

        try {
            const response = await api.get('/listSchools', {
                params: { latitude, longitude }
            });
            if (Array.isArray(response.data)) {
                setSchools(response.data);
            } else {
                throw new Error('Unexpected response format');
            }
        } catch (error) {
            console.error('Error fetching schools:', error);
            toast({
                title: "Error",
                description: "Failed to fetch schools. Please try again later.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box width="100%" p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
            
            <VStack spacing={4} align="stretch">
            <Button 
                    onClick={fetchSchools} 
                    isLoading={loading}
                    loadingText="Loading..."
                    colorScheme="blue"
                >
                    Fetch Schools
                </Button>
            <Heading as="h2" size="xl" textAlign="center" mb={6}>
                Nearby Schools
            </Heading>
                {schools.length > 0 ? (
                    <List spacing={3}>
                        {schools.map((school) => (
                            <ListItem key={school.id} p={2} borderRadius="md">
                                <Text fontWeight="bold">{school.name}</Text>
                                <Text>{school.address}</Text>
                                <Text fontSize="sm">Distance: {school.distance.toFixed(2)} km</Text>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Text textAlign="center">No schools available or click the button to fetch.</Text>
                )}
            </VStack>
        </Box>
    );
};

export default SchoolList;