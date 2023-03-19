import Head from 'next/head';
import Layout, { siteName } from '@/components/layout';
import classes from '@/styles/Home.module.css';
import HomeInfo from '@/components/ui/homeInfo';

export default function Home() {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={classes.content}>
        <HomeInfo onAuthRequest={() => window.alert('Auth requested')} />
      </div>
    </Layout>
  )
}
