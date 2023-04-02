import Online from '../assets/online.jpg'

export default function Hero() {
    return (
        <section class="bg-gray-50">
            <div className='flex justify-center'>
                <img src={Online} alt="pic" />
            </div>
            <div
                class="mx-auto max-w-screen-xl px-4 lg:flex lg:h-screen lg:items-center">
                <div class="mx-auto max-w-xl text-center">
                    <h1 class="text-3xl font-extrabold sm:text-5xl">
                        Blockchain Transcaitons are here for {" "}
                        <strong class="font-extrabold text-blue-700 sm:block">
                            VIT'ians
                        </strong>
                    </h1>

                    <p class="mt-4 sm:text-xl sm:leading-relaxed">
                        Say hi! to safe and decentralized transcaitons which on blockchain network with ID cards right at your finger tip
                    </p>

                    <div class="mt-8 flex flex-wrap justify-center gap-4">
                        <a
                            class="block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                            href="/pay"
                        >
                            Pay Now
                        </a>

                        <a
                            class="border border-blue-900 border-2 block w-full rounded px-12 py-3 text-sm font-medium text-blue-600 shadow hover:text-blue-700 focus:outline-none focus:ring active:text-blue-500 sm:w-auto"
                            href="/history"
                        >
                            Check History
                        </a>
                        <a
                            class="block w-full rounded px-12 py-3 text-sm font-medium text-blue-600 shadow hover:text-blue-700 focus:outline-none focus:ring active:text-blue-500 sm:w-auto"
                            href="/register"
                        >
                            Register Now
                        </a>
                    </div>
                </div>
            </div>
        </section>

    );
}
