import axios from "axios";
import React from 'react'
import { useAddress } from "@thirdweb-dev/react";

export default function History() {
    const address = useAddress();
    const [data, setData] = React.useState(null)
    React.useEffect(() => {
        axios.get(`https://id-transcations-production.up.railway.app/api/tr/all/${address}`).then(function (response) {
            console.log(response.data.transfers);
            setData(response.data.transfers)
        });
    }, [address])
    if (!data) return (
        <>
            <div className="text-3xl text-center font-bold pt-10">
                Data not found
            </div>
        </>
    );
    return (
        <>

            {
                data.map((data, index) =>
                    <div key={index}
                        className="m-5 rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-violet-500 p-1 shadow-xl">
                        <div className="block rounded-xl bg-white p-4 sm:p-6 lg:p-8" href="">
                            <div >
                                <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                                    {data.hash}
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    from : {data.from}
                                </p>
                                <p className="mt-2 text-sm text-gray-500">
                                    to : {data.to}
                                </p>
                                <p className="mt-2 text-sm text-gray-500">
                                    value : {data.value}
                                </p>
                                <p className="mt-2 text-sm text-gray-500">
                                    asset : {data.asset}
                                </p>
                            </div>
                        </div>
                    </div >
                )
            }
        </>
    )
}