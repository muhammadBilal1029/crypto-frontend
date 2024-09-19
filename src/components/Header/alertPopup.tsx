import React,{useState} from 'react';
import toast from 'react-hot-toast';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Input, VStack,
  Button,Box,
  Text } from '@chakra-ui/react';

interface AlertPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const AlertPopup: React.FC<AlertPopupProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const validateForm = () => {
    let isValid = true;
    let errors = {
      name: '',
      email: '',
      message: ''
    };
    
    if (!formData.name) {
      errors.name = 'Name is required';
      isValid = false;
    }
    if (!formData.email) {
      errors.email = 'Email  is required';
      isValid = false;
    }
    if (!formData.message) {
      errors.message = 'Message is required';
      isValid = false;
    }
    
    setErrors(errors);
    return isValid;
  };
  
  const handleSubmit =async () => {
    if (validateForm()) {
      
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/alertform`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        toast.success('Alert submitted successfully!'); 
        console.log('Alert submitted successfully:', result);
        setFormData({
          name: '',
          email: '',
          message: ''
        })
        onClose(); 
      } catch (error) {
        toast.error('Error submitting Alert');
        console.error('Error submitting form:', error);
      }
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Alert</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
          <Box>
              <Input
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              {errors.name && <Text color="red.500">{errors.name}</Text>}
            </Box>
            <Box>
              <Input
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              {errors.email && <Text color="red.500">{errors.email}</Text>}
            </Box>
            <Box>
              <Input
                name="message"
                placeholder="Enter Message"
                value={formData.message}
                onChange={handleChange}
                isInvalid={!!errors.message}
              />
              {errors.message && <Text color="red.500">{errors.message}</Text>}
            </Box>
            <Button  bgColor="#90cdf4" 
              color="black"    
              _hover={{ bgColor: "#90cdf4" }}  
              _active={{ bgColor: "#90cdf4" }} onClick={handleSubmit}>
              Submit
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AlertPopup;
