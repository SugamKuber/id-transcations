import React from 'react'
import { useAddress } from "@thirdweb-dev/react";
import Hero from './Hero'
import axios from "axios";

export default function Home() {
    const address = useAddress();

    const [data, setData] = React.useState(null);

    const baseURL = `https://id-transcations-production.up.railway.app/api/id/check/${address}`;

    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            setData(response.data);
        });
    }, [baseURL]);

    return (
        <>
            <Hero />
            {!address && <>
                <div role="alert" class="rounded border-l-4 border-red-500 bg-red-50 p-4">
                    <strong class="block font-medium text-red-800"> Wallet Not Found </strong>
                    <p class="mt-2 text-sm text-red-700">
                        Plase connect your wallet
                    </p>
                </div>
            </>
            }
            {(address && !data) && <>
                <a
                    class="flex items-center justify-center gap-2 rounded-xl border-4 border-black bg-pink-100 px-8 py-4 font-bold shadow-[6px_6px_0_0_#000] transition hover:shadow-none focus:outline-none focus:ring active:bg-pink-50"
                    href="/register"
                >
                    Register Now <span aria-hidden="true" role="img">🤔</span>
                </a>
            </>
            }
        </>
    )
}