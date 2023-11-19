import Layout from "@components/common/Layout";
import ToastProvider from "@contexts/ToastProvider";
import { MantineProvider } from "@mantine/core";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Modal from "src/components/common/Modal";
import "../styles/globals.css";
import { NextPageWithLayout } from "../types/layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  pageProps: {
    session: Session | null;
  };
};

const queryClient = new QueryClient();

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
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
  );
}

export default MyApp;
