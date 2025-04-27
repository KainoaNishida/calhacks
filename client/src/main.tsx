import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BackendProvider } from "./contexts/BackendContext";
import { SearchProvider } from "./contexts/SearchContext";

import App from "./App.tsx";

const colors = {
  brand: {},
};

const theme = extendTheme({ colors });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BackendProvider>
      <SearchProvider>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </SearchProvider>
    </BackendProvider>
  </StrictMode>
);
