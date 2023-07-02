import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import firebaseApp from '../firebase/initialize';
import dynamic from 'next/dynamic';

// initalises app
const app = firebaseApp;

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default dynamic(() => Promise.resolve(App), { ssr: false });
