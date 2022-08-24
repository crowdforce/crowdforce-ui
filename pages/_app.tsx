import './style.css';

/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
import { MapProvider } from 'react-map-gl';
import { SessionProvider } from 'next-auth/react';
import ThemeProvider from '../components/ThemeProvider';
import { AppHeader } from '@/components/AppHeader';
import { MantineProvider } from '@mantine/core';
import { SWRConfig } from 'swr';
import { AppProps } from 'next/app';
import { Session } from 'next-auth';

type Props = AppProps & {
    session: Session
}

export default function MyApp({ Component, pageProps }: Props) {
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
                <link rel="stylesheet" href="/main.css" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet" />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
                <meta name="theme-color" content="#ffffff" />
            </Head>

            <ThemeProvider>
                <MantineProvider withGlobalStyles withNormalizeCSS>
                    <SessionProvider session={pageProps.session}>
                        <MapProvider>
                            <SWRConfig value={{
                                fetcher: (resource: string, init?: RequestInit) => fetch(resource, init).then(res => res.json())
                            }}>
                                <AppHeader />
                                <Component {...pageProps} />
                            </SWRConfig>
                        </MapProvider>
                    </SessionProvider>
                </MantineProvider>
            </ThemeProvider>
        </>
    );
};