import Layout from '@/components/layout';
import classes from '@/styles/Home.module.css';
import HomeInfo from '@/components/ui/homeInfo';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <Layout>
      <div className={classes.content}>
        <HomeInfo onAuthRequest={() => router.push('/auth')} />
      </div>
    </Layout>
  )
}
