import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import firebaseApp from '../firebase/initialize';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
