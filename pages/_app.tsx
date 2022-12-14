import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles/main.scss";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>القران الكريم</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
