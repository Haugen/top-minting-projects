import type { AppProps } from "next/app";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps<{ dehydratedState: any }>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />{" "}
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
