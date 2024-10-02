import type { AppProps } from 'next/app'
import AppLayout from './layout/app';

import "@/styles/globals.css";
import "@/styles/toast.css";
import "@/styles/wallet.css";
import "@/styles/table.css";
import 'nprogress/nprogress.css';
import "react-toastify/dist/ReactToastify.css";

import Router from 'next/router';
import NProgress from 'nprogress';

Router.events.on('routeChangeStart', (url) => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}