import "./style.css"

import Head from "next/head"
import { MapProvider } from "react-map-gl"
import { SessionProvider } from "next-auth/react"
import { MantineProvider } from "@mantine/core"
import { SWRConfig } from "swr"
import { AppProps } from "next/app"
import { Session } from "next-auth"
import { App } from "@/components/App"

type Props = {
    session: Session
}

export default function MyApp({ Component, pageProps }: AppProps<Props>) {
    return (
        <>
            <Head>
                <title>Crowd Force</title>
                <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
                <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
                <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
                <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
                <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
                <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
                <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
                <meta name="theme-color" content="#ECF2F6" />
            </Head>

            <MantineProvider withGlobalStyles withNormalizeCSS
                theme={{
                    fontFamily: "Raleway",
                    lineHeight: 1.2,
                    shadows: {
                        lg: "0 4px 8px 2px rgba(10, 60, 30, 0.05), 0px 8px 16px -4px rgba(0, 0, 0, 0.1), 8px 24px 24px 0px rgba(0, 0, 0, 0)",
                    },
                    headings: {
                        fontFamily: "Raleway",
                        sizes: {
                            h1: {
                                fontSize: 73,
                                fontWeight: 900,
                                lineHeight: "100%",
                            },
                            h2: {
                                fontSize: 47,
                                fontWeight: 800,
                                lineHeight: "100%",
                            },
                            h3: {
                                fontSize: 53,
                                fontWeight: 800,
                                lineHeight: "110%",
                            },
                            h4: {
                                fontSize: 24,
                                fontWeight: 600,
                                lineHeight: "110%",
                            },
                            h5: {
                                fontSize: 30,
                                fontWeight: 400,
                                lineHeight: "100%",
                            },
                        },
                    },
                    primaryColor: "lime",
                    defaultRadius: "md",
                    white: "#ECF2F6",
                    defaultGradient: { deg: 112, from: "cyan", to: "lime" },
                    datesLocale: "ru",
                    components: {
                        Button: {
                            styles: {
                                label: {
                                    fontWeight: 400,
                                },
                            },
                        },
                    },
                }}
            >
                <SessionProvider session={pageProps.session}>
                    <MapProvider>
                        <SWRConfig value={{
                            fetcher: (resource: string, init?: RequestInit) => fetch(resource, init).then(res => res.json()),
                        }}>
                            <App>
                                <Component {...pageProps} />
                            </App>
                        </SWRConfig>
                    </MapProvider>
                </SessionProvider>
            </MantineProvider>
        </>
    )
}
