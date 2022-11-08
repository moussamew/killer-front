import { useLocation, useNavigate } from 'react-router-dom';
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

const ErrorReason = tw.p`
  text-red-600 mt-2
`;

export function NotFoundPage(): JSX.Element {
  const navigate = useNavigate();
  const { state: errorMessage } = useLocation();

  const handleGoBack = (): void => {
    navigate('/');
  };

  return (
    <Layout>
      <SectionTitle>
        <h1>{t('not_found.title')}</h1>
        <p>{t('not_found.text')}</p>
        {errorMessage && (
          <ErrorReason>
            {t('not_found.reason', { reason: errorMessage })}
          </ErrorReason>
        )}
      </SectionTitle>
      <Image alt="notFound" src={NotFoundSrc} />
      <Button content={t('not_found.back_home')} onClick={handleGoBack} />
    </Layout>
  );
}
