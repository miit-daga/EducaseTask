/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';

const SchoolForm = ({ onAddSchool }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [loading, setLoading] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    
    const toast = useToast();
    const cancelRef = React.useRef();

    const api = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post('/addSchool', {
                name,
                address,
                latitude,
                longitude
            });
        
            if (onAddSchool) onAddSchool(response.data);
            
            setName('');
            setAddress('');
            setLatitude('');
            setLongitude('');
            setIsAlertOpen(true);
        } catch (error) {
            console.error('Error adding school:', error);
            toast({
                title: "Error",
                description: "Failed to add school.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const closeAlert = () => {
        setIsAlertOpen(false);
    };

    return (
        <Box width="100%" p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
            <Heading as="h2" size="xl" textAlign="center" mb={6}>
                Add New School
            </Heading>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                    <FormControl isRequired>
                        <FormLabel>School Name</FormLabel>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Address</FormLabel>
                        <Input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Latitude</FormLabel>
                        <Input
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Longitude</FormLabel>
                        <Input
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        colorScheme="blue"
                        isLoading={loading}
                        loadingText="Adding..."
                        width="100%"
                    >
                        Add School
                    </Button>
                </VStack>
            </form>

            <AlertDialog
                isOpen={isAlertOpen}
                leastDestructiveRef={cancelRef}
                onClose={closeAlert}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            School Added Successfully
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            The school has been successfully added to the database.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={closeAlert}>
                                Close
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    );
};

export default SchoolForm;