/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { ChakraProvider, VStack, Container, Box, Heading, Input, FormControl, FormLabel, Flex } from '@chakra-ui/react';
import SchoolForm from './components/SchoolForm';
import SchoolList from './components/SchoolList';

const App = () => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const handleSchoolAdded = (newSchool) => {
        setLatitude(newSchool.latitude);
        setLongitude(newSchool.longitude);
    };

    return (
        <ChakraProvider>
            <Flex justify="center" align="center" minHeight="100vh">
                <Container maxW="container.xl">
                    <VStack spacing={10} width="100%" align="center">
                        <Heading as="h1" size="2xl" ml={300}>School Management</Heading>
                        
                        <Flex direction={{ base: "column", md: "row" }} width="100%" spacing={10}>
                            <Box flex="1" maxW="500px" ml="200">
                                <SchoolForm onAddSchool={handleSchoolAdded} />
                            </Box>
                            
                            <Box flex="1" maxW="500px" width="100%" p={6} borderWidth={1} borderRadius="lg" boxShadow="lg" ml="200">

                                <FormControl mb={4}>
                                    <FormLabel>Your Location</FormLabel>
                                    <Input
                                        placeholder="Latitude"
                                        value={latitude}
                                        onChange={(e) => setLatitude(e.target.value)}
                                        mb={2}
                                    />
                                    <Input
                                        placeholder="Longitude"
                                        value={longitude}
                                        onChange={(e) => setLongitude(e.target.value)}
                                        mb={4}
                                    />
                                </FormControl>
                                <SchoolList latitude={latitude} longitude={longitude} />
                            </Box>
                        </Flex>
                    </VStack>
                </Container>
            </Flex>
        </ChakraProvider>
    );
};

export default App;
