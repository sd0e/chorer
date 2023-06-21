// import necessary libraries

import Layout from '@/components/layout';
import classes from '@/styles/Home.module.css';
import HomeInfo from '@/components/ui/homeInfo';
import { useRouter } from 'next/router';

export default function Home() {
  // initialise router to switch pages
  const router = useRouter();

  // return JSX element which renders homepage
  return (
    <Layout>
      <div className={classes.content}>
        <HomeInfo onAuthRequest={() => router.push('/auth')} />
      </div>
    </Layout>
  )
}
