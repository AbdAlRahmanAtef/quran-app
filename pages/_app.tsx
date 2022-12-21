import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles/main.scss";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NextNProgress
        options={{ easing: "ease", speed: 500 }}
        showOnShallow={false}
      />
      <Head>
        <title>القران الكريم</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
