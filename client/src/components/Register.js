import React from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Button,
    Input
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik';
import axios from "axios";
import { useAddress } from "@thirdweb-dev/react";


const baseURL = `https://id-transcations-production.up.railway.app/api/id/create`;

export default function Register() {
    const address = useAddress();

    const [post, setPost] = React.useState(null);

    function validateId(value) {
        let regex = /^\d\d[A-Z][A-Z][A-Z]\d\d\d\d$/i;
        let error
        if (!regex.test(value)) {
            error = 'incorrect format'
        }
        return error
    }

    function createId(values) {
        alert({
            uniqueId: values.uniqueId,
            publicAddress: address
        })
        // axios.post(baseURL, {
        //     title: values.uniqueId,
        //     body: "This is a new post."
        // })
        //     .then((response) => {
        //         setPost(response.data);
        //     });
    }

    return (
        <>
            <Formik
                onSubmit={(values) => {
                    createId(values)
                }}
            >
                {(props) => (
                    <Form>
                        <Field name='uniqueId' validate={validateId}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.name && form.touched.name}>
                                    <FormLabel>ID</FormLabel>
                                    <Input placeholder='reg no' />
                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Button
                            mt={4}
                            colorScheme='teal'
                            isLoading={props.isSubmitting}
                            type='submit'
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>


        </>
    )
}