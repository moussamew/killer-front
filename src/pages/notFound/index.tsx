import { useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import NotFoundSrc from '@/assets/images/not-found.jpg';
import { Button } from '@/components/Button';
import t from '@/helpers/translate';
import { Layout } from '@/layout/Layout';

const SectionTitle = tw.div`
  text-center 
`;

const Image = tw.img`
  max-h-[80rem] m-auto
`;

export const NotFoundPage = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Layout>
      <SectionTitle>
        <h1>{t('not_found.title')}</h1>
        <p>{t('not_found.text')}</p>
      </SectionTitle>
      <Image alt="notFound" src={NotFoundSrc} />
      <Button
        content={t('not_found.back_home')}
        onClick={() => navigate('/')}
      />
    </Layout>
  );
};
