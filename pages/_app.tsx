import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import firebaseApp from '../firebase/initialize';

// initalises app
const app = firebaseApp; 

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
