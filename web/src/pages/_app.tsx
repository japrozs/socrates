import "@/styles/globals.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import NextTransitionBar from "next-transition-bar";
import type { AppProps } from "next/app";
import { Toaster } from "sonner";

const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    credentials: "include",
    cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <NextTransitionBar color={"#0172c6"} showSpinner={false} />
            <Toaster />
            <Component {...pageProps} />
        </ApolloProvider>
    );
}
