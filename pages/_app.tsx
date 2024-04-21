import Layout from '@components/common/Layout';
import ToastProvider from '@contexts/ToastProvider';
import { MantineProvider } from '@mantine/core';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';
import Modal from 'src/components/common/Modal';
import '../styles/globals.css';
import { NextPageWithLayout } from '../types/layout';
import Script from 'next/script';
import Head from 'next/head';

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
    const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        retry: false,
                        throwOnError: true,
                        staleTime: 60 * 3 * 1000,
                    },
                },
            }),
    );
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <QueryClientProvider client={queryClient}>
                <RecoilRoot>
                    <MantineProvider>
                        <Modal />
                        {getLayout(<Component {...pageProps} />)}
                        <ToastProvider />
                    </MantineProvider>
                </RecoilRoot>
                <ReactQueryDevtools buttonPosition="bottom-left" />
            </QueryClientProvider>
        </>
    );
}

export default MyApp;
