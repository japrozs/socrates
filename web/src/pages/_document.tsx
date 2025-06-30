import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link
                    href="https://fonts.cdnfonts.com/css/menlo"
                    rel="stylesheet"
                />
            </Head>
            <body className="subpixel-antialiased">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
