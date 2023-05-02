import Head from 'next/head';
import Layout, { siteName } from '@/components/layout';
import classes from '@/styles/Home.module.css';
import HomeInfo from '@/components/ui/homeInfo';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={classes.content}>
        <HomeInfo onAuthRequest={() => router.push('/auth')} />
      </div>
    </Layout>
  )
}
