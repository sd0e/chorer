import Layout from '@/components/layout';
import classes from '@/styles/Onboarding.module.css';
import { useRouter } from 'next/router';
import ClientShield from '@/components/clientShield';
import { InterClass } from '@/font';

export default function Onboarding() {
  const router = useRouter();
  ClientShield(router, false);

  return (
    <Layout title="Sign Up">
      <div className={[classes.content, InterClass].join(',')}>
        Onboarding
      </div>
    </Layout>
  )
}
