import Layout from '@/components/layout';
import classes from '@/styles/Auth.module.css';
import { useRouter } from 'next/router';

export default function Auth() {
  const router = useRouter();

  return (
    <Layout title="Continue to Chorer">
      <div className={classes.content}>
        <div className={classes.inner}>
          <h1>Continue to Chorer</h1>
        </div>
      </div>
    </Layout>
  )
}
