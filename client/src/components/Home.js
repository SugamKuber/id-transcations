import { useAddress } from "@thirdweb-dev/react";
import { useToast } from '@chakra-ui/react'
import Hero from './Hero'

export default function Home() {
    
    const address = useAddress();
    const toast = useToast()

    if (!address) {
        toast({
            title: 'Wallet Not Found.',
            description: "Please connect your wallet",
            status: 'error',
            duration: 9000,
            variant: "subtle",
            isClosable: true,
        })
    };
    return (
        <>
            <Hero />
        </>
    )
}