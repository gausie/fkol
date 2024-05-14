import React from "react";
import ReactDOM from "react-dom/client";
import { MathJaxContext } from "better-react-mathjax";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./components/App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <MathJaxContext>
        <App />
      </MathJaxContext>
    </ChakraProvider>
  </React.StrictMode>,
);
