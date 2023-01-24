import { useLocation, useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import NotFoundSrc from '@/assets/images/not-found.jpg';
import { Button } from '@/components/Button';
import { useTranslate } from '@/hooks/useTranslate';
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
  const { t } = useTranslate();

  const handleGoBack = (): void => {
    navigate('/');
  };

  return (
    <Layout>
      <SectionTitle>
        <h1>{t('notfound.title')}</h1>
        <p>{t('notfound.description')}</p>
        {errorMessage && (
          <ErrorReason>
            {t('notfound.reason', { reason: errorMessage })}
          </ErrorReason>
        )}
      </SectionTitle>
      <Image alt="notFound" src={NotFoundSrc} />
      <Button content={t('notfound.back')} onClick={handleGoBack} />
    </Layout>
  );
}
