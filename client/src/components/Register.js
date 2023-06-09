import React from 'react'
import axios from "axios";
import { useAddress } from "@thirdweb-dev/react";
import { Formik, Field } from "formik";
import { useNavigate } from "react-router-dom";
import {
    useToast,
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    VStack
} from "@chakra-ui/react";
import Payy from '../assets/pay.jpg'

const baseURL = `https://id-transcations-production.up.railway.app/api/id/create`;

export default function Register() {
    const [post, setPost] = React.useState(null);
    const address = useAddress();
    const navigate = useNavigate();
    const toast = useToast()
    return (
        <Flex justify="center" >
            <Box bg="white" p={6} rounded="md" w={64}>
                <div>
                    <h1
                        class="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
                        Register
                    </h1>
                    <img src={Payy} alt="pic" />
                </div>
                <Formik
                    initialValues={{
                        uniqueId: "",
                    }}
                    onSubmit={(values) => {
                        console.log(values)
                        axios.post(baseURL, {
                            uniqueId: values.uniqueId,
                            publicAddress: address
                        }).then((response) => {
                            setPost(response.data);
                            console.log("succesfully submitted")
                            toast({
                                title: 'Id registred',
                                status: 'success',
                                duration: 3000,
                                position: "top",
                                isClosable: true,
                            })
                            navigate("/")

                        }).catch(error => {
                            console.log(error.response.data.message)
                            toast({
                                title: error.response.data.message,
                                status: "error",
                                position: "top",
                                duration: 3000,
                                isClosable: true,
                            })
                        })
                    }}
                >
                    {({ handleSubmit, errors, touched }) => (
                        <form onSubmit={handleSubmit}>
                            <VStack spacing={4} align="flex-start">
                                <FormControl isInvalid={!!errors.uniqueId && touched.uniqueId}>
                                    <FormLabel htmlFor="text">uniqueId</FormLabel>
                                    <Field
                                        as={Input}
                                        id="uniqueId"
                                        name="uniqueId"
                                        type="uniqueId"
                                        variant="filled"
                                        validate={(value) => {
                                            let error;
                                            let regex = /\d\d[A-Z][A-Z][A-Z]\d\d\d\d$/i;
                                            if (!regex.test(value)) {
                                                error = 'incorrect format'
                                            }

                                            return error;
                                        }}
                                    />
                                    <FormErrorMessage>{errors.uniqueId}</FormErrorMessage>
                                </FormControl>
                                <Button type="submit" colorScheme="purple" width="full">
                                    Submit
                                </Button>
                            </VStack>
                        </form>
                    )}
                </Formik>
            </Box>
        </Flex>
    );
}