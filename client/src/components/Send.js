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


const baseURL = `https://id-transcations-production.up.railway.app/api/tr/send`;

export default function Send() {
    const [post, setPost] = React.useState(null);
    const address = useAddress();
    const navigate = useNavigate();
    const toast = useToast()
    return (
        <Flex justify="center" >
            <Box bg="white" p={6} rounded="md" w={64}>
                <div>
                    <h1
                        class="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
                    >
                        Pay Now
                    </h1>
                    <img src={Payy} alt="pic" />
                </div>
                <Formik
                    initialValues={{
                        uniqueId: "",
                        amount: "",
                    }}
                    onSubmit={(values) => {
                        console.log(values)
                        axios.post(baseURL, {
                            uniqueId: values.uniqueId,
                            amount: values.amount,
                            privateAddress: "07f320f3cd6a1ebc984a7d02f09d09d119cd4f28999d25cb4e349954a1184402"
                        }).then((response) => {
                            setPost(response.data);
                            console.log("succesfully send")
                            toast({
                                title: 'succesfully send',
                                position: "top",
                                status: 'success',
                                duration: 3000,
                                isClosable: true,
                            })
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
                                        className='bg-slate-200'
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
                                <FormControl isInvalid={!!errors.amount && touched.amount} >
                                    <FormLabel htmlFor="text">amount</FormLabel>
                                    <Field
                                        className='bg-slate-200'
                                        as={Input}
                                        id="amount"
                                        name="amount"
                                        type="amount"
                                        variant="amount"
                                        validate={(value) => {
                                            let error;
                                            if (!parseFloat(value) > 0.5) {
                                                error = 'amount should be less than 0.5'
                                            }
                                            return error;
                                        }}
                                    />
                                    <FormErrorMessage>{errors.amount}</FormErrorMessage>
                                </FormControl>
                                <Button type="submit" colorScheme="blue" width="full">
                                    Submit
                                </Button>
                                <Button onClick={() => navigate("/")}>
                                    Go Back
                                </Button>
                            </VStack>
                        </form>
                    )}
                </Formik>
            </Box>
        </Flex >
    );
}