import * as React from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Routes, Route } from "react-router-dom";
import {
  ChakraProvider,
} from '@chakra-ui/react';
import Sample from './components/Sample'
import Home from './components/Home'
import NoMatch from './components/NoMatch'
import Navbar from "./components/Navbar";
import Register from './components/Register'
import Send from './components/Send'
import History from './components/History'

const supportedChainIds = [5];
const connectors = {
  injected: {}
};

function App() {
  return (
    <ChakraProvider>
      <ThirdwebProvider
        connectors={connectors}
        supportedChainIds={supportedChainIds}>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="pay" element={<Send />} />
          <Route path="history" element={<History />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </ThirdwebProvider>
    </ChakraProvider >
  );
}

export default App;
