import "@/style.css"

import Head from "next/head"
import { SessionProvider } from "next-auth/react"
import { SWRConfig } from "swr"
import { AppProps } from "next/app"
import { Session } from "next-auth"
import { ThemeProvider } from "@/components/ThemeProvider"
import { NotificationsProvider } from "@mantine/notifications"
import { RouterTransition } from "@/components/RouterTransition"
import { NextPage } from "next"

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: React.ReactElement) => React.ReactNode

}

type AppPropsWithLayout<T> = AppProps<T> & {
    Component: NextPageWithLayout<T>
}

type Props = {
    session: Session
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout<Props>) {
    const getLayout = Component.getLayout ?? ((page) => page)

    return (
        <>
            <Head>
                <title>Crowd Force</title>
                <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
                <link rel="icon" href="/assets/favicon.png" sizes="any" />
                <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
                <meta name="theme-color" content="#ECF2F6" />
            </Head>

            <ThemeProvider>
                <SessionProvider session={pageProps.session}>
                    <SWRConfig value={{
                        fetcher: async (resource: string, init?: RequestInit) => {
                            try {
                                const res = await fetch(resource, init)
                                if (res.ok) {
                                    const value = await res.json()
                                    if (value.hasOwnProperty("error")) {
                                        throw new Error(value.error)
                                    }
                                    return value
                                }
                            } catch (error) {
                                return { error }
                            }
                        },
                    }}>
                        <NotificationsProvider position="top-center">
                            <RouterTransition />
                            {getLayout(<Component {...pageProps} />)}
                        </NotificationsProvider>
                    </SWRConfig>
                </SessionProvider>
            </ThemeProvider>
        </>
    )
}
